import './PublisherRegister.scss';
import TopNav from '../../components/TopNav/TopNav';
import PublisherRegisterForm from '../../feature/publishers/components/PublisherRegisterForm/PublisherRegisterForm';

const PublisherRegister = () => (
  <div className="user-profile">
    <TopNav />
    <main>
      <h2>Registra tu editorial</h2>
      <PublisherRegisterForm />
    </main>
  </div>
);

export default PublisherRegister;
