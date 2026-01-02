

import TopNav from '../../components/TopNav/TopNav';
import ImportCatalogueForm from '../../feature/import/components/ImportCatalogueForm/ImportCatalogueForm';
import './ImportCatalogue.scss';
import { TriangleAlert } from 'lucide-react';

const ImportCatalogue = () => (
  <div className="import-catalogue">
    <TopNav />
    <main className="import-catalogue__main-container">
      <h2>Importa tu catálogo</h2>
      <div className="import-catalogue__warning">
        <TriangleAlert size={20} className="import-catalogue__warning-icon" />
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
