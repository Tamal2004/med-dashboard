import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

// Material
import { makeStyles, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddBox';

// Local
import { ContactsModal } from 'views/Modals';
import {
    Table,
    PaginationBase,
    IconedButton,
    EditableCard,
    Link,
    withModal,
    SearchInput,
    NavigateButton
} from 'components';

const useStyles = makeStyles(({ palette, spacing, typography }) => ({
    root: {
        paddingLeft: spacing(2),
        paddingRight: spacing(2)
    },
    addButton: {
        float: 'right',
        marginBottom: 10
    },
    label: {
        fontWeight: typography.fontWeightHeavy
    },
    table: {
        marginTop: spacing(3)
    },
    footer: {
        marginTop: spacing(3),
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

const ProfileDetails = ({ data }) => {
    const [page, setPage] = useState(1);
    const [input, setInput] = useState('');
    const [newProfile, openNewProfileForm] = useState(false);
    const c = useStyles();

    const toggleNewProfileForm = () => openNewProfileForm(!newProfile);

    const totalPages = Math.floor(data.length / 5) + !!(data.length % 5) || 1;
    return (
        <EditableCard title='Profile Details'>
            <div className={c.root}>
                <NavigateButton
                    className={c.addButton}
                    onClick={() => toggleNewProfileForm()}
                    variant='outlined'
                    color='secondary'
                >
                    {newProfile ? 'Cancel' : 'Add New'}
                </NavigateButton>

                {newProfile && (
                    <SearchInput
                        Adornment={AddIcon}
                        placeholder='Profile...'
                        color='secondary'
                        handleText={({ target: { value } }) => setInput(value)}
                        value={input}
                    />
                )}

                <Table
                    data={data}
                    page={page}
                    action
                    itemsPerPage={3}
                    styles={{ root: c.table }}
                    handleEditModal={(idx) => console.log('arst', idx)}
                />
                {totalPages > 1 && (
                    <div className={c.footer}>
                        <PaginationBase
                            handlePage={page => setPage(page)}
                            totalPages={totalPages}
                            pageStep={3}
                        />
                    </div>
                )}
            </div>
        </EditableCard>
    );
};

const generateData = (reference, project, contactType, contactedBy) => ({
    Profile: { editable: true, Component: reference },
    actions: {
        deleteAction: idx => console.log('delete', idx)
    }
});

ProfileDetails.defaultProps = {
    data: []
};

ProfileDetails.propTypes = {
    data: PropTypes.array.isRequired
};

const mapState = () => ({
    data: Array.range(0, 3)
        .map(() => [
            generateData('ETCBR-644', 'EM21', 'Approached', 'Gavin'),
            generateData('ETCBR-666', 'JE24', 'Ad', 'Avril Swift')
        ])
        .flatMap(x => x)
});

const mapDispatch = {};

const _ProfileDetails = compose(
    connect(
        mapState,
        mapDispatch
    )
)(ProfileDetails);

export { _ProfileDetails as default, _ProfileDetails as ProfileDetails };
