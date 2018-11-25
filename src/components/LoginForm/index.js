import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import emailValidator from 'email-validator';

import InputField from 'components/InputField';
import Preloader from 'components/Preloader';
import { getError, getAuthLoading } from 'redux-store/selectors';

class LoginForm extends React.Component {

    render() {
        const { handleSubmit, error, loading } = this.props;

        return (
            <div className="login-form">
                <h2>Sign in</h2>
                <form className="login-form__form" onSubmit={handleSubmit}>
                    <div className="login-form__form-item">
                        <Field name='email' component={InputField} />
                    </div>
                    <div className="login-form__form-item">
                        <Field name='password' component={InputField} type="password" />
                    </div>
                    <div className="login-form__form-item">
                        <input type="submit" />
                    </div>
                </form>
                {
                    loading && <Preloader />
                }
                {
                    error &&
                    <div className="form-err">
                        <h3 className="form-err__stat">{error.status} {error.statusText}</h3>
                        <p className="form-err__mes">{error.data.message}</p>
                    </div>
                }
            </div>
        );
    }
}

const validate = ({ email, password }) => {
    const errors = {}

    if (!email) errors.email = 'email is required'
    else if (!emailValidator.validate(email)) errors.email = 'invalid email'

    if (!password) errors.password = 'password is required'
    else if (password.length < 4) errors.password = 'password to short'

    return errors
}

const mapStateToProps = (state) => {
    return {
        error: getError(state),
        loading: getAuthLoading(state)
    }
}

export default reduxForm({
    form: 'auth',
    validate
})(connect(mapStateToProps)(LoginForm));