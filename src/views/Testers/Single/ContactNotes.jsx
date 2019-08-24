import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

// Material
import { makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddBox';

// Local
import { ContactsModal } from 'views/Modals';

// Components
import {
    Table,
    PaginationBase,
    IconedButton,
    EditableCard,
    withModal
} from 'components';

// Selectors
import { selectTesterContactNotes } from 'selectors';

const useStyles = makeStyles(({ spacing }) => ({
    footer: {
        marginTop: spacing(3),
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const ContactNotes = ({ contactNotes, handleContactsModal }) => {
    const [page, setPage] = useState(1);
    const c = useStyles();

    const totalPages =
        Math.floor(contactNotes.length / 5) + !!(contactNotes.length % 5) || 1;
    return (
        <EditableCard title='Contact Notes'>
            <Table data={contactNotes} action page={page} itemsPerPage={5} />
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

const mapState = state => ({
    contactNotes: selectTesterContactNotes(state)
});

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
