import React from 'react';
import ModalCarouselContext from './ModalCarouselContext';

const withModalCarouselConsumer = Component => {
    return props => (
        <ModalCarouselContext.Consumer>
            {context => <Component {...props} modalCarousel={context} />}
        </ModalCarouselContext.Consumer>
    );
};

export { withModalCarouselConsumer as default, withModalCarouselConsumer };
