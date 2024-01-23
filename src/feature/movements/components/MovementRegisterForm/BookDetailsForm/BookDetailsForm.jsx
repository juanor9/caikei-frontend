import PropTypes from 'prop-types';
import BookDetailsCard from './BookDetailsCard/BookDetailsCard';

const BookDetailsForm = ({
  selectedBooks,
  kind,
  formBookData,
  setFormBookData,
  remisionDiscount,
  salesDiscount,
}) => {
  if (!selectedBooks || selectedBooks.length === 0 || !Array.isArray(selectedBooks)) {
    return null;
  }
  const a = selectedBooks.map((book) => (
    <BookDetailsCard
      book={book.label}
      bookDbId={book.value}
      bookPrice={book.price}
      kind={kind}
      formBookData={formBookData}
      setFormBookData={setFormBookData}
      remisionDiscount={remisionDiscount}
      salesDiscount={salesDiscount}
      key={book.value}
      selectedBooks={selectedBooks}
    />
  ));
  return a;
};
BookDetailsForm.propTypes = {
  kind: PropTypes.string.isRequired,
  selectedBooks: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
      price: PropTypes.number,
    }),
  ),
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

BookDetailsForm.defaultProps = {
  selectedBooks: [],
  formBookData: [],
  remisionDiscount: 0,
  salesDiscount: 0,
};
export default BookDetailsForm;
