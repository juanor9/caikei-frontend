import './Movements.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopNav from '../../components/TopNav/TopNav';
import { getMovementsByPublisher } from '../../feature/movements/services/movements';
import { getUser } from '../../feature/users/services/users';
import MovementCard from '../../feature/movements/components/MovementCard/MovementCard';

const MovementsPage = () => {
  const userToken = localStorage.getItem('login-token');
  const dispatch = useDispatch();

  useEffect(() => {
    if (userToken) {
      try {
        dispatch(getUser(userToken));
      } catch (error) {
        throw new Error(error);
      }
    }
  }, []);
  const { publisher } = useSelector((state) => state.user.userData);

  useEffect(() => {
    if (publisher) {
      try {
        dispatch(getMovementsByPublisher(publisher));
      } catch (error) {
        throw new Error(error);
      }
    }
  }, [publisher]);
  const { movement } = useSelector((state) => state.movements);
  return (
    <div className="movements">
      <TopNav />
      <main className="movements__main-container">
        <h2>Movimientos de ejemplares</h2>
        <Link to="/movement/register" className="movements__add-button">
          Crear nuevo movimiento
        </Link>
        <table className="movements__movements-container">
          <thead>
            <tr>
              <th>Id interno</th>
              <th>Fecha</th>
              <th>Tipo de movimiento</th>
              <th className="movements__cell--not-mobile">Desde</th>
              <th className="movements__cell--not-mobile">Hacia</th>
              <th className="movements__cell--not-mobile">Valor</th>
            </tr>
          </thead>
          <tbody>
            {movement && Array.isArray(movement)
              ? (movement.map((m) => (
                <MovementCard
                  key={m._id}
                  dbid={m._id}
                  id={m.internalId}
                  date={m.date}
                  kind={m.kind}
                  from={m.from}
                  to={m.to}
                  grossTotal={m.grossTotal}
                  netTotal={m.netTotal}
                  books={m.books}
                />
              )))
              : null}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default MovementsPage;
