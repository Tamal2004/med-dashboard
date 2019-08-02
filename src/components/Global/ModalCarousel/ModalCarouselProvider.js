import React, { Component } from 'react';

import ModalCarouselContext from './ModalCarouselContext';
import ModalCarousel from './ModalCarousel';

class ModalCarouselProvider extends Component {
    state = {
        openModal: false,
        images: [],
        initial: 0,
    };

    handleModalCarousel = (images, initial = 0) => {
        this.setState({ openModal: true, images, initial });
    };

    handleModalClose = () => {
        this.setState({ openModal: false, images: [] });
    };

    render() {
        const { openModal, images, initial } = this.state;
        return (
            <ModalCarouselContext.Provider
                value={{
                    ...this.state,
                    handleModalCarousel: this.handleModalCarousel,
                }}
            >
                {this.props.children}
                {openModal && (
                    <ModalCarousel
                        open={openModal}
                        images={images}
                        initial={initial}
                        onClose={this.handleModalClose}
                    />
                )}
            </ModalCarouselContext.Provider>
        );
    }
}

export { ModalCarouselProvider as default, ModalCarouselProvider };
