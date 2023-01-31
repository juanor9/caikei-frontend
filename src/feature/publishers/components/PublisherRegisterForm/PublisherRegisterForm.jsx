import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../../uploads/services/upload';
import useForm from '../../../../hooks/useForm';
import createPublisher from '../../services/publishers';
import './PublisherRegisterForm.scss';

const PublisherRegisterForm = () => {
  const [file, setFile] = useState('');
  const dispatch = useDispatch();
  const { form, handleChange } = useForm({});
  const userToken = localStorage.getItem('login-token'); // get user token from local storage
  const navigate = useNavigate();
  const { uploads } = useSelector((state) => state.upload);

  const handleSubmitimage = async (event) => {
    event.preventDefault();
    if (file) {
      try {
        dispatch(uploadImage(file));
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  const handleChangeImage = ({ target }) => {
    const { files } = target;
    const image = files[0];
    setFile(image);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(
        createPublisher({ ...form, publisherLogo: uploads, user: userToken }),
      );
      navigate('/profile');
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <section className="publisher-registration">
      <div className="publisher-registration__logo">
        <form
          id="publisherLogo"
          className="publisher-registration__logo-form"
          onSubmit={handleSubmitimage}
        >
          <label htmlFor="publisher-logo" className="publisher-registration__label">
            <h3>Logo</h3>
            <input
              type="file"
              name="publisher-logo"
              accept="image/*"
              onChange={handleChangeImage}
            />
          </label>

          <button
            id="publisherLogo__img-button"
            className="publisher-registration__logo-button"
            type="submit"
          >
            Cargar imagen
          </button>
        </form>
        {uploads ? (
          <figure className="publisher-registration__logo-preview">
            <img src={uploads} alt="" />
            <figcaption className="publisher-registration__logo-caption">Tu logo</figcaption>
          </figure>
        ) : null}
      </div>
      <form action="" id="publisher-registration__form" className="publisher-registration__form" onSubmit={handleSubmit}>
        <h3>Información general</h3>

        <label htmlFor="email" className="publisher-registration__label">
          Nombre
          <input
            type="text"
            id="name"
            name="name"
            className="publisher-registration__input"
            onChange={handleChange}
          />
        </label>
        <div>
          <label htmlFor="idNumber" className="publisher-registration__id-label">
            Documento de identificación
            <label htmlFor="idTypeCC" className="publisher-registration__radio-label">

              <input
                type="radio"
                value="C.C."
                name="idType"
                id="idTypeCC"
                className="publisher-registration__radio-input"
                onChange={handleChange}
              />
              C.C
            </label>
            <label htmlFor="idTypeNIT" className="publisher-registration__radio-label">

              <input
                type="radio"
                value="N.I.T"
                name="idType"
                id="idTypeNIT"
                className="publisher-registration__radio-input"
                onChange={handleChange}
              />
              N.I.T.
            </label>
            Número de identificación
            <input
              type="text"
              name="idNumber"
              id="idNumber"
              className="publisher-registration__input"
              onChange={handleChange}
            />
          </label>
        </div>
        <label htmlFor="email">
          Correo electrónico
          <input
            type="email"
            name="email"
            id="email"
            className="publisher-registration__input"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="address" className="publisher-registration__label">
          Dirección
          <input
            type="text"
            name="address"
            id="address"
            className="publisher-registration__input"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="phone" className="publisher-registration__label">
          Teléfono
          <input
            type="text"
            name="phone"
            id="phone"
            onChange={handleChange}
            className="publisher-registration__input"
          />
        </label>
        <button type="submit" className="publisher-registration__button">Registrar editorial</button>
      </form>
    </section>
  );
};

export default PublisherRegisterForm;
