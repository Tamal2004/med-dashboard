import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

// Material
import AddIcon from '@material-ui/icons/AddBox';

// Local
import { EditableCard } from '../EditableCard';
import { ContactsModal } from 'views/Modals';
import {
    Table,
    PaginationBase,
    IconedButton,
    withModal, Link
} from 'components';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ palette, spacing }) => ({
    footer: {
        marginTop: spacing(3),
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const ContactNotes = ({ data, handleContactsModal }) => {
    const [page, setPage] = useState(1);
    const c = useStyles();

    const totalPages = Math.floor(data.length / 5) + !!(data.length % 5) || 1;
    return (
        <EditableCard title='Contact Notes'>
            <Table data={data} action page={page} itemsPerPage={5} />
            <div className={c.footer}>
                <IconedButton
                    Icon={AddIcon}
                    color='secondary'
                    onClick={() => handleContactsModal()}
                >
                    Add a new contact note
                </IconedButton>
                <PaginationBase
                    handlePage={page => setPage(page)}
                    totalPages={totalPages}
                />
            </div>
        </EditableCard>
    );
};

const generateData = (reference, project, contactType, contactedBy) => ({
    Date: '02/06/2019',
    Project: {
        Component: <Link to={'/project/' + project}>{project}</Link>,
        value: project
    },
    'Contact type': contactType,
    'Contacted by': contactedBy,
    Details: '[Copy of email text]'
});

ContactNotes.defaultProps = {
    data: Array.range(0, 3)
        .map(() => [
            generateData('ETCBR-644', 'EM21', 'Approached', 'Gavin'),
            generateData('ETCBR-666', 'JE24', 'Ad', 'Avril Swift')
        ])
        .flatMap(x => x)
};

ContactNotes.propTypes = {
    data: PropTypes.array.isRequired
};

const mapState = () => ({});

const mapDispatch = {};

const mapModal = {
    handleContactsModal: ContactsModal
};

const _ContactNotes = compose(
    connect(
        mapState,
        mapDispatch
    ),
    withModal(mapModal)
)(ContactNotes);

export { _ContactNotes as default, _ContactNotes as ContactNotes };
