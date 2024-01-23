import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const BookDetailsCard = ({
  book,
  bookDbId,
  bookPrice,
  kind,
  formBookData,
  setFormBookData,
  remisionDiscount,
  salesDiscount,
}) => {
  function numberToCurrency(value, locale = 'es-CO', currency = 'COP') {
    return value.toLocaleString(locale, { style: 'currency', currency });
  }

  const [price, setPrice] = useState(bookPrice);
  const [cost, setCost] = useState(0);
  const [copies, setCopies] = useState(0);

  const handleChangeCost = (event) => {
    const { value } = event.target;
    setCost(Number(value));
  };
  const handleChangeCopies = (event) => {
    const { value } = event.target;
    setCopies(Number(value));
  };
  const handleChangePrice = (event) => {
    const { value } = event.target;
    setPrice(Number(value));
  };

  const costSubtotal = useMemo(() => (copies * cost), [cost, copies]);

  const grossSubtotal = useMemo(() => (copies * price), [copies, price]);
  const [netSubtotal, setNetSubtotal] = useState(0);

  useEffect(() => {
    if (kind === 'remisión') {
      const remisionNet = (copies * price) - (price * (remisionDiscount / 100));
      setNetSubtotal(remisionNet);
    } else if (kind === 'liquidación') {
      const saleNet = (copies * price) - (price * (salesDiscount / 100));
      setNetSubtotal(saleNet);
    }
  }, [copies, price, remisionDiscount, salesDiscount, kind]);

  const [bookDetails, setBookDetails] = useState({});
  useEffect(() => {
    if (kind === 'ingreso') {
      const bookObject = {
        id: bookDbId,
        title: book,
        price,
        cost,
        copies,
        costSubtotal,
      };
      setBookDetails(bookObject);
    } else {
      const bookObject = {
        id: bookDbId,
        title: book,
        price,
        copies,
        grossSubtotal,
        netSubtotal,

      };
      setBookDetails(bookObject);
    }
  }, [price, cost, copies, costSubtotal, grossSubtotal, netSubtotal]);

  useEffect(() => {
    if (formBookData
      && Array.isArray(formBookData)
      && bookDetails
      && Object.keys(bookDetails).length > 0) {
      const bookIndex = formBookData.findIndex((element) => element.id === bookDbId);
      if (bookIndex === -1) {
        setFormBookData([...formBookData, bookDetails]);
      } else if (bookIndex !== -1) {
        const newFormBookData = [...formBookData];
        newFormBookData[bookIndex] = bookDetails;
        setFormBookData(newFormBookData);
      }
    }
  }, [bookDetails]);

  return (
    <div>
      <label htmlFor={book} className="movement-form__label">
        Libro
        <input
          type="text"
          name={bookDbId}
          id={bookDbId}
          value={book}
          readOnly
          className="movement-form__input"
        />
      </label>
      <label
        htmlFor={`${bookDbId}-copies`}
        className="movement-form__label"
      >
        Ejemplares
        <input
          type="number"
          required
          name={`${bookDbId}-copies`}
          id={`${bookDbId}-copies`}
          onChange={handleChangeCopies}
          className="movement-form__input"
        />
      </label>
      {kind === 'ingreso'
        ? (
          <>
            <label
              htmlFor={`${bookDbId}-cost`}
              className="movement-form__label"
            >
              Costo unitario
              <input
                type="number"
                required
                name={`${bookDbId}-cost`}
                id={`${bookDbId}-cost`}
                onChange={handleChangeCost}
                className="movement-form__input"
              />
            </label>
            <div>
              <p>
                <b>Subtotal:</b> {numberToCurrency(costSubtotal)}
              </p>
            </div>
          </>
        )
        : (
          <>
            <label
              htmlFor={`${bookDbId}-pvp`}
              className="movement-form__label"
            >
              Precio de venta
              <input
                type="number"
                required
                name={`${bookDbId}-pvp`}
                id={`${bookDbId}-pvp`}
                onChange={handleChangePrice}
                className="movement-form__input"
                value={bookPrice}
              />
            </label>
            <div>
              <p>
                <b>Subtotal bruto:</b> {numberToCurrency(grossSubtotal)}
              </p>
              <p>
                <b>Subtotal neto:</b> {numberToCurrency(netSubtotal)}
              </p>
            </div>
          </>
        )}
    </div>
  );
};

BookDetailsCard.propTypes = {
  book: PropTypes.string.isRequired,
  bookDbId: PropTypes.string.isRequired,
  bookPrice: PropTypes.number.isRequired,
  kind: PropTypes.string.isRequired,
  formBookData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      price: PropTypes.number,
      cost: PropTypes.number,
      copies: PropTypes.number,
      costSubtotal: PropTypes.number,
    }),
  ),
  setFormBookData: PropTypes.func.isRequired,
  remisionDiscount: PropTypes.number,
  salesDiscount: PropTypes.number,
};

BookDetailsCard.defaultProps = {
  formBookData: [],
  remisionDiscount: 0,
  salesDiscount: 0,
};
export default BookDetailsCard;
