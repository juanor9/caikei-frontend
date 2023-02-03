/* eslint-disable no-unused-vars */
import './Libraries.scss';
import { Link } from 'react-router-dom';
import TopNav from '../../components/TopNav/TopNav';

const LibrariesPage = () => (
  <div className="user-profile">
    <TopNav />
    <main>
      <h2>Librerías</h2>
      <Link to="/library/register"> Añadir una librería</Link>
    </main>
  </div>
);

export default LibrariesPage;
