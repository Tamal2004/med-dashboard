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
    SearchInput
} from 'components';

const useStyles = makeStyles(({ palette, spacing, typography }) => ({
    root: {
        paddingLeft: spacing(2),
        paddingRight: spacing(2)
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
    const c = useStyles();

    const totalPages = Math.floor(data.length / 5) + !!(data.length % 5) || 1;
    return (
        <EditableCard title='Profile Details'>
            <div className={c.root}>
                <Typography variant='h6' className={c.label} gutterBottom>
                    Add Profile
                </Typography>
                <SearchInput
                    Adornment={AddIcon}
                    placeholder='Profile...'
                    color='secondary'
                />
                <Table
                    data={data}
                    action
                    page={page}
                    itemsPerPage={5}
                    styles={{ root: c.table }}
                />
                {totalPages > 1 && (
                    <div className={c.footer}>
                        <PaginationBase
                            handlePage={page => setPage(page)}
                            totalPages={totalPages}
                        />
                    </div>
                )}
            </div>
        </EditableCard>
    );
};

const generateData = (reference, project, contactType, contactedBy) => ({
    Profile: reference
});

ProfileDetails.defaultProps = {
    data: Array.range(0, 3)
        .map(() => [
            generateData('ETCBR-644', 'EM21', 'Approached', 'Gavin'),
            generateData('ETCBR-666', 'JE24', 'Ad', 'Avril Swift')
        ])
        .flatMap(x => x)
};

ProfileDetails.propTypes = {
    data: PropTypes.array.isRequired
};

const mapState = () => ({});

const mapDispatch = {};

const _ProfileDetails = compose(
    connect(
        mapState,
        mapDispatch
    )
)(ProfileDetails);

export { _ProfileDetails as default, _ProfileDetails as ProfileDetails };
