import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { CheckboxBlankIcon, CheckboxFilledIcon } from 'assets';
import { composeClasses } from 'libs';

const useStyles = makeStyles(({ spacing, typography }) => ({
    icon: { width: spacing(2), height: spacing(2) },
    root: { marginRight: spacing(1.5), marginLeft: spacing(-1.5) },
    label: { fontSize: typography.caption.fontSize, paddingTop: 1 }
}));

const CheckControlLabel = ({ styles, style, checked, value }) => {
    const { icon, ...c } = composeClasses({ classes: useStyles(), styles });
    return (
        <FormControlLabel
			style={style}
            classes={c}
            value={value}
            control={
                <Checkbox
                    icon={<CheckboxBlankIcon className={icon} />}
                    checkedIcon={<CheckboxFilledIcon className={icon} />}
                    checked={checked}
                    color='primary'
                />
            }
            label={value}
            labelPlacement='end'
        />
    );
};

export { CheckControlLabel as default, CheckControlLabel };
