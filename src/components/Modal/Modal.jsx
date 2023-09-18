import './Modal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';

const Modal = ({ modalFunction, message, children }) => (
  <div className="modal-container" id="modal-container">
    <div className="modal__main">
      <header className="modal__header">
        <button
          className="modal__close"
          type="button"
          onClick={() => modalFunction(false)}
        >
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>

      </header>
      <p className="modal__copy">{message}</p>
      {children}
    </div>
  </div>
);

Modal.propTypes = {
  modalFunction: PropTypes.func.isRequired,
  message: PropTypes.string,
  children: PropTypes.node,
};

Modal.defaultProps = {
  message: '',
  children: '',
};

export default Modal;
