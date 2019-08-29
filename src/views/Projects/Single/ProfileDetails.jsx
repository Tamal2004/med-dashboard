import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

// Material
import { makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddBox';

// Local
import { ProfileEditModal } from 'views/Modals';
import {
    Table,
    PaginationBase,
    EditableCard,
    withModal,
    SearchInput,
    NavigateButton
} from 'components';

// Selectors
import { selectProjectId, selectProjectProfiles } from 'selectors';

// Actions
import { updateProject } from 'actions';

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

const ProfileDetails = ({
    data,
    updateProject,
    id,
    handleProfileEditModal
}) => {
    const [page, setPage] = useState(1);
    const [input, setInput] = useState('');
    const [newProfile, openNewProfileForm] = useState(false);
    const c = useStyles();

    const addProfile = () => {
        const profiles = {
            id,
            profiles: [
                ...data.map(({ Profile: { Component } }) => Component),
                input
            ]
        };
        updateProject(profiles);
        setInput('');
    };

    const removeProfile = idx => {
        const profiles = data.map(({ Profile: { Component } }) => Component);
        profiles.splice(idx, 1);
        updateProject({
            id,
            profiles
        });
    };

    // Inject removeProfile
    const profileTable = data.map(({ actions, ...rest }) => ({
        ...rest,
        actions: { ...actions, deleteAction: removeProfile }
    }));

    const toggleNewProfileForm = () => {
        openNewProfileForm(!newProfile);
    };

    const pageStep = data.length === 4 ? 4 : 3;
    const totalPages =
        Math.floor(data.length / pageStep) + !!(data.length % pageStep) || 1;
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
                        handleClick={addProfile}
                    />
                )}

                <Table
                    data={profileTable}
                    page={page}
                    action
                    itemsPerPage={pageStep}
                    styles={{ root: c.table }}
                    handleEditModal={handleProfileEditModal}
                    noResultsText='No Profiles'
                />
                {data.length > 4 && totalPages > 1 && (
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

ProfileDetails.defaultProps = {
    data: []
};

ProfileDetails.propTypes = {
    data: PropTypes.array.isRequired
};

const mapState = (state, props) => ({
    id: selectProjectId(state),
    data: selectProjectProfiles(state)
});

const mapDispatch = { updateProject };

const mapModals = { handleProfileEditModal: ProfileEditModal };

const _ProfileDetails = compose(
    connect(
        mapState,
        mapDispatch
    ),
    withModal(mapModals)
)(ProfileDetails);

export { _ProfileDetails as default, _ProfileDetails as ProfileDetails };
