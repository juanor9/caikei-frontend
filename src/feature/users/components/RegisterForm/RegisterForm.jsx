/* eslint-disable */
// import './styles.css';
import useForm from '../../../../hooks/useForm';
import { useDispatch } from 'react-redux';
import createUser from '../../services/users';


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
      dispatch(createUser(form));
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <section className="login-form">
      <h2>Registrarse</h2>
      <form
      action=""
      onSubmit={handleSubmit}
      id= "login-form__form">
        <label htmlFor="email">
          email
          <input id="email" name="email" type="text" onChange={handleChange} />
        </label>
        <label htmlFor="password">
          password
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
          />
        </label>
        <button type="submit" onClick={handleClick}>
          Registrarse
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
