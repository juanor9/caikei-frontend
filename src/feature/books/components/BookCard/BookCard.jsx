/* eslint-disable no-unused-vars */
import './BookCard.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BookCard = ({ title, cover }) => {
  const a = 1;
  return (
    <Link to="/" className="book__link">
      <article className="book" style={{ backgroundImage: `url(${cover})` }}>
        <div className="book__transition" />
        <div className="book__info">
          <p><b>{title}</b></p>
        </div>
      </article>
    </Link>
  );
};

BookCard.propTypes = {
  title: PropTypes.string.isRequired,
  cover: PropTypes.string,
};

BookCard.defaultProps = {
  cover: '',

};
export default BookCard;
