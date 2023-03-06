/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadExcel } from '../../../uploads/services/upload';
import Modal from '../../../../components/Modal/Modal';
import { getBooksByFilter } from '../../../books/services/books';
import { getPublisherByFilter } from '../../../publishers/services/publishers';
import { getLibrariesByFilter } from '../../../libraries/services/libraries';

const ImportExcelForm = () => {
  const [file, setFile] = useState('');
  const [success, setSuccess] = useState(false);
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
        setSuccess(true);
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  useEffect(() => {
    if (uploads && Array.isArray(uploads)) {
      uploads.map(async (item) => {
        const {
          titulo,
          isbn,
          documentoDeIdentidadDeBodega,
          numeroDeEjemplares,
          pvp,
          descuento,
        } = item;
        const bookFilter = { isbn };
        const book = await dispatch(getBooksByFilter({ bookFilter, userToken }));

        // check if id is publisher
        const storageFilterPublisher = { 'publisherIds.number': documentoDeIdentidadDeBodega };
        const getPublisherStore = await dispatch(
          getPublisherByFilter({ filter: storageFilterPublisher, userToken }),
        );
        const publisherStore = getPublisherStore.payload[0];
        console.log(publisherStore);

        // check if id is a library
        if (publisherStore === undefined) {
          const storageFilterLibrary = { 'libraryIds.number': documentoDeIdentidadDeBodega };
          const getLibraryStore = await dispatch(
            getLibrariesByFilter({ filter: storageFilterLibrary, userToken }),
          );
          const libraryStore = getLibraryStore.payload[0];
          console.log(libraryStore);
        }

        return item;
      });
    }
  }, [uploads]);

  return (
    <section>
      <h3>Importar desde formato de Excel</h3>
      <Link to="https://res.cloudinary.com/dvi7rfug1/raw/upload/v1677510795/excelFiles/caikei-import-format_pc2yuw.xlsx">
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
      {success === true
        ? (
          <Modal
            modalFunction={setSuccess}
            message="El archivo se cargó exitosamente"
          />
        )
        : null}
      {uploads && Array.isArray(uploads)
        ? (
          <>
            {uploads.map(({ titulo, isbn }) => (
              <article>
                <p>{titulo}</p>
                <p>{isbn}</p>
              </article>
            ))}
          </>
        )
        : null}
    </section>
  );
};

export default ImportExcelForm;
