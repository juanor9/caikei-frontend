import './Modal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleXmark,
  faCircleCheck,
  faCircleInfo,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Modal = ({
  modalFunction, message, children, type,
}) => {
  // Map type to icon
  const iconMap = {
    success: faCircleCheck,
    error: faCircleXmark,
    warning: faTriangleExclamation,
    info: faCircleInfo,
  };

  const icon = iconMap[type] || iconMap.info;

  return (
    <div className="modal-container" id="modal-container">
      <div className={`modal__main modal__main--${type}`}>
        <header className="modal__header">
          <button
            className="modal__close"
            type="button"
            onClick={() => modalFunction(false)}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        </header>
        <div className="modal__icon">
          <FontAwesomeIcon icon={icon} />
        </div>
        {message && <p className="modal__copy">{message}</p>}
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  modalFunction: PropTypes.func.isRequired,
  message: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
};

Modal.defaultProps = {
  message: '',
  children: '',
  type: 'info',
};

export default Modal;
