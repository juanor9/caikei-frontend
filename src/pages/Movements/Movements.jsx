import './Movements.scss';
import { Link } from 'react-router-dom';
import TopNav from '../../components/TopNav/TopNav';

const MovementsPage = () => (
  <div className="libraries">
    <TopNav />
    <main>
      <h2>Movimientos de ejemplares</h2>
      <Link to="/movement/register" className="movements__add-button">Crear nuevo movimiento</Link>
    </main>
  </div>
);

export default MovementsPage;
