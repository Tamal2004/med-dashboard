import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

// Local
import { composeEditData } from 'libs';
import { EditModal } from 'components';

// Selectors
import { selectClientId, selectClientList } from 'selectors';

// Actions
import { updateClient } from 'actions';

const mapState = (state, { editIndex }) => {
    const clients = selectClientList(state);

    return {
        id: selectClientId(state, editIndex),
        ...composeEditData(clients, editIndex),
        title: 'Client Edit'
    };
};

const onSubmit = ({ Client }, dispatch, { id, onClose }) =>
    dispatch(updateClient({ id, name: Client })).then(() => onClose());

const ClientEditModal = compose(
    connect(mapState),
    reduxForm({
        form: 'ClientEdit',
        onSubmit
    })
)(EditModal);

export { ClientEditModal as default, ClientEditModal };
