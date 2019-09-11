import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Material
import { makeStyles, ButtonGroup } from '@material-ui/core';
import NamedIcon from '@material-ui/icons/Person';
import AnonymousIcon from '@material-ui/icons/PersonOutline';

// Local
import { history } from 'libs';
import { SessionsModal } from 'views/Modals';
import {
    Table,
    PaginationBase,
    IconedButton,
    EditableCard,
    withModal
} from 'components';

// Selectors
import { selectProjectSessions, selectProjectId } from 'selectors';

// Actions
import { removeSession } from 'actions';

const useStyles = makeStyles(({ palette, spacing }) => ({
    root: {
        backgroundColor: 'unset',
        margin: spacing()
    },
    footer: {
        marginTop: spacing(3),
        display: 'flex',
        justifyContent: 'space-between'
    },
    button: {
        textTransform: 'none'
    }
}));

const TesterDetails = ({
    testerDetails,
    handleSessionsModal,
    projectId,
    removeSession
}) => {
    const [page, setPage] = useState(1);
    const [selectedTesters, setSelectedTesters] = useState([]);
    const c = useStyles();
    const totalPages =
        Math.floor(testerDetails.length / 5) + !!(testerDetails.length % 5) ||
        1;

    // Inject removeProfile
    const composedTesterDetails = testerDetails.map(({ id, ...rest }) => ({
        ...rest,
        actions: {
            checkAction: value => setSelectedTesters(value),
            deleteAction: () => removeSession(id)
        }
    }));

    const reportTestersParameter = !!selectedTesters.length
        ? `&testers=${selectedTesters.join('||')}`
        : '';

    return (
        <EditableCard title='Tester Details'>
            <Table
                data={composedTesterDetails}
                page={page}
                checkAll={value => setSelectedTesters(value)}
                itemsPerPage={5}
                noResultsText='No Tester Sessions'
            />
            <div className={c.footer}>
                <div>
                    <ButtonGroup color='secondary'>
                        <IconedButton
                            className={c.button}
                            Icon={NamedIcon}
                            onClick={() =>
                                history.push(
                                    `/project/report?id=${projectId}&type=named${reportTestersParameter}`
                                )
                            }
                            disabled={!selectedTesters.length}
                        >
                            Named Report
                        </IconedButton>
                        <IconedButton
                            className={c.button}
                            Icon={AnonymousIcon}
                            onClick={() =>
                                history.push(
                                    `/project/report?id=${projectId}&type=anonymous${reportTestersParameter}`
                                )
                            }
                            disabled={!selectedTesters.length}
                        >
                            Anonymous Report
                        </IconedButton>
                    </ButtonGroup>
                </div>
                <PaginationBase
                    handlePage={page => setPage(page)}
                    totalPages={totalPages}
                />
            </div>
        </EditableCard>
    );
};

TesterDetails.propTypes = {
    testerDetails: PropTypes.array.isRequired
};

const mapState = state => ({
    projectId: selectProjectId(state),
    testerDetails: selectProjectSessions(state)
});

const mapDispatch = { removeSession };

const mapModal = {
    handleSessionsModal: SessionsModal
};

const _TesterDetails = compose(
    connect(
        mapState,
        mapDispatch
    ),
    withModal(mapModal)
)(TesterDetails);

export { _TesterDetails as default, _TesterDetails as TesterDetails };
