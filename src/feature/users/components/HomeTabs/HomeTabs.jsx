import { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';

const HomeTabs = () => {
  const [tab, setTab] = useState('signup');

  return (
    <div>
      <div>
        <button type="button" onClick={() => { setTab('signup'); }}>Registrarse</button>
        <button type="button" onClick={() => { setTab('signin'); }}>Iniciar sesión</button>
      </div>
      {tab === 'signup'
        ? (
          <div>
            <h2 className="register-form__header">Crea tu cuenta</h2>
            <RegisterForm />
          </div>
        )
        : null}
      {tab === 'signin'
        ? (
          <div>
            <h2 className="register-form__header">Ingresa a tu cuenta</h2>
            <LoginForm />
          </div>
        )
        : null}
    </div>
  );
};

export default HomeTabs;
