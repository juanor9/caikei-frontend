import PropTypes from 'prop-types';
import './PlanCard.scss';

const PlanCard = ({ plan, cost, titles }) => {
  const currencyCost = cost.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const planPaymentLink = {
    10: 'https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c9380848a6c207d018a75ba5ac9062a',
    20: 'https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c9380848a6c2082018a75bb234005f2',
    30: 'https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c9380848a6c2082018a75bbcd0c05f3',
    40: 'https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c9380848a6c2082018a75c10e8005f8',
    60: 'https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c9380848a6c204d018a75c1883c0654',
    80: 'https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c9380848a6c2082018a75c2211f05f9',
    100: 'https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c9380848a6c204d018a75c29cf50658',
    200: 'https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c9380848a6c207d018a75c34598062e',
    400: 'https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c9380848a6c204d018a75c3e354065a',
  };
  const PaymentLink = planPaymentLink[titles];
  return (
    <div className="plan-card">
      <p className="plan-card__name"><b>{plan}</b></p>
      {cost > 0
        ? <p className="plan-card__cost"><span className="plan-card__cost--number">{currencyCost}</span> + IVA/mes</p>
        : <p className="plan-card__cost--number">{currencyCost}</p>}
      <p>{titles} títulos activos</p>
      {PaymentLink
        ? <a href={PaymentLink} className="plan-card__link">Suscribirse</a>
        : null}
    </div>
  );
};
PlanCard.propTypes = {
  plan: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  titles: PropTypes.number.isRequired,
};

export default PlanCard;
