import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from '../../../store/actions/authActions';
import InputElement from '../InputElement/InputElement';

import style from './SignUpForm.module.css';

const SignUpForm = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    confirm: '',
  });
  const { username, email, password, confirm } = formState;

  const [errorState, setErrorState] = useState({
    usernameErr: '',
    emailErr: '',
    passwordErr: '',
    confirmErr: '',
  });
  const { usernameErr, emailErr, passwordErr, confirmErr } = errorState;

  const dispatch = useDispatch();

  const signupHandler = (event) => {
    event.preventDefault();
    const isValid = validator();
    if (isValid) {
      dispatch(signUp(formState));
    }
  };

  const validator = () => {
    let usernameErr = null;
    let emailErr = null;
    let passwordErr = null;
    let confirmErr = null;

    if (username.trim() === '') usernameErr = 'Username is required';
    if (!email.includes('@')) emailErr = 'Valid email is required';
    if (password.length < 6 || password.length > 9)
      passwordErr = 'Password must be between 6 to 9 characters';
    if (confirm !== password || confirm.trim() === '')
      confirmErr = 'Please valid your password';

    if (usernameErr || emailErr || passwordErr || confirmErr) {
      setErrorState((prevState) => {
        return {
          ...prevState,
          usernameErr,
          emailErr,
          passwordErr,
          confirmErr,
        };
      });
      return false;
    }
    return true;
  };

  const updateState = (event) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const formConfig = [
    {
      id: 1,
      inputType: 'text',
      value: username,
      holder: 'Username',
      name: 'username',
      error: usernameErr,
    },
    {
      id: 2,
      inputType: 'email',
      value: email,
      holder: 'Email',
      name: 'email',
      error: emailErr,
    },
    {
      id: 3,
      inputType: 'password',
      value: password,
      holder: 'Password',
      name: 'password',
      error: passwordErr,
    },
    {
      id: 4,
      inputType: 'password',
      value: confirm,
      holder: 'Confirm',
      name: 'confirm',
      error: confirmErr,
    },
  ];

  return (
    <div className={style['sign-up-main']}>
      <div className={style['sign-up-header']}>
        <h2>Sign up</h2>
      </div>
      <form onSubmit={signupHandler} className={style['sign-up-form']}>
        {formConfig.map((input) => (
          <InputElement
            key={input.id}
            inputType={input.inputType}
            value={input.value}
            holder={input.holder}
            name={input.name}
            insertFunc={updateState}
            error={input.error}
          />
        ))}
        <button type={'submit'}>Sgin Up</button>
      </form>
      <div className={style['sign-up-footer']}>
        <small>
          Already have account? <Link to={'/sign-in'}>Sign in</Link>
        </small>
        <small>
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
        </small>
      </div>
    </div>
  );
};

export default withRouter(SignUpForm);
