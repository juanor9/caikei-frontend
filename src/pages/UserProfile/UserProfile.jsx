/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getUser } from '../../feature/users/services/users';
import TopNav from '../../components/TopNav/TopNav';
import './UserProfile.scss';

const UserProfile = () => {
  const dispatch = useDispatch(); // use dispatch hook
  const userToken = localStorage.getItem('login-token'); // get user token from local storage
  const { userData } = useSelector((state) => state.user); // get user data from redux
  const {
    email,
    publishingHouses,
  } = userData; // get user data from redux

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
    </div>
  );
};

export default UserProfile;
