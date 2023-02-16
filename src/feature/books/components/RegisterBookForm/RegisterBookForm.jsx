/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../../../uploads/services/upload';
import { createBook } from '../../services/books';
import { getUser } from '../../../users/services/users';
import './RegisterBookForm.scss';
import useForm from '../../../../hooks/useForm';

const RegisterBookForm = () => {
  const [file, setFile] = useState('');
  const { form, handleChange } = useForm({});
  const { publisher } = useSelector((state) => state.user.userData);
  const { uploads } = useSelector((state) => state.upload);
  const navigate = useNavigate();
  const userToken = localStorage.getItem('login-token');

  const dispatch = useDispatch();

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
      dispatch(createBook({
        ...form, publisher, cover: uploads, userToken,
      }));
      navigate('/catalogue');
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

  useEffect(() => {
    const formButton = document.getElementById('form-submit');
    if (uploads) {
      formButton.classList.remove('register-book__form-button--disabled');
      formButton.classList.add('register-book__form-button');
    }
  }, [uploads]);

  return (
    <section className="register-book">
      <form action="" className="register-book__cover-form" onSubmit={handleSubmitimage}>
        <label htmlFor="cover" className="register-book__form-label">
          Cubierta
          <input
            type="file"
            name="cover"
            id="cover"
            onChange={handleChangeImage}
          />
          <button type="submit" className="register-book__form-button--image">
            Cargar imagen
          </button>

          {uploads ? (
            <figure className="register-book__cover-preview">
              <img src={uploads} alt="" />
              <figcaption className="register-book__cover-caption">Cubierta</figcaption>
            </figure>
          ) : null}
        </label>
      </form>
      <form
        action=""
        className="register-book__form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="title" className="register-book__form-label">
          Titulo
          <input
            name="title"
            id="title"
            type="text"
            required
            className="register-book__form-input"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="isbn" className="register-book__form-label">
          ISBN
          <input
            name="isbn"
            id="isbn"
            type="number"
            className="register-book__form-input"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price" className="register-book__form-label">
          Precio
          <input
            name="price"
            id="price"
            type="number"
            required
            className="register-book__form-input"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="pubDate" className="register-book__form-label">
          Fecha de publicación
          <input
            name="pubDate"
            id="pubDate"
            type="date"
            className="register-book__form-input"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="authors" className="register-book__form-label">
          Autores
          <input
            name="authors"
            id="authors"
            type="text"
            required
            className="register-book__form-input"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="thema" className="register-book__form-label">
          Clasificador THEMA
          <input
            name="thema"
            id="thema"
            type="text"
            className="register-book__form-input"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="binding" className="register-book__form-label">
          Encuadernación
          <label htmlFor="binding">
            <input
              type="radio"
              name="binding"
              id="rústica"
              value="rústica"
              required
              onChange={handleChange}
            />
            rústica
          </label>
          <label htmlFor="binding">
            <input
              type="radio"
              name="binding"
              id="tapa dura"
              value="tapa dura"
              onChange={handleChange}
            />
            tapa dura
          </label>
          <label htmlFor="binding">
            <input
              type="radio"
              name="binding"
              id="grapa"
              value="grapa"
              onChange={handleChange}
            />
            grapa
          </label>
          <label htmlFor="binding">
            <input
              type="radio"
              name="binding"
              id="plegado/fanzine"
              value="plegado/fanzine"
              onChange={handleChange}
            />
            plegado/fanzine
          </label>
          <label htmlFor="binding">
            <input
              type="radio"
              name="binding"
              id="otros"
              value="otros"
              onChange={handleChange}
            />
            otros
          </label>
        </label>
        <label htmlFor="pages" className="register-book__form-label">
          Páginas
          <input
            name="pages"
            id="pages"
            type="number"
            className="register-book__form-input"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="height" className="register-book__form-label">
          Altura
          <input
            name="height"
            id="height"
            type="number"
            className="register-book__form-input"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="width" className="register-book__form-label">
          Ancho
          <input
            name="width"
            id="width"
            type="number"
            className="register-book__form-input"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="color" className="register-book__form-label">
          Color
          <input
            name="color"
            id="color"
            type="color"
            required
            onChange={handleChange}
          />
        </label>
        <label htmlFor="costCenter" className="register-book__form-label">
          Centro de costo
          <input
            name="costCenter"
            id="costCenter"
            type="text"
            className="register-book__form-input"
            onChange={handleChange}
          />
        </label>
        <button id="form-submit" type="submit" className="register-book__form-button--disabled">
          Crear libro
        </button>
      </form>
    </section>
  );
};

export default RegisterBookForm;
