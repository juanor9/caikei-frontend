import PropTypes from 'prop-types';
import './BookInventoryCard.scss';

const BookInventoryCard = ({
  cover, title, copies,
}) => (
  <article className="book-inventory-card">
    <figure className="book-inventory-card__fig">
      <img src={cover} alt={`${title}-cover`} className="book-inventory-card__img" />
    </figure>
    <p className="book-inventory-card__title">{title}</p>
    <p className="book-inventory-card__copies"><b>Ejemplares disponibles: </b>{copies}</p>
  </article>
);
BookInventoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  cover: PropTypes.string,
  copies: PropTypes.number,
};

BookInventoryCard.defaultProps = {
  copies: 0,
  cover: '',
};

export default BookInventoryCard;
