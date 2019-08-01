import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import ModalChevron from './ModalChevron';
import styles from './styles';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const UnwrappedModalCarousel = ({
    classes: { backdrop, paper, card, image },
    images,
    onClose,
    open,
    initial,
}) => {
    const settings = {
        infinite: true,
        initialSlide: initial,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        prevArrow: <ModalChevron />,
        nextArrow: <ModalChevron right />,
    };

    return (
        <Modal
            BackdropProps={{ className: backdrop }}
            aria-labelledby='image-open-modal'
            aria-describedby='image-open-modal'
            open={open}
            onClose={onClose}
        >
            <div className={paper}>
                <Card className={card}>
                    <Slider {...settings}>
                        {images.map((image, id) => (
                            <img
                                key={id}
                                src={image}
                                alt=''
                                className={image}
                            />
                        ))}
                    </Slider>
                </Card>
            </div>
        </Modal>
    );
};

UnwrappedModalCarousel.propTypes = {
    classes: PropTypes.object.isRequired,
    images: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    initial: PropTypes.number,
};

const ModalCarousel = withStyles(styles)(UnwrappedModalCarousel);

export { ModalCarousel as default, ModalCarousel };
