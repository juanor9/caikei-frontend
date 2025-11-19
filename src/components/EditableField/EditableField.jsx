/**
 * EditableField Component
 * Applies SRP (Single Responsibility Principle) - handles editable input fields
 * Applies DRY - eliminates duplicated code in Book.jsx
 */
import PropTypes from 'prop-types';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import './EditableField.scss';

const EditableField = ({
  label,
  name,
  type,
  defaultValue,
  value,
  readOnly,
  onChange,
  className,
  disabled,
}) => {
  const inputRef = useRef(null);

  const handleToggleReadOnly = () => {
    if (inputRef.current) {
      inputRef.current.readOnly = false;
      inputRef.current.focus();
    }
  };

  return (
    <label htmlFor={name} className={`editable-field ${className}`}>
      {label}
      <div className="editable-field__button-input">
        <button
          type="button"
          className="editable-field__edit-button"
          onClick={handleToggleReadOnly}
          aria-label={`Editar ${label}`}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <input
          ref={inputRef}
          type={type}
          name={name}
          id={name}
          className="editable-field__input"
          defaultValue={defaultValue}
          value={value}
          readOnly={readOnly}
          disabled={disabled}
          onChange={onChange}
        />
      </div>
    </label>
  );
};

EditableField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  readOnly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

EditableField.defaultProps = {
  type: 'text',
  defaultValue: undefined,
  value: undefined,
  readOnly: true,
  className: '',
  disabled: false,
};

export default EditableField;
