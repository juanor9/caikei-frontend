import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import getPlan from '../services/plans';
import { getBooksByPublisher } from '../../books/services/books';

const PlanDisplay = () => {
  const dispatch = useDispatch();
  const userToken = localStorage.getItem('login-token'); // get user token from local storage

  const { userData } = useSelector((state) => state.user);
  const planId = userData.plan;
  const { plan, titles, cost } = useSelector((state) => state.plan.plan);
  const { publisher } = userData;
  const { catalogue } = useSelector((state) => state.catalogue);

  useEffect(() => {
    dispatch(getPlan({ planId, userToken }));
  }, [userData, planId]);

  useEffect(() => {
    dispatch(getBooksByPublisher({ publisher, userToken }));
  }, [userData]);

  const costCurrency = cost.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'COP',
  });

  return (
    <article>
      <div className="user-profile__header">
        <h2>Suscripción</h2>
      </div>
      <p><b>Plan:</b> {plan}</p>
      <p><b>Títulos:</b> {catalogue.length}/{titles} </p>
      <p><b>Costo mensual:</b> {costCurrency} {}</p>
      <button type="button" className="user-profile__button">Actualizar plan</button>
    </article>
  );
};

export default PlanDisplay;
