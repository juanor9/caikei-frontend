/* eslint-disable no-unused-vars */
import './LibraryCard.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LibraryCard = ({ name, city, link }) => (
  <Link to={`/library/${link}`} className="library">
    <article className="library-card">
      <p className="library-card__name">{name}</p>
      <p className="library-card__city">{city}</p>
    </article>

  </Link>
);
LibraryCard.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  city: PropTypes.string,
};

LibraryCard.defaultProps = {
  city: '',

};

export default LibraryCard;
