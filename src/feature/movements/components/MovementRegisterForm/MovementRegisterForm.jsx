/* eslint-disable no-param-reassign */
import './MovementRegisterForm.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { createMovement, getMovementsByPublisher } from '../../services/movements';
import { getBooksByPublisher } from '../../../books/services/books';
import { getLibrariesById } from '../../../libraries/services/libraries';
import { getUser } from '../../../users/services/users';
import RegisterDevolutionForm from '../RegisterDevolutionForm/RegisterDevolutionForm';
import RegisterRemisionForm from '../RegisterRemisionForm/RegisterRemisionForm';
import RegisterSaleForm from '../RegisterSaleForm/RegisterSaleForm';
import useForm from '../../../../hooks/useForm';

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
  const [catalogueSelect, setCatalogueSelect] = useState({});
  useEffect(() => {
    if (catalogue && Array.isArray(catalogue)) {
      setCatalogueSelect(catalogue.map((book) => ({
        value: book._id,
        label: book.title,
      })));
    }
  }, [catalogue]);
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
        dispatch(getBooksByPublisher({ publisher, userToken }));
      } catch (error) {
        throw new Error(error);
      }
    }
  }, [publisher]);

  // for remision discount
  const [remisionDiscount, setremisionDiscount] = useState(0);
  useEffect(() => {
    if (remisionTo) {
      dispatch(getLibrariesById({ id: remisionTo, userToken }));
    }
  }, [remisionTo]);

  const { library } = useSelector((state) => state.library);
  useEffect(() => {
    if (kind === 'remisión' && library) {
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
      const decimalDiscount = remisionDiscount / 100;
      const totalDiscount = grossTotal * decimalDiscount;
      const $netTotal = grossTotal - totalDiscount;
      setNetTotal($netTotal);
    }
  }, [remisionDiscount, grossTotal]);

  // for remision discount
  const [salesDiscount, setSalesDiscount] = useState(0);
  useEffect(() => {
    if (remisionFrom && remisionFrom !== publisher) {
      dispatch(getLibrariesById({ id: remisionFrom, userToken }));
    }
  }, [remisionFrom]);

  useEffect(() => {
    if (kind === 'liquidación') {
      const libraryPublisherList = library.publishers;
      if (Array.isArray(libraryPublisherList)) {
        const PublisherInLibrary = libraryPublisherList.find(
          (pub) => pub.publisherId === publisher,
        );
        setSalesDiscount(PublisherInLibrary.discount);
      }
    }
  }, [library]);

  const handleChangeSalesDiscount = (event) => {
    const { value } = event.target;
    setSalesDiscount(value);
  };

  // for sales net total
  useEffect(() => {
    if (salesDiscount) {
      const decimalDiscount = salesDiscount / 100;
      const totalDiscount = grossTotal * decimalDiscount;
      const $netTotal = grossTotal - totalDiscount;
      setNetTotal($netTotal);
    }
  }, [salesDiscount, grossTotal]);

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
      createdBy: publisher,
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
        createdBy: publisher,
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
        createdBy: publisher,
      });
    }
    if (kind === 'liquidación') {
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
        discount: salesDiscount,
        createdBy: publisher,
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
    salesDiscount,
    publisher,
    netTotal,
  ]);

  // send data to backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(createMovement({ formfulldata, userToken }));
      navigate('/movements');
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    const formButton = document.getElementById('form-button');
    const { books } = formfulldata;
    const formKind = formfulldata.kind;

    if (formKind && books && Array.isArray(books) && books.length > 0) {
      formButton.classList.remove('movement-form__submit-button--disabled');
      formButton.classList.add('movement-form__submit-button');
    }
    if (Array.isArray(books) && books.length === 0) {
      formButton.classList.remove('movement-form__submit-button');
      formButton.classList.add('movement-form__submit-button--disabled');
    }
  }, [formfulldata]);

  const { movement } = useSelector((state) => state.movements);
  const [movementsNumber, setMovementsNumber] = useState(0);
  useEffect(() => {
    if (publisher) {
      dispatch(getMovementsByPublisher(publisher));
    }
  }, [publisher]);

  useEffect(() => {
    if (Array.isArray(movement)) {
      setMovementsNumber(movement.length);
    }
  }, [movement]);

  const todayFull = new Date();
  const year = todayFull.getFullYear();
  const month = String(todayFull.getMonth() + 1).padStart(2, '0');
  const day = String(todayFull.getDate()).padStart(2, '0');
  const today = `${year}-${month}-${day}`;

  return (
    <form action="" className="movement-form" onSubmit={handleSubmit}>
      <label htmlFor="internalId" className="movement-form__label">
        Número de referencia
        <input
          type="number"
          name="internalId"
          id="internalId"
          required
          defaultValue={movementsNumber > 0 ? movementsNumber + 1 : null}
          onChange={handleChange}
          className="movement-form__input"
        />
      </label>
      <label htmlFor="date" className="movement-form__label">
        Fecha
        <input
          type="date"
          name="date"
          id="date"
          required
          onChange={handleChange}
          defaultValue={today}
          className="movement-form__input"
        />
      </label>
      <label htmlFor="kind" className="movement-form__label--double">
        <p>Tipo</p>
        <label htmlFor="kind">
          <input
            type="radio"
            name="kind"
            id="ingreso"
            value="ingreso"
            required
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
        <>
          <RegisterRemisionForm from={setRemisionFrom} to={setRemisionTo} />
          <label htmlFor="discount" className="movement-form__label--double">
            Descuento
            <input
              type="discount"
              name="discount"
              id="discount"
              required
              key={`${Math.floor((Math.random() * 1000))}-min`}
              defaultValue={remisionDiscount}
              onChange={handleChangeRemisionDiscount}
              className="movement-form__input"
            />
          </label>
        </>
      ) : null}
      {kind === 'devolución' ? (
        <RegisterDevolutionForm from={setRemisionFrom} to={setRemisionTo} />
      ) : null}
      {kind === 'liquidación' ? (
        <>
          <RegisterSaleForm from={setRemisionFrom} />
          <label htmlFor="discount" className="movement-form__label">
            Descuento
            <input
              type="discount"
              name="discount"
              id="discount"
              required
              key={`${Math.floor((Math.random() * 1000))}-min`}
              defaultValue={salesDiscount}
              onChange={handleChangeSalesDiscount}
              className="movement-form__input"
            />
          </label>
        </>
      ) : null}
      <div className="movement-form__label--double">
        <p> Libros</p>
        <Select
          id="books"
          options={catalogueSelect}
          isSearchable
          // isClearable
          isMulti
          onChange={handleChangeBooks}
        />
      </div>
      {selectedBooks && selectedBooks.length > 0
        ? selectedBooks.map((book) => (
          <div key={book.value}>
            <label htmlFor={book.value} className="movement-form__label">
              Libro
              <input
                type="text"
                name={book.value}
                id={book.value}
                value={book.label}
                readOnly
                className="movement-form__input"
              />
            </label>
            <label htmlFor={`${book.value}-copies`} className="movement-form__label">
              Ejemplares
              <input
                type="number"
                required
                name={`${book.value}-copies`}
                id={`${book.value}-copies`}
                onChange={handleChangeBook}
                className="movement-form__input"
              />
            </label>
            <label htmlFor={`${book.value}-cost`} className="movement-form__label">
              costo unitario
              <input
                type="number"
                required
                name={`${book.value}-cost`}
                id={`${book.value}-cost`}
                onChange={handleChangeBook}
                className="movement-form__input"
              />
            </label>
            {formBookData.length > 0 && kind === 'remisión'
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
            {formBookData.length > 0 && kind === 'liquidación'
              ? formBookData.map((e) => (e.id === book.value && e.total ? (
                <div key={`${e.id}-totals`}>
                  <p key={`${e.id}-grossSubtotal`}>
                    <b>Subtotal bruto: </b>
                    {e.total}
                  </p>
                  <p key={`${e.id}-netSubtotal`}>
                    <b>Subtotal neto: </b>
                    {e.total - (e.total * (salesDiscount / 100))}
                  </p>
                </div>
              ) : null))
              : null}
          </div>
        ))
        : null}
      <div key="totals">
        <p key={`${Math.floor((Math.random() * 1000))}-min`}>
          <b>Total bruto: </b>
          {grossTotal}
        </p>
        {kind === 'remisión' || kind === 'liquidación'
          ? (
            <p key={`${Math.floor((Math.random() * 1000))}-min`}>
              <b>Total neto: </b>
              {netTotal}
            </p>
          )
          : null}
      </div>

      <button id="form-button" type="submit" className="movement-form__submit-button--disabled">Guardar {kind}</button>
    </form>
  );
};

export default MovementRegisterForm;
