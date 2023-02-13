import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useForm from '../../../../hooks/useForm';
import { createUser } from '../../services/users';
import './RegisterForm.scss';

const RegisterForm = () => {
  const { form, handleChange } = useForm({}); // get form hook
  const dispatch = useDispatch(); // use dispatch

  // On click, reset form
  const handleClick = () => {
    document.getElementById('register-form__form').reset();
  };

  // On submit, prevent form submission and dispatch service
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(createUser(form));
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <section className="register-form">
      <h2 className="register-form__header">Crea tu cuenta</h2>
      <form
        action=""
        onSubmit={handleSubmit}
        id="register-form__form"
        className="register-form__form"
      >
        <label htmlFor="email" className="register-form__label">
          Email
          <input
            id="email"
            name="email"
            type="text"
            className="register-form__input"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password" className="register-form__label">
          Password
          <input
            id="password"
            name="password"
            type="password"
            className="register-form__input"
            onChange={handleChange}
          />
        </label>
        <button
          type="submit"
          onClick={handleClick}
          className="register-form__submit-button"
        >
          Registrarse
        </button>
        <Link to="/login" className="register-form__login-button">Iniciar sesión</Link>
      </form>
    </section>
  );
};

export default RegisterForm;
