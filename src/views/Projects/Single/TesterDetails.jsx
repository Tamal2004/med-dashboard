import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';

// Material
import { makeStyles, ButtonGroup } from '@material-ui/core';
import NamedIcon from '@material-ui/icons/Person';
import AnonymousIcon from '@material-ui/icons/PersonOutline';

// Local
import { validateRequired, history } from 'libs';
import { SessionsModal } from 'views/Modals';
import {
    Table,
    PaginationBase,
    IconedButton,
    EditableCard,
    withModal,
    Link
} from 'components';

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
    projectReference
}) => {
    const [page, setPage] = useState(1);
    const c = useStyles();
    const totalPages =
        Math.floor(testerDetails.length / 5) + !!(testerDetails.length % 5) ||
        1;

    return (
        <EditableCard title='Tester Details'>
            <Table data={testerDetails} action page={page} itemsPerPage={5} />
            <div className={c.footer}>
                <div>
                    <ButtonGroup color='secondary'>
                        <IconedButton
                            className={c.button}
                            Icon={NamedIcon}
                            onClick={() =>
                                history.push(
                                    `/project/report?ref=${projectReference}&type=named`
                                )
                            }
                        >
                            Named Report
                        </IconedButton>
                        <IconedButton
                            className={c.button}
                            Icon={AnonymousIcon}
                            onClick={() =>
                                history.push(
                                    `/project/report?ref=${projectReference}&type=anonymous`
                                )
                            }
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

const generateData = (reference, client, project, notes) => ({
    'Tester Number': {
        Component: <Link to={'/project/' + project}>{project}</Link>,
        value: reference
    },
    'Tester Name': {
        Component: <Link to={'/project/' + project}>{project}</Link>,
        value: reference
    },
    Profile: client,
    'Testing Date': '01/01/2000',
    'Testing Time': '2:30PM',
    Notes: notes
});

TesterDetails.propTypes = {
    testerDetails: PropTypes.array.isRequired
};

const mapState = state => ({
    projectReference: formValueSelector('ProjectDetails')(state, 'reference'),
    testerDetails: Array.range(0, 50)
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
});

const mapDispatch = {};

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
