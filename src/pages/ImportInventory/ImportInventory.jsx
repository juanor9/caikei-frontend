/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import TopNav from '../../components/TopNav/TopNav';
import ImportExcelForm from '../../feature/movements/components/ImportExcelForm/ImportExcelForm';

const ImportInventory = () => {
  const [importKind, setImportKind] = useState('');
  return (
    <div className="libraries">
      <TopNav />
      <main className="libraries__main-container">
        <h2>Importa tu inventario</h2>
        <div>
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <p>
            Al importar un inventario nuevo se remplazan todos los datos del inventario actual.
            Procede solo si estas seguro de querer eliminar el inventario actual.
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => { setImportKind('excel'); }}
          >
            Importar desde formato de Excel
          </button>
          <button
            type="button"
            onClick={() => { setImportKind('alejandria'); }}
          >
            Importar desde formato exportado de Alejandría
          </button>
          {importKind === 'excel'
            ? <ImportExcelForm />
            : null}
        </div>
      </main>
    </div>
  );
};

export default ImportInventory;
