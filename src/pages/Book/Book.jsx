/* eslint-disable camelcase */
import './Book.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import {
  getBookById,
  updateBookById,
} from '../../feature/books/services/books';
import useForm from '../../hooks/useForm';
import TopNav from '../../components/TopNav/TopNav';

const BookPage = () => {
  const { book } = useSelector((state) => state.book);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [readOnly, setReadOnly] = useState(true);
  const [date, setDate] = useState('');
  const { form, handleChange } = useForm({});
  const {
    title,
    isbn,
    cover,
    price,
    pubDate,
    authors,
    thema,
    book_binding,
    pages,
    height,
    width,
    color,
    costCenter,
  } = book;

  const handleToggleReadOnly = (event) => {
    const targetInput = event.target.parentNode.nextElementSibling;
    targetInput.readOnly = false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(updateBookById({ form, id }));
      setReadOnly(true);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleClickDeactivate = () => {
    try {
      const deactivate = { isActive: false };
      const data = { deactivate, id };
      dispatch(updateBookById(data));
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    if (id) {
      try {
        dispatch(getBookById(id));
      } catch (error) {
        throw new Error(error);
      }
    }
  }, []);

  useEffect(() => {
    if (form && form.pubDate) {
      setDate(new Date(form.pubDate).toISOString().split('T')[0]);
    }
  }, [form]);

  useEffect(() => {
    if (pubDate) {
      setDate(new Date(pubDate).toISOString().split('T')[0]);
    }
  }, [pubDate]);

  return (
    <div className="book-page">
      <TopNav />
      <main className="book-page__main-container">
        <h2>{title}</h2>
        <section className="book-page__section">
          <figure className="book-page__cover-fig">
            <img src={cover} alt={title} className="book-page__cover-img" />
          </figure>
          <form action="" onSubmit={handleSubmit}>
            <label
              htmlFor="title"
              className="book-page__form-label"
            >
              Titulo
              <div className="book-page__button-input">
                <button
                  type="button"
                  className="book-page__edit-button"
                  onClick={handleToggleReadOnly}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="book-page__form-input"
                  defaultValue={title}
                  readOnly={readOnly}
                  onChange={handleChange}
                />
              </div>
            </label>
            <label htmlFor="isbn" className="book-page__form-label">
              Isbn
              <div className="book-page__button-input">
                <button
                  type="button"
                  className="book-page__edit-button"
                  onClick={handleToggleReadOnly}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <input
                  type="number"
                  name="isbn"
                  id="isbn"
                  className="book-page__form-input"
                  defaultValue={isbn}
                  readOnly={readOnly}
                  onChange={handleChange}
                />
              </div>
            </label>
            <label htmlFor="pubDate" className="book-page__form-label">
              Fecha de publicación
              <div className="book-page__button-input">
                <button
                  type="button"
                  className="book-page__edit-button"
                  onClick={handleToggleReadOnly}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <input
                  type="date"
                  name="pubDate"
                  id="pubDate"
                  className="book-page__form-input"
                  value={date}
                  readOnly={readOnly}
                  onChange={handleChange}
                />
              </div>
            </label>
            <label htmlFor="price" className="book-page__form-label">
              Precio
              <div className="book-page__button-input">
                <button
                  type="button"
                  className="book-page__edit-button"
                  onClick={handleToggleReadOnly}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="book-page__form-input"
                  defaultValue={price}
                  readOnly={readOnly}
                  onChange={handleChange}
                />
              </div>
            </label>
            <label htmlFor="authors" className="book-page__form-label">
              Autores
              <div className="book-page__button-input">
                <button
                  type="button"
                  className="book-page__edit-button"
                  onClick={handleToggleReadOnly}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <input
                  type="text"
                  name="authors"
                  id="authors"
                  className="book-page__form-input"
                  defaultValue={authors}
                  readOnly={readOnly}
                  onChange={handleChange}
                />
              </div>
            </label>
            <label htmlFor="thema" className="book-page__form-label">
              Clasificador THEMA
              <div className="book-page__button-input">
                <button
                  type="button"
                  className="book-page__edit-button"
                  onClick={handleToggleReadOnly}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <input
                  type="text"
                  name="thema"
                  id="thema"
                  className="book-page__form-input"
                  defaultValue={thema}
                  readOnly={readOnly}
                  onChange={handleChange}
                />
              </div>
            </label>
            <label htmlFor="book_binding" className="book-page__form-label">
              Encuadernación
              <div className="book-page__button-input">
                <button
                  type="button"
                  className="book-page__edit-button"
                  onClick={handleToggleReadOnly}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <input
                  type="text"
                  name="book_binding"
                  id="book_binding"
                  className="book-page__form-input"
                  defaultValue={book_binding}
                  readOnly={readOnly}
                  onChange={handleChange}
                />
              </div>
            </label>
            <label htmlFor="pages" className="book-page__form-label">
              Páginas
              <div className="book-page__button-input">
                <button
                  type="button"
                  className="book-page__edit-button"
                  onClick={handleToggleReadOnly}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <input
                  type="text"
                  name="pages"
                  id="pages"
                  className="book-page__form-input"
                  defaultValue={pages}
                  readOnly={readOnly}
                  onChange={handleChange}
                />
              </div>
            </label>
            <label htmlFor="size" className="book-page__form-label">
              Medidas
              <div className="book-page__size-container">
                <label htmlFor="width">
                  Ancho
                  <div className="book-page__button-input">
                    <button
                      type="button"
                      className="book-page__edit-button"
                      onClick={handleToggleReadOnly}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <input
                      type="text"
                      name="width"
                      id="width"
                      className="book-page__form-input"
                      defaultValue={width}
                      readOnly={readOnly}
                      onChange={handleChange}
                    />
                  </div>
                </label>
                <label htmlFor="height">
                  Alto
                  <div className="book-page__button-input">
                    <button
                      type="button"
                      className="book-page__edit-button"
                      onClick={handleToggleReadOnly}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <input
                      type="text"
                      name="height"
                      id="height"
                      className="book-page__form-input"
                      defaultValue={height}
                      readOnly={readOnly}
                      onChange={handleChange}
                    />
                  </div>
                </label>
              </div>
            </label>
            <label htmlFor="color" className="book-page__form-label">
              Color
              <div className="book-page__button-input">
                <button
                  type="button"
                  className="book-page__edit-button"
                  onClick={handleToggleReadOnly}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <input
                  type="color"
                  name="color"
                  id="color"
                  defaultValue={color}
                  disabled={readOnly}
                />
              </div>
            </label>
            <label htmlFor="costCenter" className="book-page__form-label">
              Centro de costo
              <div className="book-page__button-input">
                <button
                  type="button"
                  className="book-page__edit-button"
                  onClick={handleToggleReadOnly}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <input
                  type="text"
                  name="costCenter"
                  id="costCenter"
                  className="book-page__form-input"
                  defaultValue={costCenter}
                  readOnly={readOnly}
                  onChange={handleChange}
                />
              </div>
            </label>
            <button type="submit" className="book-page__form-button">
              Guardar cambios
            </button>
            <button
              type="button"
              className="book-page__deactivate-button"
              onClick={handleClickDeactivate}
            >
              Desactivar libro
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default BookPage;
