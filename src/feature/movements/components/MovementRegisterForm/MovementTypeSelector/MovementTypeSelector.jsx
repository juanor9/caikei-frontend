/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';

const MovementTypeSelector = ({ setKind, handleChange }) => {
  const handleChangeKindMod = (event) => {
    const { value } = event.target;
    if (value) {
      setKind(value);
    }
    if (event) {
      handleChange(event);
    }
  };
  return (
    <label htmlFor="kind" className="movement-form__label--double">
      <p>Tipo</p>
      <label htmlFor="kind">
        <input
          type="radio"
          name="kind"
          id="ingreso"
          value="ingreso"
          required
          onChange={handleChangeKindMod}
        />{' '}
        Ingreso
      </label>
      <label htmlFor="kind">
        <input
          type="radio"
          name="kind"
          id="remisión"
          value="remisión"
          onChange={handleChangeKindMod}
        />{' '}
        Remisión
      </label>
      <label htmlFor="kind">
        <input
          type="radio"
          name="kind"
          id="devolución"
          value="devolución"
          onChange={handleChangeKindMod}
        />{' '}
        Devolución
      </label>
      <label htmlFor="kind">
        <input
          type="radio"
          name="kind"
          id="liquidación"
          value="liquidación"
          onChange={handleChangeKindMod}
        />{' '}
        Liquidación
      </label>
    </label>
  );
};

MovementTypeSelector.propTypes = {
  setKind: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default MovementTypeSelector;
