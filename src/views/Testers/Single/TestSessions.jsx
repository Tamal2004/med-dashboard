import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Material
import { makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddBox';

// Local
import { validateRequired } from 'libs';
import { SessionsModal } from 'views/Modals';
import {
    Table,
    PaginationBase,
    IconedButton,
    EditableCard,
    Link,
    withModal
} from 'components';

const useStyles = makeStyles(({ palette, spacing }) => ({
    footer: {
        marginTop: spacing(3),
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const TestSessions = ({ data, handleSessionsModal }) => {
    const [page, setPage] = useState(1);
    const c = useStyles();
    const totalPages = Math.floor(data.length / 5) + !!(data.length % 5) || 1;

    return (
        <EditableCard title='Test Sessions'>
            <Table data={data} action page={page} itemsPerPage={5} />
            <div className={c.footer}>
                <IconedButton
                    Icon={AddIcon}
                    color='secondary'
                    onClick={() => handleSessionsModal()}
                >
                    Add a new test session
                </IconedButton>
                <PaginationBase
                    handlePage={page => setPage(page)}
                    totalPages={totalPages}
                />
            </div>
        </EditableCard>
    );
};

const generateData = (reference, client, project, notes) => ({
    Date: '02/06/2019',
    Time: '10:00',
    Client: {
        Component: <Link to={'/project/' + client}>{client}</Link>,
        value: reference
    },
    Project: {
        Component: <Link to={'/project/' + project}>{project}</Link>,
        value: reference
    },
    Notes: notes
});
TestSessions.defaultProps = {
    data: Array.range(0, 50)
        .map(() => [
            generateData(
                'ETCBR-644',
                'Disney',
                'EM21',
                'i-view, confirmed, 11/06'
            ),
            generateData('ETCBR-644', 'CITB', 'JE28', 'Chippenham')
        ])
        .flatMap(x => x)
};

TestSessions.propTypes = {
    data: PropTypes.array.isRequired
};

const mapState = () => ({});

const mapDispatch = {};

const mapModal = {
    handleSessionsModal: SessionsModal
};

const _TestSessions = compose(
    connect(
        mapState,
        mapDispatch
    ),
    withModal(mapModal)
)(TestSessions);

export { _TestSessions as default, _TestSessions as TestSessions };
