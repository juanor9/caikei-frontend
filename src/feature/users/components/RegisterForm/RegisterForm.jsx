import './RegisterForm.scss';
import { Link } from 'react-router-dom';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useState } from 'react';
import { createUser } from '../../services/users';
import Modal from '../../../../components/Modal/Modal';
import useForm from '../../../../hooks/useForm';

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
      </form>
      {newUser === true
        ? (
          <Modal
            modalFunction={setNewUser}
            message={message}
          />
        )
        : null}
      <div className="register-form__disclaimer">
        <p>Al hacer click en &quot;Registrarse&quot; confirmo que he leído y acepto los
          <Link to="/terms-and-conditions"> Términos y condiciones de la aplicación </Link>
          así como nuestra <Link to="/privacy">Política de privacidad</Link>.
        </p>
      </div>
    </section>
  );
};

export default RegisterForm;
