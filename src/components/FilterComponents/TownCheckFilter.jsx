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
import { selectTowns } from 'selectors';

// Actions
import { listTesterTowns } from 'actions';

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

const TownCheckFilter = ({
    checked,
    allTowns,
    onChange,
    title,
    listTesterTowns
}) => {
    const c = useStyles();
    const [towns, setTowns] = useState(allTowns);
    const [input, setInput] = useState('');

    const checkSize = 34;
    const checkedShown = 5;
    const totalShown = 10;

    const height =
        towns.length < totalShown - checked.length
            ? towns.length * checkSize
            : checked.length > totalShown - checkedShown
            ? (totalShown - checkedShown) * checkSize
            : (totalShown - checked.length) * checkSize;

    useEffect(() => {
        listTesterTowns();
    }, [listTesterTowns]);

    useEffect(() => {
        setTowns(
            allTowns.filter(
                town =>
                    !checked.includes(town) &&
                    (input === '' ||
                        town.toLowerCase().includes(input.toLowerCase()))
            )
        );
    }, [input, checked, allTowns]);

    const isChecked = datum => checked.includes(datum);

    const Town = ({ index, style }) => {
        return (
            <CheckControlLabel
                styles={{ root: c.check }}
                style={style}
                key={index}
                checked={isChecked(towns[index])}
                value={towns[index]}
            />
        );
    };

    const resultsText = `Showing ${towns.length} out of ${allTowns.length -
        checked.length}`;

    const selectedText = !!towns.length ? resultsText : 'No matches';
    const unselectedText = !!towns.length
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
                        itemCount={towns.length}
                        className={c.fixed}
                    >
                        {Town}
                    </FixedSizeList>
                </FormGroup>
            </FormControl>
        </AccordionFilterContainer>
    );
};

TownCheckFilter.propTypes = {
    checked: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
};

const mapState = state => ({ allTowns: selectTowns(state) });
const mapDispatch = { listTesterTowns };

const _TownCheckFilter = connect(
    mapState,
    mapDispatch
)(TownCheckFilter);

export { _TownCheckFilter as default, _TownCheckFilter as TownCheckFilter };
