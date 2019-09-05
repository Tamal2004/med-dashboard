import React, { Fragment, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

// Material
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { ButtonGroup } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import RequestIcon from '@material-ui/icons/Autorenew';
import EditIcon from '@material-ui/icons/Edit';
import MailIcon from '@material-ui/icons/Email';

// Local
import {
    validateRequired,
    mapFromValue,
    serializeDate,
    composeRequest
} from 'libs';
import {
    Select,
    Input,
    MultiInput,
    Switch,
    IconedButton,
    EditableCard,
    CardDivider,
    withModal
} from 'components';
import { MailModal, ConfirmationModal } from 'views/Modals';
import { sendMail } from 'services';

// Selectors
import {
    selectTesterId,
    selectIsTester,
    selectEthnicities,
    selectGenders,
    selectMaritalStatuses,
    selectNationalities,
    selectTitles,
    selectHasChildren,
    selectEmail,
    selectFullName
} from 'selectors';

// Actions
import { updateTester, deleteUserByAdmin } from 'actions';

// Normalizers
import { normalizeDob } from 'normalizers';

const useStyles = makeStyles(({ spacing, typography }) => ({
    name: {
        paddingLeft: spacing(2),
        paddingRight: spacing(2),
        lineHeight: `${spacing(4)}px`,
        fontWeight: typography.fontWeightHeavy
    },
    divider: {
        margin: spacing(),
        marginLeft: spacing(2),
        marginRight: spacing(2)
    },
    footer: {
        paddingLeft: spacing(2),
        paddingRight: spacing(2),
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const TesterDetails = ({
    titles,
    genders,
    martitalStatuses,
    nationalities,
    ethnicities,
    hasChildren,
    invalid,
    email,
    title,
    firstName,
    surname,
    reset,
    isTester,
    handleSubmit,
    userEmail,
    userFullName,
    handleMailModal,
    handleConfirmationModal,
    deleteUserByAdmin,
    testerId,
    submitting
}) => {
    const [isEditing, setEditing] = useState(false);
    const c = useStyles();

    const confirmationProps = {
        title: 'Confirmation',
        promptText: `Are you sure you want to delete ${email}?`,
        cancelText: 'Cancel',
        submitText: 'Delete',
        onSubmit: () => deleteUserByAdmin(email, testerId)
    };

    const mailProps = {
        from: userEmail,
        to: [email],
        handleMail: sendMail
    };

    const requestMailProps = {
        ...mailProps,
        ...composeRequest({
            firstName,
            surname,
            userFullName
        })
    };

    const shownTitle = title === 'Other' ? '' : `${title} `;

    return (
        <EditableCard
            title='Tester Details'
            onEdit={() => {
                if (isEditing) reset();
                setEditing(!isEditing);
            }}
            isEditing={isEditing}
            color={isEditing ? 'primary' : 'secondary'}
        >
            {isEditing ? (
                <Grid container>
                    <Grid item xs={4}>
                        <Select
                            name='title'
                            placeholder='Title'
                            data={titles}
                            isCard
                            active={isEditing}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Input
                            name='firstName'
                            placeholder='First Name'
                            isCard
                            active={isEditing}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Input
                            name='surname'
                            placeholder='Surname'
                            isCard
                            active={isEditing}
                        />
                    </Grid>
                </Grid>
            ) : (
                <Typography
                    className={c.name}
                    variant='h6'
                >{`${shownTitle}${firstName} ${surname}`}</Typography>
            )}
            <CardDivider />
            <Select
                label='Gender'
                name='gender'
                data={genders}
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Input label='Age' name='age' isCard active={false} />
            <Input
                label='Date of Birth'
                name='dob'
                isCard
                normalize={normalizeDob}
                active={isEditing}
                required={isEditing}
            />
            <Select
                label='Marital Status'
                name='maritalStatus'
                data={martitalStatuses}
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Select
                label='Any children?'
                name='hasChildren'
                data={hasChildren}
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Select
                label='Nationality'
                name='nationality'
                data={nationalities}
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Select
                label='Ethnic Background'
                name='ethnicity'
                data={ethnicities}
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Input
                label='First Language'
                name='firstLanguage'
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Input
                label='Other Languages'
                name='otherLanguages'
                isCard
                active={isEditing}
            />
            <MultiInput
                label='Disability'
                name='disability'
                isCard
                active={isEditing}
            />
            <MultiInput
                label='Screening Information'
                name='about'
                isCard
                active={isEditing}
                required={isEditing}
            />
            <CardDivider />
            {!isTester && (
                <Fragment>
                    <MultiInput
                        label='Notes for Clients'
                        name='clientNotes'
                        isCard
                        active={isEditing}
                    />
                    <MultiInput
                        label="Facilitators' Comments"
                        name='facilitatorComments'
                        isCard
                        active={isEditing}
                    />
                </Fragment>
            )}
            <Input
                label='Last Updated'
                name='lastUpdated'
                isCard
                active={false}
            />
            {!isTester ? <CardDivider /> : isEditing && <CardDivider />}
            <div className={c.footer}>
                {!isTester ? (
                    <ButtonGroup color='secondary'>
                        <IconedButton
                            color='secondary'
                            onClick={() => handleMailModal(requestMailProps)}
                            Icon={RequestIcon}
                            size='small'
                        >
                            Request Update
                        </IconedButton>
                        <IconedButton
                            color='secondary'
                            onClick={() => handleMailModal(mailProps)}
                            Icon={MailIcon}
                            size='small'
                        >
                            Email Tester
                        </IconedButton>
                    </ButtonGroup>
                ) : (
                    <div />
                )}
                {isEditing ? (
                    <IconedButton
                        Icon={EditIcon}
                        onClick={() => {
                            handleSubmit();
                            setEditing(!isEditing);
                        }}
                        disabled={invalid || submitting}
                    >
                        Save Edits
                    </IconedButton>
                ) : (
                    !isTester && (
                        <IconedButton
                            onClick={() =>
                                handleConfirmationModal(confirmationProps)
                            }
                            Icon={DeleteIcon}
                        >
                            Delete Tester
                        </IconedButton>
                    )
                )}
            </div>
        </EditableCard>
    );
};

const mapState = state => {
    const formSelector = formValueSelector('TesterDetails');
    const titles = selectTitles(state);
    return {
        userEmail: selectEmail(state),
        userFullName: selectFullName(state),
        id: selectTesterId(state),
        isTester: selectIsTester(state),
        titles,
        genders: selectGenders(state),
        martitalStatuses: selectMaritalStatuses(state),
        nationalities: selectNationalities(state),
        ethnicities: selectEthnicities(state),
        hasChildren: selectHasChildren(state),
        email: formSelector(state, 'email'),
        title: mapFromValue(titles, formSelector(state, 'title')),
        firstName: formSelector(state, 'firstName'),
        surname: formSelector(state, 'surname'),
    };
};

const mapDispatch = {
    deleteUserByAdmin
};

const mapModal = {
    handleMailModal: MailModal,
    handleConfirmationModal: ConfirmationModal
};

const validate = values => {
    const required = [
        'title',
        'firstName',
        'surname',
        'gender',
        'dob',
        'maritalStatus',
        'hasChildren',
        'nationality',
        'ethnicity',
        'firstLanguage',
        'about'
    ];
    return { ...validateRequired(values, required) };
};

const onSubmit = (
    { age, dob, hasChildren, email, ...values },
    dispatch,
    { id }
) => {
    const tester = {
        id,
        dob: serializeDate(dob),
        hasChildren: hasChildren === 'Yes',
        ...values
    };
    return dispatch(updateTester(tester));
};

const _TesterDetails = compose(
    connect(
        mapState,
        mapDispatch
    ),
    withModal(mapModal),
    reduxForm({
        form: 'TesterDetails',
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate,
        onSubmit
    })
)(TesterDetails);

export { _TesterDetails as default, _TesterDetails as TesterDetails };
