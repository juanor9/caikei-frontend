import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { getBookById } from '../../../../books/services/books';

const BooksSelector = ({ setSelectedBooks, userToken }) => {
  const dispatch = useDispatch();
  const { catalogue } = useSelector((state) => state.catalogue);

  const catalogueSelect = useMemo(
    () => catalogue.map((book) => ({
      value: book._id,
      label: book.title,
    })),
    [catalogue],
  );

  const fetchBookData = async (bookArray) => {
    try {
      const bookArrayPrices = await Promise.all(
        bookArray.map(async (book) => {
          const bookData = await dispatch(getBookById({ id: book.value, userToken }));
          const pvp = bookData.payload.price;
          return { ...book, price: pvp };
        }),
      );
      return bookArrayPrices;
    } catch (error) {
      throw new Error('Error fetching book data:', error);
    }
  };

  const handleChangeBooks = async (selected) => {
    const pricedSelection = await fetchBookData(selected || []);
    setSelectedBooks(pricedSelection);
  };

  return (
    <div className="movement-form__label--double">
      <p>Libros</p>
      <Select
        id="books"
        options={catalogueSelect}
        isSearchable
        isMulti
        onChange={handleChangeBooks}
      />
    </div>
  );
};

BooksSelector.propTypes = {
  setSelectedBooks: PropTypes.func.isRequired,
  userToken: PropTypes.string.isRequired,
};

export default BooksSelector;
