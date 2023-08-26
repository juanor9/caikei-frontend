/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import TopNav from '../../components/TopNav/TopNav';
import ImportLibraryForm from '../../feature/import/components/ImportLibraryForm/ImportLibraryForm';

const ImportLibraries = () => (
  <div className="libraries">
    <TopNav />
    <main className="libraries__main-container">
      <h2>Importa las librerías con las que trabajas</h2>
      <div>
        <FontAwesomeIcon icon={faExclamationTriangle} />
        <p>
          Al importar un inventario nuevo se remplazan todos los datos del inventario actual.
          Procede solo si estas seguro de querer eliminar el inventario actual.
        </p>
      </div>
      <div>
        <ImportLibraryForm />
      </div>
    </main>
  </div>
);

export default ImportLibraries;
