import './App.css';
import RegisterForm from './feature/users/components/RegisterForm/RegisterForm';
import LoginForm from './feature/users/components/LoginForm/LoginForm';

const App = () => (
  <div className="App">
    <RegisterForm />
    <LoginForm />
  </div>
);

export default App;
