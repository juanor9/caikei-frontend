import "./Modal.scss";
import { CircleX, CircleCheck, Info, TriangleAlert } from "lucide-react";
import PropTypes from "prop-types";

const Modal = ({ modalFunction, message, children, type }) => {
  // Map type to icon
  const iconMap = {
    success: CircleCheck,
    error: CircleX,
    warning: TriangleAlert,
    info: Info,
  };

  const IconComponent = iconMap[type] || iconMap.info;

  return (
    <div className="modal-container" id="modal-container">
      <div className={`modal__main modal__main--${type}`}>
        <header className="modal__header">
          <button
            className="modal__close"
            type="button"
            onClick={() => modalFunction(false)}
          >
            <CircleX size={20} />
          </button>
        </header>
        <div className="modal__icon">
          <IconComponent size={48} />
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
  type: PropTypes.oneOf(["success", "error", "warning", "info"]),
};

Modal.defaultProps = {
  message: "",
  children: "",
  type: "info",
};

export default Modal;
