import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Clear from '../../../node_modules/@material-ui/icons/Clear';

const styles = () => ({
    bar: {
        display: 'flex',
        overflow: 'hidden',
        paddingTop: '0.2rem',
    },
    section: {
        display: 'flex',
        paddingRight: '0.75rem',
        cursor: 'pointer',
    },
    text: {
        fontSize: '0.75rem',
        color: '#387ff5',
        paddingRight: '0.2rem',
    },
    icon: {
        color: 'tomato',
        width: '0.75em',
        height: '0.75em',
    },
});

const ImageDeleteBarComponent = ({
    classes: { bar, section, text, icon },
    images, //array of obj => { name, onClick }
}) => {
    return (
        <div className={bar}>
            {images &&
                images.map(({ name, onClick }, index) => {
                    return (
                        <div key={index} className={section} onClick={onClick}>
                            <Typography className={text}>{name}</Typography>
                            <Clear className={icon} />
                        </div>
                    );
                })}
        </div>
    );
};

ImageDeleteBarComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

const ImageDeleteBar = withStyles(styles)(ImageDeleteBarComponent);
export { ImageDeleteBar as default, ImageDeleteBar };
