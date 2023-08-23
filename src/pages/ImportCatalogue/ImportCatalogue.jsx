/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import TopNav from '../../components/TopNav/TopNav';
import ImportCatalogueForm from '../../feature/import/components/ImportCatalogueForm/ImportCatalogueForm';

const ImportCatalogue = () => (
  <div className="libraries">
    <TopNav />
    <main className="libraries__main-container">
      <h2>Importa tu catálogo</h2>
      <div>
        <FontAwesomeIcon icon={faExclamationTriangle} />
        <p>
          Al importar un inventario nuevo se remplazan todos los datos del inventario actual.
          Procede solo si estas seguro de querer eliminar el inventario actual.
        </p>
      </div>
      <div>
        <ImportCatalogueForm />
      </div>
    </main>
  </div>
);

export default ImportCatalogue;
