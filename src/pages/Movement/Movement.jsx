/* eslint-disable no-unused-vars */
import './Movement.scss';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../../feature/users/services/users';
import { getLibrariesById, updateLibrary } from '../../feature/libraries/services/libraries';
import TopNav from '../../components/TopNav/TopNav';
import useForm from '../../hooks/useForm';

const MovementPage = () => {
  const { id } = useParams();
  const { form, handleChange } = useForm({});
  const dispatch = useDispatch();
  const { library } = useSelector((state) => state.library);
  const {
    name, email, city, address, phone, publishers,
  } = library;
  const userToken = localStorage.getItem('login-token'); // get user token from local storage

  const [discount, setDiscount] = useState(0);
  const { publisher } = useSelector((state) => state.user.userData);

  const [disabled, setDisabled] = useState(true);
  const handleToggledisabled = (event) => {
    const targetInput = event.target.parentNode.nextElementSibling;
    targetInput.disabled = false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(updateLibrary({ form, id }));
      setDisabled(true);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleClickDeactivate = () => {
    try {
      const deactivate = { isActive: false };
      const data = { deactivate, id };
      dispatch(updateLibrary(data));
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    if (id) {
      try {
        dispatch(getLibrariesById({ id, userToken }));
      } catch (error) {
        throw new Error(error);
      }
    }
  }, []);
  useEffect(() => {
    if (publishers) {
      const filteredPublisher = publishers.find((pub) => pub.publisherId === publisher);
      const discountPublisher = filteredPublisher.discount;
      setDiscount(discountPublisher);
    }
  }, [publishers, publisher]);

  useEffect(() => {
    try {
      dispatch(getUser(userToken));
    } catch (error) {
      throw new Error(error);
    }
  }, []);
  return (
    <div className="library-page">
      <TopNav />
      <main className="library-page__main-container">
        <h2>{name}</h2>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="name" className="library-page__form-label">
            Nombre
            <div>
              <button
                type="button"
                className="library-page__edit-button"
                onClick={handleToggledisabled}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={name}
                disabled={disabled}
                onChange={handleChange}
              />
            </div>
          </label>
          <label htmlFor="discount" className="library-page__form-label">
            Descuento
            <div>
              <button
                type="button"
                className="library-page__edit-button"
                onClick={handleToggledisabled}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              <input
                type="nmber"
                name="discount"
                id="discount"
                defaultValue={discount}
                disabled={disabled}
                onChange={handleChange}
              />
            </div>
          </label>
          <label htmlFor="email" className="library-page__form-label">
            Correo electrónico
            <div>
              <button
                type="button"
                className="library-page__edit-button"
                onClick={handleToggledisabled}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              <input
                type="email"
                name="email"
                id="email"
                defaultValue={email}
                disabled={disabled}
                onChange={handleChange}
              />
            </div>
          </label>
          <label htmlFor="city" className="library-page__form-label">
            Ciudad
            <div>
              <button
                type="button"
                className="library-page__edit-button"
                onClick={handleToggledisabled}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              <input
                type="text"
                name="city"
                id="city"
                defaultValue={city}
                disabled={disabled}
                onChange={handleChange}
              />
            </div>
          </label>
          <label htmlFor="address" className="library-page__form-label">
            Dirección
            <div>
              <button
                type="button"
                className="library-page__edit-button"
                onClick={handleToggledisabled}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              <input
                type="text"
                name="address"
                id="address"
                defaultValue={address}
                disabled={disabled}
                onChange={handleChange}
              />
            </div>
          </label>
          <label htmlFor="phone" className="library-page__form-label">
            Teléfono
            <div>
              <button
                type="button"
                className="library-page__edit-button"
                onClick={handleToggledisabled}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              <input
                type="number"
                name="phone"
                id="phone"
                defaultValue={phone}
                disabled={disabled}
                onChange={handleChange}
              />
            </div>
          </label>
          <button type="submit" className="library-page__form-button">
            Guardar cambios
          </button>
          {/* <button
            type="button"
            className="library-page__deactivate-button"
            onClick={handleClickDeactivate}
          >
            Desactivar librería
          </button> */}
        </form>
      </main>
    </div>
  );
};

export default MovementPage;
