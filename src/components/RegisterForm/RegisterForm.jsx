/* eslint-disable no-unused-vars */
// import './styles.css';

const LoginForm = () => {
  const holi = 1;

  return (
    <section className="login-form">
      <h2>Login</h2>
      <form action="">
        <label htmlFor="email">
          username
          <input id="email" name="email" type="text" />
        </label>
        <label htmlFor="email">
          email
          <input id="email" name="email" type="text" />
        </label>
        <label htmlFor="password">
          password
          <input id="password" name="email" type="password" />
        </label>
        <button type="submit">Iniciar sesión</button>
      </form>
    </section>
  );
};

export default LoginForm;
