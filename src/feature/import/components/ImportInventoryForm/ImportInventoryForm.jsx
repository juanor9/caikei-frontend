/* eslint-disable prefer-destructuring */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { uploadExcel } from '../../../uploads/services/upload';
import { getPublisherByFilter } from '../../../publishers/services/publishers';
import { getLibrariesByFilter } from '../../../libraries/services/libraries';
import {
  getBooksByFilter,
  updateBookById,
} from '../../../books/services/books';
import './ImportInventoryForm.scss';

const InventoryImportExcelForm = () => {
  const [file, setFile] = useState('');
  const dispatch = useDispatch();
  const { uploads } = useSelector((state) => state.upload);
  const userToken = localStorage.getItem('login-token');

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
          const uploadedItems = await Promise.all(
            uploads.map(async (item) => {
              const { isbn, documentoDeIdentidadDeBodega, numeroDeEjemplares } = item;

              const bookFilter = { isbn };
              const bookData = await dispatch(
                getBooksByFilter({ bookFilter, userToken }),
              );
              const book = bookData.payload[0];
              if (book === undefined) {
                throw new Error('El libro no existe en la base de datos', item);
              }
              let storage;

              // check if id is publisher
              const storageFilterPublisher = {
                'publisherIds.number': documentoDeIdentidadDeBodega,
              };
              const getPublisherStore = await dispatch(
                getPublisherByFilter({
                  filter: storageFilterPublisher,
                  userToken,
                }),
              );
              storage = getPublisherStore.payload[0];
              if (storage === undefined) {
                throw new Error(
                  'La librería no existe en la base de datos',
                  item,
                );
              }
              // check if id is a library
              if (storage === undefined) {
                const storageFilterLibrary = {
                  'libraryIds.number': documentoDeIdentidadDeBodega,
                };
                const getLibraryStore = await dispatch(
                  getLibrariesByFilter({
                    filter: storageFilterLibrary,
                    userToken,
                  }),
                );
                storage = getLibraryStore.payload[0];
                if (storage === undefined) {
                  throw new Error(
                    `La librería ${documentoDeIdentidadDeBodega} no existe en la base de datos`,
                    item,
                  );
                }
              }

              const inventoryItem = {
                bookId: book._id,
                bookTitle: book.title,
                storageId: storage._id,
                storageName: storage.name,
                copies: numeroDeEjemplares,
              };

              return inventoryItem;
            }),
          );
          setImportItems(uploadedItems);
          const successNotification = () => toast.success('El archivo fue cargado con éxito');
          successNotification();
        } catch (error) {
          const errorNotification = () => toast.error(
            `Hay un error en tu archivo.
            Verifica que los libros y librerías de tu archivo
            existan en el sistema y vuelve a intentarlo.`,
          );
          errorNotification();
          throw new Error(error);
        }
      }
    };
    fetchDataFromExcel();
  }, [uploads]);

  const importInventory = () => {
    if (!importItems || !Array.isArray(importItems)) {
      return null;
    }
    const inventoryMod = importItems.reduce((acc, book) => {
      const { bookId, storageId, copies } = book;
      if (acc[bookId]) {
        acc[bookId].inventory.push({ placeId: storageId, copies });
      } else {
        acc[bookId] = { bookId, inventory: [{ placeId: storageId, copies }] };
      }
      return acc;
    }, {});
    const inventoryByBookId = Object.values(inventoryMod);

    if (!inventoryByBookId || !Array.isArray(inventoryByBookId)) {
      return null;
    }
    inventoryByBookId.map((book) => {
      try {
        dispatch(
          updateBookById({
            form: { inventory: book.inventory },
            id: book.bookId,
            userToken,
          }),
        );
        const successNotification = () => toast.success('El libro fue actualizado con éxito');
        successNotification();
      } catch (error) {
        const errorNotification = () => toast.error(
          `Hubo un error al actualizar el libro.
          Por favor verifica que todos los libros y
          librerías que incluiste en el archivo
          se encuentran registrados.`,
        );
        errorNotification();
      }
      return book;
    });

    return inventoryByBookId;
  };

  const importInventorySampleURL = 'https://res.cloudinary.com/dvi7rfug1/raw/upload/v1693007894/excelFiles/caikei-import-inventory_vzclnk.xlsx';

  return (
    <section>
      <h3>Importar desde formato de Excel</h3>
      <Link to={importInventorySampleURL}>Descarga el formato de Excel</Link>
      <form action="" onSubmit={handleSubmitFile} className="import-form">
        <label htmlFor="excel-file">
          Carga tu inventario en Excel
          <input type="file" accept=".xlsx" onChange={handleChangeFile} />
        </label>
        <button type="submit" className="import-form__button">Cargar archivo</button>
      </form>
      {importItems && Array.isArray(importItems) && importItems.length > 0 ? (
        <>
          {importItems.map(({ bookTitle, storageName, copies }) => (
            <article key={Math.floor(Math.random() * 1000)}>
              <p>{bookTitle}</p>
              <p>{storageName}</p>
              <p>{copies} ejemplares</p>
              <hr />
            </article>
          ))}
          <button type="submit" onClick={importInventory} className="import-form__button">
            Verificar
          </button>
        </>
      ) : null}
      <Toaster />
    </section>
  );
};

export default InventoryImportExcelForm;
