import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Material
import { Typography, Divider, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddBox';

// Local
import useStyles from './styles';
import { validateRequired } from 'libs';
import { EditableCard } from '../EditableCard';
import { SessionsModal } from 'views/Modals';
import {
    GridContainer,
    GridItem,
    Table,
    Select,
    Input,
    MultiInput,
    Switch,
    PaginationBase,
    withModal,
    IconedButton
} from 'components';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

const LinkTo = ({ to, children }) => {
    const c = useStyles();
    return (
        <Link className={c.anchorStyle} to={to}>
            {children}
        </Link>
    );
};

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
        Component: <LinkTo to={'/project/' + client}>{client}</LinkTo>,
        value: reference
    },
    Project: {
        Component: <LinkTo to={'/project/' + project}>{project}</LinkTo>,
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