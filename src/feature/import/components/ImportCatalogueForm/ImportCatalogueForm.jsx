import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { uploadExcel } from '../../../uploads/services/upload';
import { excelDateToJSDate, convertCamelCaseToReadable } from '../../services/functions';
import { getUser } from '../../../users/services/users';
import { createBook } from '../../../books/services/books';
import { getPlan } from '../../../plans/services/plans';
import './ImportCatalogueForm.scss';

const ImportCatalogueForm = () => {
  const dispatch = useDispatch();
  const { uploads } = useSelector((state) => state.upload);
  const userToken = localStorage.getItem('login-token');
  const { userData } = useSelector((state) => state.user);
  const planId = useSelector((state) => state.user.userData.plan);
  const { titles } = useSelector((state) => state.plan.plan);

  const [file, setFile] = useState('');
  const [importItems, setImportItems] = useState([]);

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

  useEffect(() => {
    const fetchDataFromExcel = async () => {
      if (uploads && Array.isArray(uploads)) {
        try {
          const uploadedItems = uploads.map((item) => {
            const { fechaDePublicacion } = item;
            const pubDate = excelDateToJSDate(fechaDePublicacion);

            const newItem = {
              ...item,
              fechaDePublicacion: pubDate.toLocaleDateString(),
            };
            return newItem;
          });
          setImportItems(uploadedItems);
          toast.success('El archivo fue cargado con éxito');
        } catch (error) {
          toast.error(`Hay un error en tu archivo.
            Verifica que los libros y librerías de tu archivo
            existan en el sistema y vuelve a intentarlo.`);
          throw new Error(error);
        }
      }
    };
    fetchDataFromExcel();
  }, [uploads]);

  useEffect(() => {
    if (planId) {
      dispatch(getPlan({ planId, userToken }));
    }
  }, [planId]);

  const importCatalogue = () => {
    if (!importItems || !Array.isArray(importItems)) {
      return null;
    }
    const importItemsNumber = importItems.length;
    if (importItemsNumber > titles) {
      toast.error('Estás intentando importar más títulos de los que tiene tu plan. Verifica tu archivo o actualiza tu suscripción.');
      return null;
    }
    try {
      dispatch(getUser(userToken));
    } catch (error) {
      toast.error('Hubo un error al traer la información de la editorial.');
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
        toast.success(`El libro "${titulo}" fue actualizado con éxito`);
      } catch (error) {
        toast.error(`Hubo un error al crear el libro "${titulo}"`);
      }
      return newItem;
    });
    return newCatalogue;
  };

  const importCatalogueSampleURL = 'https://res.cloudinary.com/dvi7rfug1/raw/upload/v1693007895/excelFiles/caikei-import-catalogue_ceulns.xlsx';

  return (
    <section>
      <h3>Importar desde formato de Excel</h3>
      <Link to={importCatalogueSampleURL}>Descarga el formato de Excel</Link>
      <form action="" onSubmit={handleSubmitFile} className="import-form">
        <label htmlFor="excel-file">
          Carga tu catálogo en Excel
          <input type="file" accept=".xlsx" onChange={handleChangeFile} />
        </label>
        <button type="submit" className="import-form__button">Cargar archivo</button>
      </form>
      {importItems && Array.isArray(importItems) && importItems.length > 0 ? (
        <>
          {importItems.map((item) => {
            const keys = Object.keys(item);

            return (
              <article key={item.index}>
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
          <button type="submit" onClick={importCatalogue} className="import-form__button">
            Verificar
          </button>
        </>
      ) : null}
      <Toaster />
    </section>
  );
};

export default ImportCatalogueForm;
