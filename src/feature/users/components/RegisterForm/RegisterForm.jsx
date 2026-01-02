import './RegisterForm.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createUser } from '../../services/users';
import { login } from '../../services/auth';
import Modal from '../../../../components/Modal/Modal';
import useForm from '../../../../hooks/useForm';

const RegisterForm = () => {
  const { form, handleChange } = useForm({}); // get form hook
  const dispatch = useDispatch(); // use dispatch
  const navigate = useNavigate(); // use navigation hook
  const { email } = useSelector((state) => state.user.userData);

  const [newUser, setNewUser] = useState(false);

  // On submit, prevent form submission and dispatch service
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // 1. Create the user
      await dispatch(createUser(form));

      // 2. Automatically login with the same credentials
      const loginResult = await dispatch(login(form));

      // 3. If login is successful, redirect to publisher registration
      if (
        loginResult.payload
        && !String(loginResult.payload).includes('Error')
      ) {
        navigate('/publisher/register');
      } else {
        // If automatic login fails, show success modal
        setNewUser(true);
      }
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
        <button type="submit" className="register-form__submit-button">
          Registrarse
        </button>
      </form>
      {newUser === true ? (
        <Modal modalFunction={setNewUser} message={message} type="success" />
      ) : null}
      <div className="register-form__disclaimer">
        <p>
          Al hacer click en &quot;Registrarse&quot; confirmo que he leído y
          acepto los
          <Link to="/terms-and-conditions">
            {' '}
            Términos y condiciones de la aplicación{' '}
          </Link>
          así como nuestra <Link to="/privacy">Política de privacidad</Link>.
        </p>
      </div>
    </section>
  );
};

export default RegisterForm;
