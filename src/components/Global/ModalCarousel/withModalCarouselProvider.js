import React from 'react';
import ModalCarouselProvider from './ModalCarouselProvider';

const withModalCarouselProvider = Component => {
    return props => (
        <ModalCarouselProvider>
            <Component {...props} />
        </ModalCarouselProvider>
    );
};

export { withModalCarouselProvider as default, withModalCarouselProvider };
