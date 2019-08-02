import React from 'react';
import ModalContext from './ModalContext';

const withModal = mapModalData => Component => {
    class WrappedComponent extends React.Component {
        componentDidMount() {
            this.props.modalContext.addModals(mapModalData);
        }
        render() {
            // Don't pass modalContext
            const { modalContext, ...passedProps } = this.props;

            Object.keys(mapModalData).forEach(handlerName => {
                passedProps[handlerName] = modalContext[handlerName];
            });

            return <Component {...passedProps} />;
        }
    }
    return props => (
        <ModalContext.Consumer>
            {modalContext => (
                <WrappedComponent {...props} modalContext={modalContext} />
            )}
        </ModalContext.Consumer>
    );
};

export { withModal as default, withModal };
