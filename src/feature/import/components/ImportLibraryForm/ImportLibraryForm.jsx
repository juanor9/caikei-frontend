/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { uploadExcel } from '../../../uploads/services/upload';
import { convertCamelCaseToReadable } from '../../services/functions';
import { getUser } from '../../../users/services/users';
import { getLibrariesByFilter, createLibrary, updateLibrary } from '../../../libraries/services/libraries';

const ImportLibraryForm = () => {
  const [file, setFile] = useState('');
  const dispatch = useDispatch();
  const { uploads } = useSelector((state) => state.upload);
  const userToken = localStorage.getItem('login-token');
  const { userData } = useSelector((state) => state.user);

  const [libraryId, setLibraryId] = useState('');
  const { library } = useSelector((state) => state.library);
  console.log('🚀 ~ file: ImportLibraryForm.jsx:20 ~ ImportLibraryForm ~ library:', library);

  useEffect(() => {
    if (Object.keys(library).length > 0) {
      setLibraryId(library[0]._id);
    }
  }, [library, libraryId]);

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
          setImportItems(uploads);
          const successNotification = () => toast.success(
            'El archivo fue cargado con éxito',
          );
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

  const importLibrary = () => {
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
    const newCatalogue = importItems.map(async (item) => {
      const {
        nombre, idtipo, id, email, descuento, direccion, telefono, ciudad,
      } = item;
      try {
        const libraryCheck = await dispatch(getLibrariesByFilter({ filter: { 'libraryIds.number': id }, userToken }));
        let libraryExist = false;
        if (libraryCheck.payload.length > 0) {
          libraryExist = true;
        }

        // si la librería no existe, crear la librería.
        if (libraryExist === false) {
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
            const successNotification = () => toast.success(
              `La librería "${nombre}" fue creada con éxito`,
            );
            successNotification();
          } catch (error) {
            const errorNotification = () => toast.error(
              `Hubo un error al crear la librería "${nombre}"`,
            );
            errorNotification();
          }
        }
        // si la librería existe, añadir los datos de la editorial y descuento.
        const updateOldLibrary = {
          publisher,
          discount: descuento,
        };
        console.log('libraryId: ', libraryId);
        if (libraryId !== '') {
          try {
            dispatch(updateLibrary({ form: updateOldLibrary, id: libraryId }));
            const successNotification = () => toast.success(
              'La librería fue actualizada con éxito.',
            );
            successNotification();
          } catch (error) {
            const errorNotification = () => toast.error(
              'Hubo un error al axtualizar la librería.',
            );
            errorNotification();
          }
        }
      } catch (error) {
        throw new Error(error);
      }

      return item;
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
            <button type="submit" onClick={importLibrary}>Verificar inventario</button>
          </>
        )
        : null}
      <Toaster />
    </section>
  );
};

export default ImportLibraryForm;
