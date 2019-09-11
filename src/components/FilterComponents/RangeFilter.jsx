/*******************************************************
IMPLEMENTATION

<RangeFilter
    title={FILTER_KEY['age']}
    onChange={(e, value) =>
        onChange(e, FILTER_KEY['age'], 'range', value)
    }
    value={getFilterValues(FILTER_KEY['age'])}
/>
********************************************************/

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Slider from '@material-ui/core/Slider';

import { AccordionFilterContainer } from './FilterContainer';

const useStyles = makeStyles(theme => ({
    gridContainer: {
        margin: 0,
        padding: 9,
        width: '100%'
    },
    textCenter: {
        textAlign: 'center'
    }
}));

const RangeFilter = ({ value, onChange, title, step, min, max }) => {
    const c = useStyles();

    const [rangeValue, setValue] = useState([min, max]);
    const [committedRangeValue, setCommittedValue] = useState([min, max]);

    const handleChange = (e, newValue) => setValue(newValue);

    const handleCommittedChange = (e, committedValue) =>
        setCommittedValue(committedValue);

    const valuetext = value => value;

    useEffect(() => {
        onChange(null, committedRangeValue);
    }, [onChange, committedRangeValue]);

    return (
        <AccordionFilterContainer title={title}>
            <Grid
                container
                spacing={2}
                className={c.gridContainer}
                alignItems='center'
            >
                <Grid md={2} item className={c.textCenter}>
                    {rangeValue[0]}
                </Grid>
                <Grid md={8} item>
                    <Slider
                        value={rangeValue}
                        onChange={handleChange}
                        onChangeCommitted={handleCommittedChange}
                        valueLabelDisplay='auto'
                        aria-labelledby={title}
                        marks
                        getAriaValueText={valuetext}
                    />
                </Grid>
                <Grid md={2} item className={c.textCenter}>
                    {rangeValue[1]}
                </Grid>
            </Grid>
        </AccordionFilterContainer>
    );
};

RangeFilter.defaultProps = {
    step: 1,
    max: 100,
    min: 0
};
RangeFilter.propTypes = {
    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.number,
    title: PropTypes.string.isRequired
};

export { RangeFilter as default, RangeFilter };
