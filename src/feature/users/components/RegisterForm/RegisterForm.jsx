import './RegisterForm.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import useForm from '../../../../hooks/useForm';
import Modal from '../../../../components/Modal/Modal';
import { createUser } from '../../services/users';

const RegisterForm = () => {
  const { form, handleChange } = useForm({}); // get form hook
  const dispatch = useDispatch(); // use dispatch
  const { email } = useSelector((state) => state.user.userData);

  const [newUser, setNewUser] = useState(false);

  // On submit, prevent form submission and dispatch service
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(createUser(form));
      setNewUser(true);
    } catch (error) {
      throw new Error(error);
    }
  };
  const message = `El usuario con correo ${email} ha sido exitosamente creado.`;

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
            required
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
            required
            className="register-form__input"
            onChange={handleChange}
          />
        </label>
        <button
          type="submit"
          className="register-form__submit-button"
        >
          Registrarse
        </button>
        <Link to="/login" className="register-form__login-button">Iniciar sesión</Link>
      </form>
      {newUser === true
        ? (
          <Modal
            modalFunction={setNewUser}
            message={message}
          />
        )
        : null}
    </section>
  );
};

export default RegisterForm;
