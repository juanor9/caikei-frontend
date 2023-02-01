import './Home.scss';
import TopNav from '../../components/TopNav/TopNav';
import RegisterForm from '../../feature/users/components/RegisterForm/RegisterForm';
import ThemaForm from '../../feature/books/components/ThemaForm';

const HomePage = () => (
  <div className="homepage">
    <TopNav />
    <div className="homepage__main-container">
      <section className="homepage__hero">
        <div className="homepage__hero-bg" />
        <div className="homepage__hero-left">
          <h3>Menos tiempo para inventario y más tiempo para libros</h3>
          <figure className="homepage__hero-figure">
            <img src="/hero.png" alt="" className="homepage__hero-image" />
          </figure>
        </div>
        <div className="homepage_hero-right">
          <RegisterForm />
        </div>
      </section>
    </div>
    <ThemaForm />
  </div>
);

export default HomePage;
