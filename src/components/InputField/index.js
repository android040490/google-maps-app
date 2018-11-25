import React from 'react';

const InputField = (props) => {

    const { input, type, meta: { error, touched, valid } } = props
    const errorText = touched && error && <div style={{ color: 'red' }}>{error}</div>
    return (
        <div>
            <label >{input.name}</label>
            <input className={valid ? 'valid' : error && touched ? 'invalid' : ''} {...input} type={type} />
            {errorText}
        </div>
    );
};

export default InputField;