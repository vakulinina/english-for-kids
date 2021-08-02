/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../api/api';
import User from '../models/user';

interface Props {
  onCloseModal: () => void;
}

const LoginModal: React.FunctionComponent<Props> = ({ onCloseModal }: Props) => {
  const history = useHistory();
  const [loginError, setLoginError] = useState('');
  const LOGIN_MODAL_CLASS = 'login-modal';

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      await login({ username, password } as User);
      history.push('/admin');
    } catch ({ error }) {
      setLoginError(error);
    }
  };

  return (
    <div className={LOGIN_MODAL_CLASS} onClick={onCloseModal}>
      <form className="login-form" onClick={(e) => e.stopPropagation()} onSubmit={submitForm}>
        <h2 className="login-form-title">Login</h2>
        <label className="login-form-label" htmlFor="login-input">
          <input
            className="login-form-input"
            type="text"
            id="login-input"
            name="username"
            placeholder="login"
            value="admin"
            required
          />
        </label>
        <label className="login-form-label" htmlFor="password-input">
          <input
            className="login-form-input"
            type="text"
            id="password-input"
            name="password"
            placeholder="password"
            value="admin"
            required
          />
        </label>
        {loginError ? <p className="login-error">{loginError}</p> : ''}
        <div className="login-form-buttons">
          <button className="login-form-button" type="submit">Login</button>
          <input className="login-form-button cancel-button" onClick={onCloseModal} type="reset" value="Cancel" />
        </div>
      </form>
    </div>
  );
};

export default LoginModal;
