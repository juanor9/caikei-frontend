/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import './MovementRegisterForm.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { getUser } from '../../../users/services/users';
import { getBooksByFilter } from '../../../books/services/books';
import { createMovement } from '../../services/movements';
import useForm from '../../../../hooks/useForm';
import RegisterRemisionForm from '../RegisterRemisionForm/RegisterRemisionForm';
import RegisterDevolutionForm from '../RegisterDevolutionForm/RegisterDevolutionForm';
import RegisterSaleForm from '../RegisterSaleForm/RegisterSaleForm';
import { getLibrariesById } from '../../../libraries/services/libraries';

const MovementRegisterForm = () => {
  const [kind, setKind] = useState('');
  const { form, handleChange } = useForm({});
  // States for remsion
  const [remisionFrom, setRemisionFrom] = useState(null);
  const [remisionTo, setRemisionTo] = useState(null);

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
  const [selectedBooks, setSelectedBooks] = useState(null);
  const handleChangeBooks = (selected) => {
    setSelectedBooks(selected);
  };
  // Add selected books to the book data
  const [formBookData, setFormBookData] = useState([]);

  useEffect(() => {
    if (selectedBooks && selectedBooks.length > 0) {
      selectedBooks.map((option) => {
        const { value } = option;
        setFormBookData(formBookData.concat({ id: value }));
        return formBookData;
      });
    }
  }, [selectedBooks]);
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
  };
  useEffect(() => {
    const totals = formBookData.map((i) => i.total);
    if (totals.length > 0) {
      setGrossTotal(totals.reduce((a, b) => a + b));
    }
  }, [formBookData]);

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
      dispatch(createMovement(formfulldata));
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

  // for remision discount
  const [remisionDiscount, setremisionDiscount] = useState(0);
  useEffect(() => {
    if (remisionTo) {
      dispatch(getLibrariesById(remisionTo));
    }
  }, [remisionTo]);
  const { library } = useSelector((state) => state.library);
  useEffect(() => {
    if (kind === 'remisión') {
      const libraryPublisherList = library.publishers;
      if (Array.isArray(libraryPublisherList)) {
        const PublisherInLibrary = libraryPublisherList.find(
          (pub) => pub.publisherId === publisher,
        );
        setremisionDiscount(PublisherInLibrary.discount);
      }
    }
  }, [library]);
  const handleChangeRemisionDiscount = (event) => {
    const { value } = event.target;
    setremisionDiscount(value);
  };
  // for remision net total
  const [netTotal, setNetTotal] = useState(0);
  useEffect(() => {
    if (remisionDiscount) {
      setNetTotal(grossTotal - (grossTotal * (remisionDiscount / 100)));
    }
  }, [remisionDiscount, grossTotal]);
  // crear datos para solicitud
  useEffect(() => {
    const { internalId, date } = form;
    setFormfulldata({
      ...formfulldata,
      internalId,
      date,
      kind,
      books: formBookData,
      grossTotal,
      publisher,
    });
    if (kind === 'remisión') {
      setFormfulldata({
        ...formfulldata,
        internalId,
        date,
        kind,
        books: formBookData,
        grossTotal,
        netTotal,
        publisher,
        from: remisionFrom,
        to: remisionTo,
        discount: remisionDiscount,
      });
    }
    if (kind === 'devolución') {
      setFormfulldata({
        ...formfulldata,
        internalId,
        date,
        kind,
        books: formBookData,
        grossTotal,
        publisher,
        from: remisionFrom,
        to: remisionTo,
      });
    }
  }, [
    form,
    kind,
    formBookData,
    grossTotal,
    publisher,
    remisionFrom,
    remisionTo,
    remisionDiscount,
  ]);

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
            id="remisión"
            value="remisión"
            onChange={handleChangeKindMod}
          />{' '}
          Remisión
        </label>
        <label htmlFor="kind">
          <input
            type="radio"
            name="kind"
            id="devolución"
            value="devolución"
            onChange={handleChangeKindMod}
          />{' '}
          Devolución
        </label>
        <label htmlFor="kind">
          <input
            type="radio"
            name="kind"
            id="liquidación"
            value="liquidación"
            onChange={handleChangeKindMod}
          />{' '}
          Liquidación
        </label>
      </label>
      {kind === 'remisión' ? (
        <><RegisterRemisionForm from={setRemisionFrom} to={setRemisionTo} />
          <label htmlFor="discount">
            Descuento
            <input
              type="discount"
              name="discount"
              id="discount"
              key={`${Math.floor((Math.random() * 1000))}-min`}
              defaultValue={remisionDiscount}
              onChange={handleChangeRemisionDiscount}
            />
          </label>
        </>
      ) : null}
      {kind === 'devolución' ? (
        <RegisterDevolutionForm from={setRemisionFrom} to={setRemisionTo} />
      ) : null}
      {kind === 'liquidación' ? (
        <RegisterSaleForm from={setRemisionFrom} />
      ) : null}
      <p> Libros</p>
      <Select
        id="books"
        options={catalogueSelect}
        isSearchable
        isClearable
        isMulti
        onChange={handleChangeBooks}
      />
      {selectedBooks && selectedBooks.length > 0
        ? selectedBooks.map((book) => (
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
                <div key={`${e.id}-totals`}>
                  <p key={`${e.id}-grossSubtotal`}>
                    <b>Subtotal bruto: </b>
                    {e.total}
                  </p>
                  <p key={`${e.id}-netSubtotal`}>
                    <b>Subtotal neto: </b>
                    {e.total - (e.total * (remisionDiscount / 100))}
                  </p>
                </div>
              ) : null))
              : null}
          </div>
        ))
        : null}
      <div key="totals">
        <p key={`${grossTotal}grossTotal`}>
          <b>Total bruto: </b>
          {grossTotal}
        </p>
        {kind === 'remisión'
          ? (
            <p key={`${netTotal}nettotal`}>
              <b>Total neto: </b>
              {netTotal}
            </p>
          )
          : null}
      </div>

      <button type="submit">Guardar {kind}</button>
    </form>
  );
};

export default MovementRegisterForm;
