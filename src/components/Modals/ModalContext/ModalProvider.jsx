import React, { Component } from 'react';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';

import ModalContext from './ModalContext';
import ModalContainer from '../ModalContainer/index';

import { setModal, openModal, closeModal } from 'actions';

class ModalProvider extends Component {
    state = {
        Modals: []
    };

    // function checks if params type of object (not null or array) or boolean
    handleModal = passedHandlerName => (params = true) => {
        try {
            // Uses coercion & checks for both null and undefined
            // eslint-disable-next-line eqeqeq
            if (params == undefined) {
                throw Error(`${passedHandlerName} parameter invalid type.`);
            }

            const { state, props } = this;

            const index = state.Modals.map(
                ({ handlerName }) => handlerName
            ).indexOf(passedHandlerName);

            const Modals = cloneDeep(state.Modals);

            // Checks if object is object and not arrayObject
            if (typeof params === 'object' && !Array.isArray(params)) {
                Modals[index].props = params;
            }

            // Checks if object is a boolean for open/close
            if (typeof params === 'boolean') {
                Modals[index].props = {};
            }

            props.openModal(passedHandlerName);

            this.setState({ Modals });
        } catch (error) {
            console.error(error);
        }
    };

    composeHandlers = () => {
        const {
            state: { Modals },
            handleModal
        } = this;

        return Modals.reduce(
            (acm, { handlerName }) => ({
                ...acm,
                [handlerName]: handleModal(handlerName)
            }),
            {}
        );
    };

    addModals = mapModalData => {
        const { state, props } = this;

        const { setModal, closeModal } = props;

        const handlers = state.Modals.map(({ handlerName }) => handlerName);

        // Doesn't already exist
        const newHandlers = Object.keys(mapModalData).filter(handlerName => {
            return handlers.indexOf(String(handlerName)) === -1;
        });

        if (newHandlers.length > 0) {
            const newModals = newHandlers.map(handlerName => {
                setModal(handlerName);
                return {
                    Modal: mapModalData[handlerName],
                    handlerName,
                    props: {},
                    onClose: () => closeModal(handlerName)
                };
            });

            this.setState(({ Modals }) => ({
                Modals: [...Modals, ...newModals]
            }));
        }
    };

    render() {
        const { state, props, addModals, composeHandlers } = this;

        const { Modals } = state;
        const { children, modals } = props;

        return (
            <ModalContext.Provider
                value={{
                    ...composeHandlers(),
                    addModals
                }}
            >
                {children}
                {Modals.map(({ Modal, handlerName, props, onClose, index }) => {
                    return modals[handlerName] ? (
                        <ModalContainer
                            onModalClose={onClose}
                            isModalOpen={modals[handlerName]}
                            key={handlerName}
                        >
                            <Modal {...props} onClose={onClose} />
                        </ModalContainer>
                    ) : null;
                })}
            </ModalContext.Provider>
        );
    }
}

const mapStateToProps = ({ utils: { modals } }) => ({ modals });

const mapDispatchToProps = dispatch => ({
    setModal: handlerName => dispatch(setModal(handlerName)),
    openModal: handlerName => dispatch(openModal(handlerName)),
    closeModal: handlerName => dispatch(closeModal(handlerName))
});

const _ModalProvider = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalProvider);

export { _ModalProvider as default, _ModalProvider as ModalProvider };
