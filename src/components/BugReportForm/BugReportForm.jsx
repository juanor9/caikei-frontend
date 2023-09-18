import './BugReportForm.scss';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import useForm from '../../hooks/useForm';
import sendReport from './email';

const BugReportForm = () => {
  const [reportState, setReportState] = useState(false);
  const { form, handleChange } = useForm({});
  const token = localStorage.getItem('login-token');
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(sendReport({ form, token }));
      const successNotification = () => toast.success(
        'El reporte ha sido enviado exitosamente',
      );
      successNotification();
    } catch (error) {
      const errorNotification = () => toast.error(
        `Hubo un error en el envío de tu reporte.
        Por favor vuelve a intentarlo.`,
      );
      errorNotification();
      throw new Error(error);
    }
  };
  return (
    <div className="report">
      <Toaster />
      <button
        type="button"
        className="report__button"
        onClick={() => { setReportState(true); }}
      >
        <FontAwesomeIcon icon={faCircleExclamation} className="report__button-icon" />¿Quieres reportar un error?
      </button>
      {reportState === true
        ? (
          <form action="" className="report__form" onSubmit={handleSubmit}>
            <label htmlFor="page" className="report__form-label">
              ¿En qué página ocurrió el error?
              <input
                type="text"
                name="page"
                id="page"
                className="report__form-input"
                onChange={handleChange}
              />
            </label>
            <label htmlFor="action" className="report__form-label">
              ¿Qué estabas haciendo cuando ocurrió el error?
              <input
                type="text"
                name="action"
                id="action"
                className="report__form-input"
                onChange={handleChange}
              />
            </label>
            <label htmlFor="details" className="report__form-label">
              Describe otros detalles del error
              <textarea
                name="details"
                id="details"
                className="report__form-input--textarea"
                rows="10"
                onChange={handleChange}
              />
            </label>
            <div>
              <button type="submit">Reportar error</button>
              <button type="button" onClick={() => { setReportState(false); }}>Cerrar</button>
            </div>
          </form>
        )
        : null}

    </div>
  );
};

export default BugReportForm;
