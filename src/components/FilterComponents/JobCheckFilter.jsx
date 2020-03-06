import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import clsx from 'clsx';

// Material
import {
    makeStyles,
    TextField,
    FormGroup,
    FormControl,
    Typography
} from '@material-ui/core';

// Local
import { AccordionFilterContainer } from './FilterContainer';
import { CheckControlLabel } from './ControlLabel';

// Components
import { Divider } from 'components';

// Selectors
import { selectJobs } from 'selectors';


const useStyles = makeStyles(({ spacing, palette, shape, typography }) => ({
    controlPadding: {
        paddingTop: spacing(),
        paddingBottom: spacing(),
        paddingLeft: spacing(2),
        paddingRight: spacing(2)
    },
    results: {
        textAlign: 'center',
        marginTop: spacing(0.5),
        marginBottom: spacing(-0.5),
        fontColor: palette.grey[400]
    },
    unselectedResults: {
        marginTop: spacing(),
        marginBottom: 0
    },
    textField: {
        paddingBottom: spacing(0.75),
        paddingTop: spacing(0.75),
        paddingLeft: spacing(2),
        paddingRight: spacing(2),
        border: '1px solid',
        borderColor: palette.grey[300],
        borderRadius: shape.borderRadius,
        '&:hover': {
            borderColor: palette.grey[400]
        }
    },
    input: {
        fontSize: typography['subtitle2'].fontSize,
        padding: 0
    },
    check: {
        marginLeft: spacing(-0.75),
        display: 'block'
    },
    fixed: {
        marginTop: spacing()
    }
}));

const JobCheckFilter = ({
    checked,
    allJobs,
    onChange,
    title
}) => {
    const c = useStyles();
    const [jobs, setJobs] = useState(allJobs);
    const [input, setInput] = useState('');

    const checkSize = 34;
    const checkedShown = 5;
    const totalShown = 10;

    const height =
        jobs.length < totalShown - checked.length
            ? jobs.length * checkSize
            : checked.length > totalShown - checkedShown
            ? (totalShown - checkedShown) * checkSize
            : (totalShown - checked.length) * checkSize;


    useEffect(() => {
        setJobs(
            allJobs.filter(
                job =>
                    !checked.includes(job) &&
                    (input === '' ||
                        job.toLowerCase().includes(input.toLowerCase()))
            )
        );
    }, [input, checked, allJobs]);

    const isChecked = datum => checked.includes(datum);

    const Job = ({ index, style }) => {
        return (
            <CheckControlLabel
                styles={{ root: c.check }}
                style={style}
                key={index}
                checked={isChecked(jobs[index])}
                value={jobs[index]}
            />
        );
    };

    const resultsText = `Showing ${jobs.length} out of ${allJobs.length -
        checked.length}`;

    const selectedText = !!jobs.length ? resultsText : 'No matches';
    const unselectedText = !!jobs.length
        ? `${resultsText} unselected`
        : 'No more matches';

    return (
        <AccordionFilterContainer title={title}>
            <FormControl className={c.controlPadding} fullWidth>
                <TextField
                    className={c.textField}
                    placeholder='Type here to narrow results'
                    InputProps={{
                        disableUnderline: true,
                        className: c.input
                    }}
                    value={input}
                    onChange={({ target: { value } }) => setInput(value)}
                />
                {!checked.length && (
                    <Typography variant='caption' className={c.results}>
                        {selectedText}
                    </Typography>
                )}
                <FormGroup aria-label={title} name={title} onChange={onChange}>
                    {checked.map(datum => (
                        <CheckControlLabel
                            styles={{ root: c.check }}
                            key={datum}
                            checked={isChecked(datum)}
                            value={datum}
                        />
                    ))}
                    {!!checked.length && (
                        <Fragment>
                            <Divider />
                            <Typography
                                variant='caption'
                                className={clsx(c.results, c.unselectedResults)}
                            >
                                {unselectedText}
                            </Typography>
                        </Fragment>
                    )}

                    <FixedSizeList
                        height={height}
                        width={'100%'}
                        itemSize={34}
                        itemCount={jobs.length}
                        className={c.fixed}
                    >
                        {Job}
                    </FixedSizeList>
                </FormGroup>
            </FormControl>
        </AccordionFilterContainer>
    );
};

JobCheckFilter.propTypes = {
    checked: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
};

const mapState = state => ({ allJobs: selectJobs(state) });

const _JobCheckFilter = connect(
    mapState
)(JobCheckFilter);

export { _JobCheckFilter as default, _JobCheckFilter as JobCheckFilter };
