import TopNav from "../../components/TopNav/TopNav";
import ImportLibraryForm from "../../feature/import/components/ImportLibraryForm/ImportLibraryForm";
import "./ImportInventory.scss";
import { TriangleAlert } from "lucide-react";

const ImportInventory = () => (
  <div className="import-inventory">
    <TopNav />
    <main className="import-libraries__main-container">
      <h2>Importa las librerías con las que trabajas</h2>
      <div className="import-libraries__warning">
        <TriangleAlert size={20} className="import-libraries__warning-icon" />
        <p>
          Al importar un nuevo listado de librerías podrían reemplazarse todos
          los datos del inventario actual. Procede solo si estas seguro.
        </p>
      </div>
      <div>
        <ImportLibraryForm />
      </div>
    </main>
  </div>
);

export default ImportInventory;
