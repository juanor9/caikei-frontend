/* eslint-disable no-unused-vars */
import './RegisterLibraryForm.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../../users/services/users';
import { createLibrary } from '../../services/libraries';
import useForm from '../../../../hooks/useForm';

const RegisterLibraryForm = () => {
  const { form, handleChange } = useForm({});
  const userToken = localStorage.getItem('login-token');
  const dispatch = useDispatch();
  const { publisher } = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(
        createLibrary({ ...form, publisher }),
      );
      navigate('/libraries');
    } catch (error) {
      throw new Error(error);
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
      <form action="" className="register-library__form" onSubmit={handleSubmit}>
        <label htmlFor="name" className="register-library__form-label">
          Nombre
          <input
            type="text"
            name="name"
            id="name"
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
            className="register-library__form-input"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="libraryId" className="register-library__form-label">
          Documento de identidad
          <label htmlFor="idKind">
            C.C
            <input type="radio" name="idKind" id="C.C" value="C.C." onChange={handleChange} />
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
