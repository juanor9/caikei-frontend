/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadExcel } from '../../../uploads/services/upload';
import Modal from '../../../../components/Modal/Modal';

const ImportExcelForm = () => {
  const [file, setFile] = useState('');
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const { uploads } = useSelector((state) => state.upload);

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

  return (
    <section>
      <h3>Importar desde formato de Excel</h3>
      <Link to="https://res.cloudinary.com/dvi7rfug1/raw/upload/v1677504587/excelFiles/caikei-import-format_ybr017.xlsx">
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
            {uploads.map(({ título, isbn }) => (
              <article>
                <p>{título}</p>
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
