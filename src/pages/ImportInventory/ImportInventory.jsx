import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import TopNav from '../../components/TopNav/TopNav';
import ImportExcelForm from '../../feature/import/components/ImportInventoryForm/ImportInventoryForm';
import './ImportInventory.scss';

const ImportInventory = () => (
  <div className="import-inventory">
    <TopNav />
    <main className="import-inventory__main-container">
      <h2>Importa tu inventario</h2>
      <div className="import-inventory__warning">
        <FontAwesomeIcon icon={faExclamationTriangle} className="import-inventory__warning-icon" />
        <p>
          Al importar un inventario nuevo se remplazan todos los datos del inventario actual.
          Procede solo si estas seguro de querer eliminar el inventario actual.
        </p>
      </div>
      <div>
        <ImportExcelForm />
      </div>
    </main>
  </div>
);

export default ImportInventory;
