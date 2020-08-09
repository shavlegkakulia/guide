import React, { useState } from 'react';
import classes from './Login.css';
import { useHistory } from 'react-router-dom';

import { states } from '../../models/states';
import authService from '../../services/authService';
import stateService from '../../services/stateService';

import useForm from '../../components/formcontrols/useForm';
import validate from '../../components/formcontrols/validations/LoginFormValidationRules';

const Login = (props) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const history = useHistory();

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(login, validate);

    function login() {
        let user = authService.signIn(email, password)
        stateService.setState(states.profileInfo, user);
        history.replace("/");
    }

    return (
        <div className={classes.Login} >
            <form onSubmit={handleSubmit} noValidate>
                <div className={classes.Panel} >
                    <div className={classes.InputContainer}>
                        <label>Email</label>
                        <input type="email" onInput={e => setEmail(e.target.value)} name="email" onChange={handleChange} value={values.email || ''} required />
                        {errors.email && (
                            <p className={classes.IsDanger}>{errors.email}</p>
                        )}
                    </div>
                    <div className={classes.InputContainer}>
                        <label>Password</label>
                        <input type="password" onInput={e => setPassword(e.target.value)} name="password" onChange={handleChange} value={values.password || ''} required />
                        {errors.password && (
                            <p className={classes.IsDanger}>{errors.password}</p>
                        )}
                    </div>
                    <div className={classes.InputContainer}>
                        <input type="submit" className={classes.Clickable} value="login" />
                    </div>
                </div>
            </form>

        </div>
    )
}

export default Login;