/* eslint-disable */
import './LoginForm.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useForm from '../../../../hooks/useForm';
import { login } from '../../services/auth';
import { useState } from 'react';

const LoginForm = () => {
  const { form, handleChange } = useForm({}); // get form hook
  const dispatch = useDispatch(); // use dispatch hook
  const navigate = useNavigate(); // use navigation hook

  const [loginError, setLoginError]= useState(null)

  // On submit, prevent form submission and dispatch service
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
     const response = await dispatch(login(form));
     console.log(response);

    } catch (error) {
      console.log('error', error);
      setLoginError(true);
      console.log('loginError', loginError);
      return;
    }
  };

  return (
    <section className="login-form">
      <h2 className="login-form__header">Iniciar sesión</h2>
      <form
        action=""
        className="login-form__form"
        id="login-form__form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email" className="login-form__label">
          Email
          <input
            type="text"
            name="email"
            id="email"
            required
            className="login-form__input"
            autoComplete="username"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password" className="login-form__label">
          Password
          <input
            type="password"
            name="password"
            id="password"
            required
            className="login-form__input"
            autoComplete="current-password"
            onChange={handleChange}
          />
        </label>
        <button
          type="submit"
          className="login-form__submit-button"
        >
          Iniciar sesión
        </button>
      </form>
    </section>
  );
};
export default LoginForm;
