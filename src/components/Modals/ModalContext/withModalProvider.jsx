import React from 'react';
import ModalProvider from './ModalProvider';

const withModalProvider = Component => props => (
    <ModalProvider>
        <Component {...props} />
    </ModalProvider>
);

export { withModalProvider as default, withModalProvider };