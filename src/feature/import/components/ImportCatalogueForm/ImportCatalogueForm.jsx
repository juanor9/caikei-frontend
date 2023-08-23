import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { uploadExcel } from '../../../uploads/services/upload';
import { excelDateToJSDate, convertCamelCaseToReadable } from '../../services/functions';
import { getUser } from '../../../users/services/users';
import { createBook } from '../../../books/services/books';

const ImportCatalogueForm = () => {
  const [file, setFile] = useState('');
  const dispatch = useDispatch();
  const { uploads } = useSelector((state) => state.upload);
  const userToken = localStorage.getItem('login-token');
  const { userData } = useSelector((state) => state.user);

  const handleChangeFile = ({ target }) => {
    const { files } = target;
    const excelFile = files[0];
    setFile(excelFile);
  };

  const handleSubmitFile = async (event) => {
    event.preventDefault();
    if (file) {
      try {
        dispatch(uploadExcel(file));
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  const [importItems, setImportItems] = useState([]);
  useEffect(() => {
    const fetchDataFromExcel = async () => {
      if (uploads && Array.isArray(uploads)) {
        try {
          const uploadedItems = uploads.map((item) => {
            const {
              fechaDePublicacion,
            } = item;
            const pubDate = excelDateToJSDate(fechaDePublicacion);

            const newItem = { ...item, fechaDePublicacion: pubDate.toLocaleDateString() };
            return newItem;
          });
          setImportItems(uploadedItems);
          const successNotification = () => toast.success(
            'El archivo fue cargado con éxito',
          );
          successNotification();
        } catch (error) {
          console.log('🚀 ~ file: ImportExcelForm.jsx:88 ~ fetchDataFromExcel ~ error:', error);
          const errorNotification = () => toast.error(
            `Hay un error en tu archivo.
            Verifica que los libros y librerías de tu archivo
            existan en el sistema y vuelve a intentarlo.`,
          );
          errorNotification();
        }
      }
    };
    fetchDataFromExcel();
  }, [uploads]);

  const importCatalogue = () => {
    if (!importItems || !Array.isArray(importItems)) {
      return null;
    }
    try {
      dispatch(getUser(userToken));
    } catch (error) {
      const errorNotification = () => toast.error(
        'Hubo un error al traer la información de la editorial.',
      );
      errorNotification();
    }
    const { publisher } = userData;
    const newCatalogue = importItems.map((item) => {
      const {
        titulo,
        isbn,
        pvp,
        fechaDePublicacion,
        paginas,
        autores,
        alto,
        ancho,
        codigoCentroDeCosto,
      } = item;

      const newItem = {
        title: titulo,
        isbn,
        price: pvp,
        pubDate: fechaDePublicacion,
        authors: autores,
        pages: paginas,
        height: alto,
        width: ancho,
        costCenter: codigoCentroDeCosto,
        publisher,
      };

      try {
        dispatch(createBook({ ...newItem, userToken }));
        const successNotification = () => toast.success(
          `El libro "${titulo}" fue actualizado con éxito`,
        );
        successNotification();
      } catch (error) {
        const errorNotification = () => toast.error(
          `Hubo un error al crear el libro "${titulo}"`,
        );
        errorNotification();
      }
      return newItem;
    });
    return newCatalogue;
  };

  return (
    <section>
      <h3>Importar desde formato de Excel</h3>
      <Link to="https://res.cloudinary.com/dvi7rfug1/raw/upload/v1680312758/excelFiles/caikei-import-format_ntf1ki.xlsx">
        Descarga el formato de Excel
      </Link>
      <form action="" onSubmit={handleSubmitFile}>
        <label htmlFor="excel-file">
          Carga tu inventario en Excel
          <input
            type="file"
            accept=".xlsx"
            onChange={handleChangeFile}
          />
        </label>
        <button type="submit">Cargar archivo</button>
      </form>
      {importItems && Array.isArray(importItems) && importItems.length > 0
        ? (
          <>
            {importItems.map((item) => {
              const keys = Object.keys(item);

              return (
                <article key={item.index}>
                  {Array.isArray(keys) && keys.length > 0
                    ? (
                      <>
                        {keys.map((key) => (
                          <p key={key}><b>{convertCamelCaseToReadable(key)}:</b> {item[key]}</p>
                        ))}
                      </>
                    )
                    : null}
                  <hr />
                </article>
              );
            })}
            <button type="submit" onClick={importCatalogue}>Verificar inventario</button>
          </>
        )
        : null}
      <Toaster />
    </section>
  );
};

export default ImportCatalogueForm;
