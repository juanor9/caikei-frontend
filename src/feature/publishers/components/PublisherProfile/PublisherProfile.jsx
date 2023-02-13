import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getUser } from '../../../users/services/users';
import { getPublisherById, updatePublisher } from '../../services/publishers';
import { uploadImage } from '../../../uploads/services/upload';
import Modal from '../../../../components/Modal/Modal';
import useForm from '../../../../hooks/useForm';
import './PublisherProfile.scss';

const PublisherProfile = () => {
  const dispatch = useDispatch(); // use dispatch hook

  const userToken = localStorage.getItem('login-token'); // get user token from local storage

  const { userData } = useSelector((state) => state.user); // get user data from redux
  const { email, publisher } = userData; // get publisher id from redux

  const [infoModal, setInfoModal] = useState(false);
  const [logoModal, setLogoModal] = useState(false);
  const [file, setFile] = useState('');

  const {
    address, logo, name, phone, publisherIds,
  } = useSelector(
    (state) => state.publisher.publisher,
  ); // get publisher
  const publisherEmail = useSelector(
    (state) => state.publisher.publisher.email,
  );
  const { form, handleChange } = useForm({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(updatePublisher({ ...form, publisherId: publisher }));
      setInfoModal(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleChangeImage = ({ target }) => {
    const { files } = target;
    const image = files[0];
    setFile(image);
  };

  const handleSubmitimage = async (event) => {
    event.preventDefault();
    if (file) {
      try {
        dispatch(uploadImage(file));
        setLogoModal(false);
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  // deactivate publisher
  // const handleClickDeactivate = () => {
  //   try {
  //     const deactivate = { isActive: false };
  //     const data = { deactivate, publisherId: publisher };
  //     dispatch(updatePublisher(data));
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // };
  // if data is lost, ask for data to server
  useEffect(() => {
    if (!email) {
      try {
        dispatch(getUser(userToken));
      } catch (error) {
        throw new Error(error);
      }
    }
  }, []);

  // get publisher data
  useEffect(() => {
    if (publisher && userToken) {
      try {
        dispatch(getPublisherById(publisher));
      } catch (error) {
        throw new Error(error);
      }
    }
  }, [publisher]);

  return (
    <>
      <h2>Editorial</h2>
      <section className="publisher-profile">
        {publisher ? (
          <>
            <article className="publisher-profile__logo">
              <div>
                <h3>Logo</h3>
                <figure className="publisher-profile__logo-figure">
                  <img
                    src={logo}
                    alt={`${name}-logo`}
                    className="publisher-profile__logo-img"
                  />
                </figure>
                {/* <button
                  type="button"
                  className="publisher-profile__button"
                  onClick={() => { setLogoModal(true); }}
                >Editar logo
                </button> */}
              </div>
            </article>
            <article>
              <h3>Información general</h3>
              <div className="publisher-profile__info">
                <b>Nombre: </b>
                {name}
              </div>
              {publisherIds ? (
                <div className="publisher-profile__info">
                  <b>Documento de identidad: </b>
                  {publisherIds[publisherIds.length - 1].type}{' '}
                  {publisherIds[publisherIds.length - 1].number}
                </div>
              ) : null}
              <div className="publisher-profile__info">
                <b>Correo electrónico: </b> {publisherEmail}
              </div>
              <div className="publisher-profile__info">
                <b>Dirección: </b> {address}
              </div>
              <div className="publisher-profile__info">
                <b>Teléfono: </b> {phone}
              </div>
              <button
                type="button"
                className="publisher-profile__button"
                onClick={() => {
                  setInfoModal(true);
                }}
              >
                Editar información
              </button>
              {/* <button
                type="button"
                className="publisher-profile__deactivate"
                onClick={handleClickDeactivate}
              >
                Desactivar editorial
              </button> */}
            </article>
          </>
        ) : (
          <div className="publisher-profile__info">
            <p>Aún no tienes una editorial registrada.</p>
            <Link
              to="/publisher/register"
              className="publisher-profile__button"
            >
              <FontAwesomeIcon icon={faPlus} />
              Registra una editorial
            </Link>
          </div>
        )}
        {infoModal === true ? (
          <Modal
            className="publisher-profile__modal"
            modalFunction={setInfoModal}
          >
            <form
              action=""
              className="publisher-profile__modal-form"
              onSubmit={handleSubmit}
            >
              <h3>Actualizar datos</h3>
              <label className="publisher-profile__modal-label" htmlFor="name">
                Nombre
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="publisher-profile__modal-input"
                  defaultValue={name}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="email" className="publisher-profile__modal-label">
                Correo electrónico
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="publisher-profile__modal-input"
                  defaultValue={publisherEmail}
                  onChange={handleChange}
                />
              </label>
              <label
                htmlFor="address"
                className="publisher-profile__modal-label"
              >
                Dirección
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="publisher-profile__modal-input"
                  defaultValue={address}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="phone" className="publisher-profile__modal-label">
                Teléfono
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="publisher-profile__modal-input"
                  defaultValue={phone}
                  onChange={handleChange}
                />
              </label>
              <button type="submit" className="publisher-profile__modal-button">
                Actualizar
              </button>
            </form>
          </Modal>
        ) : null}
        {logoModal === true ? (
          <Modal modalFunction={setLogoModal}>
            <>
              <figure className="publisher-profile__logo-figure">
                <img
                  src={logo}
                  alt={`${name}-logo`}
                  id="logo"
                  className="publisher-profile__logo-img"
                />
              </figure>
              <form
                action=""
                onSubmit={handleSubmitimage}
                className="publisher-profile__modal-form"
              >
                <h3>Cargar nuevo logo</h3>
                <label
                  htmlFor="new-logo"
                  className="publisher-profile__modal-label"
                >
                  <input
                    type="file"
                    id="new-logo"
                    name="new-logo"
                    accept="image/*"
                    onChange={handleChangeImage}
                  />
                </label>
                <button
                  type="submit"
                  className="publisher-profile__modal-button"
                >
                  Actualizar logo
                </button>
              </form>
            </>
          </Modal>
        ) : null}
      </section>
    </>
  );
};
export default PublisherProfile;
