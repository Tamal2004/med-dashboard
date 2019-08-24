import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

// Material
import { makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddBox';

// Local
import { SessionsModal } from 'views/Modals';
import {
    Table,
    PaginationBase,
    IconedButton,
    EditableCard,
    Link,
    withModal
} from 'components';

// Selectors
import { selectTesterSessions } from 'selectors';

const useStyles = makeStyles(({ palette, spacing }) => ({
    footer: {
        marginTop: spacing(3),
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const TestSessions = ({ sessions, handleSessionsModal }) => {
    const [page, setPage] = useState(1);
    const c = useStyles();
    const totalPages =
        Math.floor(sessions.length / 5) + !!(sessions.length % 5) || 1;

    return (
        <EditableCard title='Test Sessions'>
            <Table data={sessions} action page={page} itemsPerPage={5} />
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

const mapState = state => ({
    sessions: selectTesterSessions(state)
});

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
