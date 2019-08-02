import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FullscreenIcon from '@material-ui/icons/ZoomOutMap';

import { LinearLoader } from 'components';
import { imgTypes, fileSize, ImageHelperText } from 'helpers';

import styles from './styles';

const ImageBrowser = ({
    classes,
    identifier = 'img-identifier',
    multiple = false,
    label = '',
    required = false,
    onChange = () => {},
    handleImageModal = () => {},
    imgFile = null,
    loading = false,
    imgLoadingstate = null,
    imgLoaderKey = null,
    uploadError = '',
    loader
}) => {
    return (
        <Fragment>
            <TextField
                fullWidth
                label={label + ': '}
                required={required}
                InputProps={{
                    onChange: onChange,
                    disableUnderline: true,
                    inputProps: {
                        type: 'file',
                        multiple: multiple,
                        accept: imgTypes.join(', '),
                        size: fileSize.bytes,
                        id: identifier
                    }
                }}
                InputLabelProps={{
                    shrink: true,
                    classes: {
                        root: classes.inputLabelRoot,
                        focused: classes.inputLabelFocused,
                        shrink: classNames(
                            classes.inputLabelShrank,
                            classes.labelFileFieldCad,
                            classes.customLabel
                        )
                    }
                }}
            />
            <label
                htmlFor={identifier}
                className={classes.browseButtonHTMLLabel}
            >
                <Typography
                    component='div'
                    className={classes.browseButtonImageWrapper}
                >
                    {/*{imgFile ? (
                                            <Fab
                                                aria-label='Full view'
                                                size='small'
                                                className={classes.fab}
                                                onClick={handleImageModal}
                                            >
                                                <FullscreenIcon />
                                            </Fab>
                                        ) : null} */}
                    {loading ? (
                        <LinearLoader loader={loader} />
                    ) : imgFile ? (
                        <Typography
                            component='div'
                            className={classes.browseButtonUploadedImage}
                        >
                            {uploadError.length > 0 ? (
                                <span style={{ color: 'red' }}>
                                    {uploadError}
                                </span>
                            ) : (
                                <img
                                    src={imgFile.url || '#'}
                                    alt={imgFile.name || ''}
                                />
                            )}
                        </Typography>
                    ) : (
                        <Typography
                            component='div'
                            className={classes.browseButtonPlaceholder}
                        >
                            {uploadError.length > 0 ? (
                                <span style={{ color: 'red' }}>
                                    {uploadError}
                                </span>
                            ) : (
                                'Drop file here'
                            )}
                        </Typography>
                    )}
                </Typography>
                <Typography
                    component='div'
                    className={classes.browseButtonRoot}
                >
                    <Typography className={classes.fileListLabel}>
                        {imgFile && !loading ? imgFile.name : null}
                    </Typography>
                    <Button
                        component='span'
                        className={classes.browseButton}
                        disableRipple
                    >
                        Browse
                    </Button>
                </Typography>
            </label>
            <ImageHelperText />
        </Fragment>
    );
};

ImageBrowser.propTypes = {
    classes: PropTypes.object.isRequired
};

const _ImageBrowser = withStyles(styles)(ImageBrowser);

export { _ImageBrowser as default, _ImageBrowser as ImageBrowser };
