import './Library.scss';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser } from '../../feature/users/services/users';
import {
  getLibrariesById,
  updateLibrary,
} from '../../feature/libraries/services/libraries';
import { getBooksByPublisher } from '../../feature/books/services/books';
import TopNav from '../../components/TopNav/TopNav';
import useForm from '../../hooks/useForm';
import BookInventoryCard from '../../feature/books/components/BookInventoryCard/BookInventoryCard';

const LibraryPage = () => {
  const { id } = useParams();
  const { form, handleChange } = useForm({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { library } = useSelector((state) => state.library);
  const {
    name, email, city, address, phone, publishers,
  } = library;
  const { catalogue } = useSelector((state) => state.catalogue);
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
      navigate('/libraries');
    } catch (error) {
      throw new Error(error);
    }
  };

  // const handleClickDeactivate = () => {
  //   try {
  //     const deactivate = { isActive: false };
  //     const data = { deactivate, id };
  //     dispatch(updateLibrary(data));
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // };

  useEffect(() => {
    if (id && userToken) {
      try {
        dispatch(getLibrariesById({ id, userToken }));
      } catch (error) {
        throw new Error(error);
      }
    }
  }, []);
  useEffect(() => {
    if (publishers) {
      const filteredPublisher = publishers.find(
        (pub) => pub.publisherId === publisher,
      );
      const discountPublisher = filteredPublisher.discount;
      setDiscount(Number(discountPublisher));
    }
  }, [publishers, publisher]);
  useEffect(() => {
    try {
      dispatch(getUser(userToken));
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  useEffect(() => {
    if (publisher) {
      try {
        dispatch(getBooksByPublisher(publisher));
      } catch (error) {
        throw new Error(error);
      }
    }
  }, [publisher]);
  const [booksInventory, setBooksInventory] = useState([]);
  useEffect(() => {
    if (catalogue && Array.isArray(catalogue) && catalogue.length > 0) {
      const filteredCatalogue = catalogue.map((book) => {
        if (book.inventory && Array.isArray(book.inventory)) {
          const b = book.inventory.find((place) => String(place.placeId) === String(id));
          if (!b) {
            return {
              id: book._id,
              cover: book.cover,
              title: book.title,
              copies: 0,
            };
          }

          return {
            id: book._id,
            cover: book.cover,
            title: book.title,
            copies: b.copies,
          };
        }
        return book;
      });
      setBooksInventory(filteredCatalogue);
    }
  }, [catalogue]);

  return (
    <div className="library-page">
      <TopNav />
      <main className="library-page__main-container">
        <h2>{name}</h2>
        <form action="" onSubmit={handleSubmit} className="library-page__form">
          <label htmlFor="name" className="library-page__form-label">
            Nombre
            <div className="library-page__button-input">
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
                className="library-page__form-input"
              />
            </div>
          </label>
          <label htmlFor="discount" className="library-page__form-label">
            Descuento
            <div className="library-page__button-input">
              <button
                type="button"
                className="library-page__edit-button"
                onClick={handleToggledisabled}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              <input
                type="number"
                name="discount"
                id="discount"
                key={`${Math.floor(Math.random() * 1000)}-min`}
                defaultValue={discount}
                disabled={disabled}
                onChange={handleChange}
                className="library-page__form-input"
              />
            </div>
          </label>
          <label htmlFor="email" className="library-page__form-label">
            Correo electrónico
            <div className="library-page__button-input">
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
                className="library-page__form-input"
              />
            </div>
          </label>
          <label htmlFor="city" className="library-page__form-label">
            Ciudad
            <div className="library-page__button-input">
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
                className="library-page__form-input"
              />
            </div>
          </label>
          <label htmlFor="address" className="library-page__form-label">
            Dirección
            <div className="library-page__button-input">
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
                className="library-page__form-input"
              />
            </div>
          </label>
          <label htmlFor="phone" className="library-page__form-label">
            Teléfono
            <div className="library-page__button-input">
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
                className="library-page__form-input"
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
        <h3>Inventario</h3>
        <section className="library-page__inventory-container">
          {booksInventory && Array.isArray(booksInventory) ? (
            booksInventory.map((book) => (
              <BookInventoryCard
                key={book.id}
                cover={book.cover}
                title={book.title}
                copies={book.copies}
              />
            ))
          ) : (
            <p>No hay libros en esta librería</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default LibraryPage;
