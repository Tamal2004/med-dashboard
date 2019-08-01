import { createContext } from 'react';

const ModalCarouselContext = createContext({
    modalOpen: false,
    images: [],
    initial: 0,
    handleModalCarousel: () => {},
});

export { ModalCarouselContext as default, ModalCarouselContext };
