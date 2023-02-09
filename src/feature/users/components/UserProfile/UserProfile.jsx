import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { updateUser, getUser } from '../../services/users';
import Modal from '../../../../components/Modal/Modal';
import useForm from '../../../../hooks/useForm';
import './UserProfile.scss';

const UserProfile = () => {
  const dispatch = useDispatch(); // use dispatch hook
  // const navigate = useNavigate(); // use navigation hook
  const [emailModal, setEmailModal] = useState(false); // set email modal
  const [passwordModal, setPasswordModal] = useState(false); // set password modal
  const { form, handleChange } = useForm({}); // get form hook

  const userToken = localStorage.getItem('login-token'); // get user token from local storage
  const { userData } = useSelector((state) => state.user); // get user data from redux
  const { email, _id } = userData; // get user data from redux

  // On click for deactivate, deactivate account
  // const handleClickDeactivate = () => {
  //   try {
  //     const deactivate = { isActive: false };
  //     const data = { deactivate, userId: _id };
  //     dispatch(updateUser(data));
  //     navigate('/');
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // };

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

  // On click for email, reset form
  const handleClickEmail = () => {
    document.getElementById('new-email-form').reset();
  };

  // On click for password, reset form
  const handleClickPassword = () => {
    document.getElementById('new-password-form').reset();
  };

  // On submit for password, prevent form submission and dispatch service
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
  }, []);
  return (
    <section className="user-profile">
      <div className="user-profile__header">
        <h2>Perfil</h2>
        {/* <button
          type="button"
          className="user-profile__deactivate"
          onClick={handleClickDeactivate}
        >
          Desactivar cuenta
        </button> */}
      </div>

      <div className="user-profile__info">
        <p>
          <b>Email: </b>
          {email}
        </p>
        <button
          type="button"
          className="user-profile__button"
          onClick={() => {
            setEmailModal(true);
          }}
        >
          Editar
        </button>
      </div>
      <div className="user-profile__info">
        <p><b>Password: </b>
          ****
        </p>

        <button
          type="button"
          className="user-profile__button"
          onClick={() => {
            setPasswordModal(true);
          }}
        >
          Editar
        </button>
      </div>
      {emailModal === true ? (
        <Modal modalFunction={setEmailModal}>
          <>
            <h3>Actualiza tu email</h3>
            <form
              action=""
              className="user-profile__modal-form"
              id="new-email-form"
              onSubmit={handleSubmitEmail}
            >
              <label htmlFor="email" className="user-profile__modal-label">
                Email
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="user-profile__modal-input"
                  placeholder="email"
                  onChange={handleChange}
                />
              </label>
              <button
                type="submit"
                className="user-profile__modal-button"
                onClick={handleClickEmail}
              >
                Actualizar
              </button>
            </form>
          </>
        </Modal>
      ) : null}
      {passwordModal === true ? (
        <Modal modalFunction={setPasswordModal}>
          <>
            <h3>Actualiza tu contraseña</h3>
            <form
              action=""
              className="user-profile__modal-form"
              id="new-password-form"
              onSubmit={handleSubmitPassword}
            >
              <label htmlFor="password" className="user-profile__modal-label">
                Nueva contraseña
                <input
                  type="text"
                  name="password"
                  id="password"
                  className="user-profile__modal-input"
                  onChange={handleChange}
                />
              </label>
              <button
                type="submit"
                className="user-profile__modal-button"
                onClick={handleClickPassword}
              >
                Actualizar
              </button>
            </form>
          </>
        </Modal>
      ) : null}
    </section>
  );
};
export default UserProfile;
