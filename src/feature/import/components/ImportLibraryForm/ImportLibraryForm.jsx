/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { uploadExcel } from '../../../uploads/services/upload';
import { convertCamelCaseToReadable } from '../../services/functions';
import { getUser } from '../../../users/services/users';
import {
  getLibrariesByFilter,
  createLibrary,
  updateLibrary,
} from '../../../libraries/services/libraries';

const ImportLibraryForm = () => {
  const [file, setFile] = useState('');
  const dispatch = useDispatch();
  const { uploads } = useSelector((state) => state.upload);
  const userToken = localStorage.getItem('login-token');
  const { userData } = useSelector((state) => state.user);

  const [libraryId, setLibraryId] = useState('');
  const { library } = useSelector((state) => state.library);

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
    if (Object.keys(library).length > 0) {
      setLibraryId(library[0]._id);
    }
  }, [library, libraryId]);

  useEffect(() => {
    const fetchDataFromExcel = async () => {
      if (uploads && Array.isArray(uploads)) {
        try {
          setImportItems(uploads);
          const successNotification = () => toast.success('El archivo fue cargado con éxito');
          successNotification();
        } catch (error) {
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

  const handleCreateLibrary = async (item, publisher) => {
    const {
      nombre,
      idtipo,
      id,
      email,
      ciudad,
      direccion,
      telefono,
      descuento,
    } = item;
    const newLibrary = {
      name: nombre,
      idKind: idtipo,
      idNumber: id,
      email,
      city: ciudad,
      address: direccion,
      phone: telefono,
      publisher,
      discount: descuento,
    };
    try {
      dispatch(createLibrary({ form: newLibrary, userToken }));
      const successNotification = () => toast.success(`La librería "${nombre}" fue creada con éxito`);
      successNotification();
    } catch (error) {
      const errorNotification = () => toast.error(`Hubo un error al crear la librería "${nombre}"`);
      errorNotification();
    }
  };
  const handleUpdateLibrary = async (item) => {
    const dispatchGetUser = await dispatch(getUser(userToken));
    const { publisher } = dispatchGetUser.payload;
    const { id, descuento } = item;

    const updateOldLibrary = {
      publishers: {
        publisherId: publisher,
        discount: descuento,
      },
    };
    try {
      const LibraryCheck = await dispatch(
        getLibrariesByFilter({ filter: { 'libraryIds.number': id }, userToken }),
      );
      if (LibraryCheck.payload.length > 0) {
        const libraryIdState = LibraryCheck.payload[0]._id;
        dispatch(
          updateLibrary({
            form: updateOldLibrary,
            id: libraryIdState,
          }),
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const importLibrary = () => {
    if (!importItems || !Array.isArray(importItems)) {
      return null;
    }
    try {
      dispatch(getUser(userToken));
    } catch (error) {
      const errorNotification = () => toast.error('Hubo un error al traer la información de la editorial.');
      errorNotification();
    }
    const { publisher } = userData;
    const newCatalogue = importItems.map(async (item) => {
      const { id } = item;
      const libraryCheck = await dispatch(
        getLibrariesByFilter({ filter: { 'libraryIds.number': id }, userToken }),
      );
      if (libraryCheck.payload.length > 0) {
        handleUpdateLibrary(item);
      }
      handleCreateLibrary(item, publisher);
    });
    return newCatalogue;
  };

  const importLibrariesSampleURL = 'https://res.cloudinary.com/dvi7rfug1/raw/upload/v1693007894/excelFiles/caikei-import-libraries_sazmm1.xlsx';

  return (
    <section>
      <h3>Importar desde formato de Excel</h3>
      <Link to={importLibrariesSampleURL}>Descarga el formato de Excel</Link>
      <form action="" onSubmit={handleSubmitFile} className="import-form">
        <label htmlFor="excel-file">
          Carga tus librerías en Excel
          <input type="file" accept=".xlsx" onChange={handleChangeFile} />
        </label>
        <button type="submit" className="import-form__button">Cargar archivo</button>
      </form>
      {importItems && Array.isArray(importItems) && importItems.length > 0 ? (
        <>
          {importItems.map((item) => {
            const keys = Object.keys(item);

            return (
              <article key={item.id}>
                {Array.isArray(keys) && keys.length > 0 ? (
                  <>
                    {keys.map((key) => (
                      <p key={key}>
                        <b>{convertCamelCaseToReadable(key)}:</b> {item[key]}
                      </p>
                    ))}
                  </>
                ) : null}
                <hr />
              </article>
            );
          })}
          <button type="submit" onClick={importLibrary} className="import-form__button">
            Verificar
          </button>
        </>
      ) : null}
      <Toaster />
    </section>
  );
};

export default ImportLibraryForm;
