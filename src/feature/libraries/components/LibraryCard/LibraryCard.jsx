import './LibraryCard.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LibraryCard = ({
  name, city, link, copies,
}) => (
  <Link to={`/library/${link}`} className="library">
    <article className="library-card">
      <p className="library-card__name">{name}</p>
      {city
        ? <p className="library-card__city">{city}</p>
        : null}
      {copies
        ? <p className="library-card__city">{copies}</p>
        : null}
    </article>

  </Link>
);
LibraryCard.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  city: PropTypes.string,
  copies: PropTypes.number,
};

LibraryCard.defaultProps = {
  city: '',
  copies: 0,
};

export default LibraryCard;
