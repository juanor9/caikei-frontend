import './LoginForm.scss';
import { useDispatch } from 'react-redux';
import useForm from '../../../../hooks/useForm';
import { login } from '../../services/auth';

const LoginForm = () => {
  const { form, handleChange } = useForm({}); // get form hook
  const dispatch = useDispatch(); // use dispatch

  // On click, reset form
  const handleClick = () => {
    document.getElementById('login-form__form').reset();
  };

  // On submit, prevent form submission and dispatch service
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(login(form));
    } catch (error) {
      throw new Error(error);
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
            className="login-form__input"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password" className="login-form__label">
          Password
          <input
            type="password"
            name="password"
            id="password"
            className="login-form__input"
            onChange={handleChange}
          />
        </label>
        <button
          type="submit"
          className="login-form__submit-button"
          onClick={handleClick}
        >
          Iniciar sesión
        </button>
      </form>
    </section>
  );
};
export default LoginForm;
