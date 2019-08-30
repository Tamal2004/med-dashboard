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
import { validateRequired, mapFromValue, serializeDate } from 'libs';
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
import { TesterMailModal, ConfirmationModal } from 'views/Modals';

// Selectors
import {
    selectTesterId,
    selectIsTester,
    selectEthnicities,
    selectGenders,
    selectMaritalStatuses,
    selectNationalities,
    selectTitles
} from 'selectors';

// Actions
import { updateTester } from 'actions';

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
    invalid,
    title,
    firstName,
    surname,
    handleMailModal,
    handleConfirmationModal,
    reset,
    handleSubmit,
    isTester
}) => {
    const [isEditing, setEditing] = useState(false);
    const c = useStyles();

    const confirmationProps = {
        title: 'Confirmation',
        promptText: 'Are you sure you want to delete this user?',
        cancelText: 'Cancel',
        submitText: 'Delete',
        onSubmit: () => console.log('astarst')
    };


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
                >{`${title} ${firstName} ${surname}`}</Typography>
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
            <Switch
                label='Any children?'
                name='hasChildren'
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
            <CardDivider />
            <div className={c.footer}>
                <ButtonGroup color='secondary'>
                    <IconedButton
                        color='secondary'
                        onClick={() => handleMailModal()}
                        Icon={RequestIcon}
                        size='small'
                    >
                        Request Update
                    </IconedButton>
                    <IconedButton
                        color='secondary'
                        onClick={() => handleMailModal()}
                        Icon={MailIcon}
                        size='small'
                    >
                        Email Tester
                    </IconedButton>
                </ButtonGroup>
                {isEditing ? (
                    <IconedButton
                        Icon={EditIcon}
                        onClick={() => {
                            handleSubmit();
                            setEditing(!isEditing);
                        }}
                        disabled={invalid}
                    >
                        Save Edits
                    </IconedButton>
                ) : (
                    !isTester && (
                        <IconedButton
                            onClick={() => handleConfirmationModal(confirmationProps)}
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
        id: selectTesterId(state),
        isTester: selectIsTester(state),
        // isTester: true,
        titles,
        genders: selectGenders(state),
        martitalStatuses: selectMaritalStatuses(state),
        nationalities: selectNationalities(state),
        ethnicities: selectEthnicities(state),
        title: mapFromValue(titles, formSelector(state, 'title')),
        firstName: formSelector(state, 'firstName'),
        surname: formSelector(state, 'surname')
    };
};

const mapDispatch = {};

const mapModal = {
    handleMailModal: TesterMailModal,
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

const onSubmit = ({ age, dob, ...values }, dispatch, { id }) => {
    const tester = {
        id,
        dob: serializeDate(dob),
        ...values
    };
    return dispatch(updateTester(tester));
};

const _TesterDetails = compose(
    connect(mapState),
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
