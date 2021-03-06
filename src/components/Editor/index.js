import React, { Component } from 'react';
import { Field } from 'redux-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './editor.css';

class Editor extends Component {
    state = {
        value: this.props.input.value || ''
    };

    handleChange = value => this.setState({ value });

    handleBlur = () => {
        const { state, props } = this;
        const {
            input: { onChange, onBlur }
        } = props;

        onChange(state.value);
        onBlur();
    };

    handleFocus = () => {
        const {
            input: { value, onFocus }
        } = this.props;

        this.setState({ value });
        onFocus();
    };

    render() {
        const { state, props, handleChange, handleFocus, handleBlur } = this;

        const { input, ...restProps } = props;

        return (
            <ReactQuill
                value={state.value}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                {...restProps}
            />
        );
    }
}

const _Editor = props => <Field {...props} component={Editor} />;

const NativeEditor = props => <ReactQuill {...props} />;

export { _Editor as default, _Editor as Editor, NativeEditor };
