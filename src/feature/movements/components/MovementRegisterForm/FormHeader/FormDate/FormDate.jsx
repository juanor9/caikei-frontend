import { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

const FormDate = ({ setFormDate }) => {
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const today = useMemo(() => formatDate(new Date()), []);

  useEffect(() => {
    setFormDate(today);
  }, [today, setFormDate]);

  const handleDateChange = ({ target: { value } }) => {
    setFormDate(value);
  };

  return (
    <label htmlFor="date" className="movement-form__label">
      Fecha
      <input
        type="date"
        name="date"
        required
        onChange={handleDateChange}
        defaultValue={today}
        className="movement-form__input"
      />
    </label>
  );
};

FormDate.propTypes = {
  setFormDate: PropTypes.func.isRequired,
};

export default FormDate;
