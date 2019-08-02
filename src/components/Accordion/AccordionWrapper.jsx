import React, { Component } from 'react';
import { AccordionProvider } from './context';

class Accordion extends Component {
    constructor() {
        super();
        this.state = {
            activeBox: null
        };
    }

    handleChange = id => {
        const { activeBox } = this.state;
        this.setState({ activeBox: id === activeBox ? null : id });
    };

    render() {
        const { state, props, handleChange } = this;
        const { activeBox } = state;
        const { children } = props;

        return (
            <AccordionProvider
                value={{
                    expandedId: activeBox,
                    handleChange
                }}
            >
                {children}
            </AccordionProvider>
        );
    }
}

export { Accordion as default, Accordion };
