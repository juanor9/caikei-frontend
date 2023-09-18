import './RegisterLibraryForm.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { getUser } from '../../../users/services/users';
import { createLibrary, getLibrariesByFilter, updateLibrary } from '../../services/libraries';
import useForm from '../../../../hooks/useForm';

const RegisterLibraryForm = () => {
  const { form, handleChange } = useForm({});
  const userToken = localStorage.getItem('login-token');
  const dispatch = useDispatch();
  const { publisher } = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { idNumber, name, discount } = form;
    // search new library by document
    const librariesByIdDoc = { 'libraryIds.number': idNumber };
    const librariesByIdDocFetch = await dispatch(
      getLibrariesByFilter({ filter: librariesByIdDoc, userToken }),
    );
    // search libraries by name
    const librariesByName = { name };
    const librariesByNameFetch = await dispatch(
      getLibrariesByFilter({ filter: librariesByName, userToken }),
    );

    // si ni el nombre ni el documento existen
    if (
      librariesByIdDocFetch.payload
      && Array.isArray(librariesByIdDocFetch.payload)
      && librariesByIdDocFetch.payload.length === 0
      && librariesByNameFetch.payload
      && Array.isArray(librariesByNameFetch.payload)
      && librariesByNameFetch.payload.length === 0
    ) {
      try {
        dispatch(createLibrary({ form: { publisher, ...form }, userToken }));
        const successNotification = () => toast.success(
          'La librería fue creada con éxito',
        );
        successNotification();
        navigate('/libraries');
      } catch (error) {
        const errorNotification = () => toast.error(
          `Error: ${error}.
          Hubo un error en la creación de la librería.
          Por favor vuelve a intentarlo.`,
        );
        errorNotification();
        throw new Error(error);
      }
    }
    // si el documento existe, pero el nombre no existe
    if (
      librariesByIdDocFetch.payload
      && Array.isArray(librariesByIdDocFetch.payload)
      && librariesByIdDocFetch.payload.length > 0
      && librariesByNameFetch.payload
      && Array.isArray(librariesByNameFetch.payload)
      && librariesByNameFetch.payload.length === 0
    ) {
      const reqLibraryId = librariesByIdDocFetch.payload[0];
      const errorNotification = () => toast.error(
        `El número de documento ${reqLibraryId.libraryIds[0].number} está
        registrado como "${reqLibraryId.name}". Verifica el nombre
        en el formulario.`,
      );
      errorNotification();
    }
    // si el nombre existe, pero el número no
    if (
      librariesByIdDocFetch.payload
      && Array.isArray(librariesByIdDocFetch.payload)
      && librariesByIdDocFetch.payload.length === 0
      && librariesByNameFetch.payload
      && Array.isArray(librariesByNameFetch.payload)
      && librariesByNameFetch.payload.length > 0
    ) {
      const reqLibraryName = librariesByNameFetch.payload[0];
      const errorNotification = () => toast.error(
        `La librería ${reqLibraryName.name} tiene como
        documento registrado ${reqLibraryName.libraryIds[0].number}.
        Verifica el número de documento en el formulario`,
      );
      errorNotification();
    }
    // si ambos existen pero no son la misma librería
    if (
      librariesByIdDocFetch.payload
      && Array.isArray(librariesByIdDocFetch.payload)
      && librariesByIdDocFetch.payload.length > 0
      && librariesByNameFetch.payload
      && Array.isArray(librariesByNameFetch.payload)
      && librariesByNameFetch.payload.length > 0
      && String(librariesByIdDocFetch.payload[0]._id)
      !== String(librariesByNameFetch.payload[0]._id)
    ) {
      const reqLibraryId = librariesByIdDocFetch.payload[0];
      const errorNotification = () => toast.error(
        `El número de documento ${reqLibraryId.libraryIds[0].number} está
        registrado como "${reqLibraryId.name}". Verifica el nombre
        en el formulario.`,
      );
      errorNotification();
    }
    // si ambos existen y son la misma librería
    if (
      librariesByIdDocFetch.payload
      && Array.isArray(librariesByIdDocFetch.payload)
      && librariesByIdDocFetch.payload.length > 0
      && librariesByNameFetch.payload
      && Array.isArray(librariesByNameFetch.payload)
      && librariesByNameFetch.payload.length > 0
      && String(librariesByIdDocFetch.payload[0]._id)
      === String(librariesByNameFetch.payload[0]._id)
    ) {
      try {
        const lib = librariesByIdDocFetch.payload[0];
        const libPublishers = lib.publishers;
        const libId = lib._id;
        const newPublishers = libPublishers.concat(
          { publisherId: publisher, discount: Number(discount) },
        );
        dispatch(updateLibrary({ form: { publishers: newPublishers }, id: libId }));
        const successNotification = () => toast.success(
          'La librería fue agregada con éxito',
        );
        successNotification();
        navigate('/libraries');
      } catch (error) {
        const errorNotification = () => toast.error(
          `Error: ${error}.
          Hubo un error en la creación de la librería.
          Por favor vuelve a intentarlo.`,
        );
        errorNotification();
        throw new Error(error);
      }
    }
  };

  useEffect(() => {
    if (userToken) {
      try {
        dispatch(getUser(userToken));
      } catch (error) {
        throw new Error(error);
      }
    }
  }, []);

  return (
    <section className="register-library">
      <Toaster />
      <form action="" className="register-library__form" onSubmit={handleSubmit}>
        <label htmlFor="name" className="register-library__form-label">
          Nombre
          <input
            type="text"
            name="name"
            id="name"
            required
            className="register-library__form-input"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="discount" className="register-library__form-label">
          Descuento
          <input
            type="number"
            name="discount"
            id="discount"
            required
            className="register-library__form-input"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email" className="register-library__form-label">
          Correo electrónico
          <input
            type="email"
            name="email"
            id="email"
            required
            className="register-library__form-input"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="libraryId" className="register-library__form-label">
          Documento de identidad
          <label htmlFor="idKind">
            C.C
            <input type="radio" name="idKind" id="C.C" value="C.C." onChange={handleChange} required />
          </label>
          <label htmlFor="idKind">
            N.I.T.
            <input type="radio" name="idKind" id="N.I.T." value="N.I.T." onChange={handleChange} />
          </label>
          <label htmlFor="idNumber">
            Número
            <input
              type="text"
              name="idNumber"
              id="idNumber"
              required
              onChange={handleChange}
              className="register-library__form-input"
            />
          </label>
        </label>
        <label htmlFor="city" className="register-library__form-label">
          Ciudad
          <input
            type="text"
            name="city"
            id="city"
            required
            className="register-library__form-input"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="address" className="register-library__form-label">
          Dirección
          <input
            type="text"
            name="address"
            id="address"
            className="register-library__form-input"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="phone" className="register-library__form-label">
          Teléfono
          <input
            type="text"
            name="phone"
            id="phone"
            className="register-library__form-input"
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="register-library__form-submit">Crear librería</button>
      </form>

    </section>
  );
};

export default RegisterLibraryForm;
