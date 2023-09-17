/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import TopNav from '../../components/TopNav/TopNav';
import ImportLibraryForm from '../../feature/import/components/ImportLibraryForm/ImportLibraryForm';
import './ImportLibraries.scss';

const ImportLibraries = () => (
  <div className="import-libraries">
    <TopNav />
    <main className="import-libraries__main-container">
      <h2>Importa las librerías con las que trabajas</h2>
      <div className="import-libraries__warning">
        <FontAwesomeIcon icon={faExclamationTriangle} className="import-libraries__warning-icon" />
        <p>
          Al importar un nuevo listado de librerías podrían reemplazarse
          todos los datos del inventario actual.
          Procede solo si estas seguro.
        </p>
      </div>
      <div>
        <ImportLibraryForm />
      </div>
    </main>
  </div>
);

export default ImportLibraries;
