/**
 * BookPage Component - Refactored
 * Applies SRP (Single Responsibility Principle)
 * Applies DRY - uses EditableField component
 */
import './Book.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById, updateBookById } from '../../feature/books/services/books';
import InventoryItemCard from '../../feature/libraries/components/InventoryItemCard/InventoryItemCard';
import TopNav from '../../components/TopNav/TopNav';
import EditableField from '../../components/EditableField';
import useForm from '../../hooks/useForm';
import useInitializeUser from '../../hooks/useInitializeUser';
import useDate from '../../hooks/useDate';

// Field configuration for the book form
const BOOK_FIELDS = [
  { name: 'title', label: 'Titulo', type: 'text' },
  { name: 'isbn', label: 'Isbn', type: 'number' },
  { name: 'price', label: 'Precio', type: 'number' },
  { name: 'authors', label: 'Autores', type: 'text' },
  { name: 'thema', label: 'Clasificador THEMA', type: 'text' },
  { name: 'binding', label: 'Encuadernacion', type: 'text' },
  { name: 'pages', label: 'Paginas', type: 'text' },
  { name: 'costCenter', label: 'Centro de costo', type: 'text' },
];

const BookPage = () => {
  const { book } = useSelector((state) => state.book);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formatDateISO } = useDate();

  const [readOnly, setReadOnly] = useState(true);
  const { form, handleChange } = useForm({});

  // Use custom hook for user initialization
  const {
    userToken,
    publisher,
    publisherData,
    allLibraries,
  } = useInitializeUser();

  const {
    title,
    cover,
    pubDate,
    height,
    width,
    color,
    inventory,
  } = book;

  // Fetch book data on mount
  useEffect(() => {
    if (id && userToken) {
      dispatch(getBookById({ id, userToken }));
    }
  }, [id, userToken, dispatch]);

  // Format date for input
  const formattedDate = useMemo(() => {
    const dateToFormat = form.pubDate || pubDate;
    return formatDateISO(dateToFormat);
  }, [form.pubDate, pubDate, formatDateISO]);

  // Process inventory list
  const inventoryList = useMemo(() => {
    if (!inventory || !Array.isArray(inventory)) return [];

    return inventory.map((storage) => {
      if (storage.placeId === publisher) {
        return {
          id: storage._id,
          name: publisherData.name,
          copies: storage.copies,
        };
      }

      if (allLibraries && Array.isArray(allLibraries)) {
        const library = allLibraries.find((lib) => lib._id === storage.placeId);
        if (library) {
          return {
            id: storage._id,
            name: library.name,
            copies: storage.copies,
          };
        }
      }

      return storage;
    });
  }, [inventory, publisher, publisherData.name, allLibraries]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(updateBookById({ form, id, userToken }));
      setReadOnly(true);
      navigate('/catalogue');
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="book-page">
      <TopNav />
      <main className="book-page__main-container">
        <h2>{title}</h2>
        <section className="book-page__section">
          <figure className="book-page__cover-fig">
            <img src={cover} alt={title} className="book-page__cover-img" />
          </figure>

          <form onSubmit={handleSubmit} className="book-page__form">
            {/* Render standard fields */}
            {BOOK_FIELDS.map((field) => (
              <EditableField
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                defaultValue={book[field.name]}
                readOnly={readOnly}
                onChange={handleChange}
                className="book-page__form-label"
              />
            ))}

            {/* Date field with controlled value */}
            <EditableField
              label="Fecha de publicacion"
              name="pubDate"
              type="date"
              value={formattedDate}
              readOnly={readOnly}
              onChange={handleChange}
              className="book-page__form-label"
            />

            {/* Size fields group */}
            <span className="book-page__form-label">
              Medidas
              <div className="book-page__size-container">
                <EditableField
                  label="Ancho"
                  name="width"
                  type="text"
                  defaultValue={width}
                  readOnly={readOnly}
                  onChange={handleChange}
                />
                <EditableField
                  label="Alto"
                  name="height"
                  type="text"
                  defaultValue={height}
                  readOnly={readOnly}
                  onChange={handleChange}
                />
              </div>
            </span>

            {/* Color field */}
            <EditableField
              label="Color"
              name="color"
              type="color"
              defaultValue={color}
              disabled={readOnly}
              onChange={handleChange}
              className="book-page__form-label"
            />

            <button type="submit" className="book-page__form-button">
              Guardar cambios
            </button>
          </form>
        </section>

        <h3>Inventario</h3>
        <section className="book-page__inventory-container">
          {inventoryList.length > 0 ? (
            inventoryList.map((place) => (
              place.name && place.copies ? (
                <InventoryItemCard
                  key={place.id}
                  name={place.name}
                  copies={place.copies}
                />
              ) : null
            ))
          ) : (
            <p>No hay ejemplares disponibles.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default BookPage;
