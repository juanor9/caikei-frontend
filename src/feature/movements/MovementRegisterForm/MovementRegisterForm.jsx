/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import './MovementRegisterForm.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../users/services/users';
import { getBooksByFilter } from '../../books/services/books';
import useForm from '../../../hooks/useForm';
import { createMovement } from '../services/movements';

const MovementRegisterForm = () => {
  const [kind, setKind] = useState('');
  const { form, handleChange } = useForm({});

  // Get data from redux
  const userToken = localStorage.getItem('login-token');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { publisher } = useSelector((state) => state.user.userData);
  const { catalogue } = useSelector((state) => state.catalogue);

  const [formfulldata, setFormfulldata] = useState({});
  // for React Select
  const catalogueSelect = catalogue.map((book) => ({
    value: book._id,
    label: book.title,
  }));
  const [selectedOption, setSelectedOption] = useState(null);
  const handleChangeBooks = (selected) => {
    setSelectedOption(selected);
  };
  // Add selected books to the book data
  const [formBookData, setFormBookData] = useState([]);

  useEffect(() => {
    if (selectedOption && selectedOption.length > 0) {
      selectedOption.map((option) => {
        const { value } = option;
        setFormBookData(formBookData.concat({ id: value }));
        return formBookData;
      });
    }
  }, [selectedOption]);

  // gross total
  const [grossTotal, setGrossTotal] = useState(0);

  // add info from form to book data
  const handleChangeBook = (event) => {
    const { name, value } = event.target;
    const nameSplit = name.split('-');

    const bookId = nameSplit[0];

    const key = nameSplit[1];

    const NewFormData = formBookData.map((bookData) => {
      if (bookData.id === bookId) {
        let total = 0;

        bookData = { ...bookData, [key]: value };

        if (bookData.copies && bookData.cost) {
          total = bookData.copies * bookData.cost;

          bookData = { ...bookData, total };
        }
        return bookData;
      }
      return bookData;
    });
    setFormBookData(NewFormData);

    const totals = formBookData.map((i) => i.total);
    setGrossTotal(totals.reduce((a, b) => a + b));
  };

  // catch kind of movement
  const handleChangeKindMod = (event) => {
    const { value } = event.target;
    if (value) {
      setKind(value);
    }
    if (event) {
      handleChange(event);
    }
  };

  // send data to backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(
        createMovement(formfulldata),
      );
      navigate('/movements');
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
    if (publisher) {
      try {
        dispatch(getBooksByFilter(publisher));
      } catch (error) {
        throw new Error(error);
      }
    }
  }, [publisher]);

  useEffect(() => {
    const { internalId, date } = form;
    setFormfulldata({
      internalId,
      date,
      kind,
      books: formBookData,
      grossTotal,
      publisher,
    });
  }, [form, formBookData, grossTotal]);

  return (
    <form action="" className="movement-form" onSubmit={handleSubmit}>
      <label htmlFor="internalId">
        Número de referencia
        <input
          type="number"
          name="internalId"
          id="internalId"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="date">
        Fecha
        <input type="date" name="date" id="date" onChange={handleChange} />
      </label>
      <label htmlFor="kind">
        Tipo
        <label htmlFor="kind">
          <input
            type="radio"
            name="kind"
            id="ingreso"
            value="ingreso"
            onChange={handleChangeKindMod}
          />{' '}
          Ingreso
        </label>
        <label htmlFor="kind">
          <input
            type="radio"
            name="kind"
            id="ingreso"
            value="remisión"
            onChange={handleChangeKindMod}
          />{' '}
          Remisión
        </label>
        <label htmlFor="kind">
          <input
            type="radio"
            name="kind"
            id="ingreso"
            value="devloución"
            onChange={handleChangeKindMod}
          />{' '}
          Devolución
        </label>
        <label htmlFor="kind">
          <input
            type="radio"
            name="kind"
            id="ingreso"
            value="liquidación"
            onChange={handleChangeKindMod}
          />{' '}
          Liquidación
        </label>
      </label>
      <p> Libros</p>
      <Select
        id="books"
        options={catalogueSelect}
        isSearchable
        isClearable
        isMulti
        onChange={handleChangeBooks}
      />
      {selectedOption && selectedOption.length > 0
        ? selectedOption.map((book) => (
          <div key={book.value}>
            <label htmlFor={book.value}>
              Libro
              <input
                type="text"
                name={book.value}
                id={book.value}
                value={book.label}
                readOnly
              />
            </label>
            <label htmlFor={`${book.value}-copies`}>
              Ejemplares
              <input
                type="number"
                name={`${book.value}-copies`}
                id={`${book.value}-copies`}
                onChange={handleChangeBook}
              />
            </label>
            <label htmlFor={`${book.value}-cost`}>
              costo unitario
              <input
                type="number"
                name={`${book.value}-cost`}
                id={`${book.value}-cost`}
                onChange={handleChangeBook}
              />
            </label>
            {formBookData.length > 0
              ? formBookData.map((e) => (e.id === book.value && e.total ? (
                <p key={`${e.id}-subtotal`}>
                  <b>Subtotal: </b>
                  {e.total}
                </p>
              ) : null))
              : null}
          </div>
        ))
        : null}
      <p>
        <b>Total bruto: </b>
        {grossTotal}
      </p>
      <button type="submit">Guardar {kind}</button>
    </form>
  );
};

export default MovementRegisterForm;
