import { useEffect } from 'react';
import PropTypes from 'prop-types';

const MovementTotals = ({
  formBookData,
  kind,
  setGrossTotal,
  setNetTotal,
  grossTotal,
  netTotal,
}) => {
  function numberToCurrency(value, locale = 'es-CO', currency = 'COP') {
    return value.toLocaleString(locale, { style: 'currency', currency });
  }

  useEffect(() => {
    if (kind === 'ingreso' && formBookData && Array.isArray(formBookData)) {
      const totalCostSubtotal = formBookData.reduce((total, book) => total + book.costSubtotal, 0);
      setGrossTotal(totalCostSubtotal);
      setNetTotal(totalCostSubtotal);
    } else if (formBookData && Array.isArray(formBookData)) {
      const tempGrossTotal = formBookData.reduce((total, book) => total + book.grossSubtotal, 0);
      setGrossTotal(tempGrossTotal);
      const tempNetTotal = formBookData.reduce((total, book) => total + book.netSubtotal, 0);
      setNetTotal(tempNetTotal);
    }
  }, [formBookData, kind, setGrossTotal, setNetTotal]);

  if (kind === 'ingreso') {
    return (
      <div>
        <p><b>Total:</b>{numberToCurrency(grossTotal)}</p>
      </div>
    );
  }

  return (
    <div>
      <p><b>Total bruto:</b>{numberToCurrency(grossTotal)}</p>
      <p><b>Total neto:</b>{numberToCurrency(netTotal)}</p>
    </div>
  );
};

MovementTotals.propTypes = {
  kind: PropTypes.string.isRequired,
  formBookData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      price: PropTypes.number,
      cost: PropTypes.number,
      copies: PropTypes.number,
      costSubtotal: PropTypes.number,
    }),
  ),
  setGrossTotal: PropTypes.func.isRequired,
  setNetTotal: PropTypes.func.isRequired,
  grossTotal: PropTypes.number,
  netTotal: PropTypes.number,
};

MovementTotals.defaultProps = {
  formBookData: [],
  grossTotal: 0,
  netTotal: 0,
};

export default MovementTotals;
