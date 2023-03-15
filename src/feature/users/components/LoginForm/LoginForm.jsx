import './LoginForm.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useForm from '../../../../hooks/useForm';
import { login } from '../../services/auth';
import Modal from '../../../../components/Modal/Modal';

const LoginForm = () => {
  const { form, handleChange } = useForm({}); // get form hook
  const dispatch = useDispatch(); // use dispatch hook
  const navigate = useNavigate(); // use navigation hook

  const [loginFail, setLoginFail] = useState(false);
  const [loginState, setLoginState] = useState(null);

  // On submit, prevent form submission and dispatch service
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginState(null);

    try {
      const res = await dispatch(login(form));
      setLoginState(String(res.payload));
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    if (loginState && loginState.includes('Error')) {
      setLoginFail(true);
    }
    if (loginState && loginState.includes('object')) {
      navigate('/profile');
    }
  }, [loginState]);

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
        <button type="submit" className="login-form__submit-button">
          Iniciar sesión
        </button>
      </form>
      {loginFail === true
        ? (
          <Modal
            modalFunction={setLoginFail}
            message="Contraseña o email incorrectos. Vuelve a intentarlo."
          />
        )
        : null}
    </section>
  );
};
export default LoginForm;
