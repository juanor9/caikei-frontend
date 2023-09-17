/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import TopNav from '../../components/TopNav/TopNav';
import ImportCatalogueForm from '../../feature/import/components/ImportCatalogueForm/ImportCatalogueForm';
import './ImportCatalogue.scss';

const ImportCatalogue = () => (
  <div className="import-catalogue">
    <TopNav />
    <main className="import-catalogue__main-container">
      <h2>Importa tu catálogo</h2>
      <div className="import-catalogue__warning">
        <FontAwesomeIcon icon={faExclamationTriangle} className="import-catalogue__warning-icon" />
        <p>
          Al importar un catálogo podrían remplazarse todos los datos del catálogo actual.
          Procede solo si estas seguro.
        </p>
      </div>
      <div>
        <ImportCatalogueForm />
      </div>
    </main>
  </div>
);

export default ImportCatalogue;
