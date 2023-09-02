import PropTypes from 'prop-types';

const PlanCard = ({ plan, cost, titles }) => {
  const currencyCost = cost.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return (
    <div>
      <p><b>{plan}</b></p>
      {cost > 0
        ? <p>{currencyCost}+IVA/mes</p>
        : <p>{currencyCost}</p>}
      <p>{titles} títulos activos</p>
    </div>
  );
};
PlanCard.propTypes = {
  plan: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  titles: PropTypes.number.isRequired,
};

export default PlanCard;
