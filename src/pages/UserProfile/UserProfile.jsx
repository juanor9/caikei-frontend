/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getUser, updateUser } from '../../feature/users/services/users';
import useForm from '../../hooks/useForm';
import TopNav from '../../components/TopNav/TopNav';
import Modal from '../../components/Modal/Modal';
import './UserProfile.scss';

const UserProfile = () => {
  const dispatch = useDispatch(); // use dispatch hook
  const userToken = localStorage.getItem('login-token'); // get user token from local storage
  const { userData } = useSelector((state) => state.user); // get user data from redux
  const {
    email,
    publishingHouses,
    _id,
  } = userData; // get user data from redux
  const [emailModal, setEmailModal] = useState(false); // set email modal
  const [passwordModal, setPasswordModal] = useState(false); // set password modal
  const { form, handleChange } = useForm({}); // get form hook

  // On click for email, reset form
  const handleClickEmail = () => {
    document.getElementById('new-email-form').reset();
  };

  // On click for password, reset form
  const handleClickPassword = () => {
    document.getElementById('new-password-form').reset();
  };

  // On submit for email, prevent form submission and dispatch service
  const handleSubmitEmail = async (event) => {
    event.preventDefault();
    try {
      const formdata = { form, userId: _id };
      dispatch(updateUser(formdata));
      setEmailModal(false);
    } catch (error) {
      throw new Error(error);
    }
  };
    // On submit for email, prevent form submission and dispatch service
  const handleSubmitPassword = async (event) => {
    event.preventDefault();
    try {
      const formdata = { form, userId: _id };
      dispatch(updateUser(formdata));
      setPasswordModal(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  // if data is lost, ask for data to server
  useEffect(() => {
    if (!email) {
      try {
        dispatch(getUser(userToken));
      } catch (error) {
        throw new Error(error);
      }
    }
  }, [email]);

  return (
    <div className="user-profile">
      <TopNav />
      <main className="user-profile__main-container">
        <section className="user-profile__profile-section">
          <h2>Perfil</h2>
          <div className="user-profile__profile-info">
            <b>Email: </b>
            {email}
            <button
              type="button"
              className="user-profile__button"
              onClick={() => { setEmailModal(true); }}
            >
              Editar
            </button>
          </div>
          <div className="user-profile__profile-info">
            <b>Password: </b>
            ****
            <button
              type="button"
              className="user-profile__button"
              onClick={() => { setPasswordModal(true); }}
            >
              Editar
            </button>
          </div>
        </section>
        <section>
          <h2>Editorial</h2>
          {publishingHouses
            ? (
              <>
                <div><b>Logo: </b> Logo de la editorial <button type="button">Editar</button></div>
                <div><b>Nombre: </b> Nombre de la editorial <button type="button">Editar</button></div>
                <div><b>Documento de identidad: </b> Documento de identidad de la editorial <button type="button">Editar</button></div>
                <div><b>Dirección: </b> Direcciónde la editorial <button type="button">Editar</button></div>
                <div><b>Títulos activos en el catálogo: </b> Número de títulos activos en el catálogo <button type="button">Editar</button></div>
              </>
            )
            : (
              <div className="user-profile__no-ph">
                <p>Aún no tienes editoriales registradas.</p>
                <Link to="/" className="user-profile__add-ph">
                  <FontAwesomeIcon icon={faPlus} />
                  Registra una editorial
                </Link>
              </div>
            )}

        </section>
      </main>
      {emailModal === true
        ? (
          <Modal
            modalFunction={setEmailModal}
          >
            <>
              <h3>Actualiza tu email</h3>
              <form
                action=""
                className="modal-form"
                id="new-email-form"
                onSubmit={handleSubmitEmail}
              >
                <label
                  htmlFor="email"
                  className="modal-form__label"
                >
                  Email
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="modal-form__input"
                    placeholder="email"
                    onChange={handleChange}
                  />
                </label>
                <button
                  type="submit"
                  className="modal-form__button"
                  onClick={handleClickEmail}
                >Actualizar
                </button>
              </form>
            </>
          </Modal>
        )
        : null}
      {passwordModal === true
        ? (
          <Modal
            modalFunction={setPasswordModal}
          >
            <>
              <h3>Actualiza tu contraseña</h3>
              <form action="" className="modal-form" id="new-password-form" onSubmit={handleSubmitPassword}>
                <label
                  htmlFor="password"
                  className="modal-form__label"
                >
                  Nueva contraseña
                  <input
                    type="text"
                    name="password"
                    id="password"
                    className="modal-form__input"
                    onChange={handleChange}
                  />
                </label>
                <button
                  type="submit"
                  className="modal-form__button"
                  onClick={handleClickPassword}
                >
                  Actualizar
                </button>
              </form>
            </>
          </Modal>
        )
        : null}
    </div>
  );
};

export default UserProfile;
