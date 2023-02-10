import PropTypes from 'prop-types';
import './InventoryItemCard.scss';

const InventoryItemCard = ({
  name, copies,
}) => (
  <article className="library-card">
    <p className="library-card__name">{name}</p>
    <p className="library-card__city"><b>Ejemplares disponibles: </b>{copies}</p>
  </article>
);
InventoryItemCard.propTypes = {
  name: PropTypes.string.isRequired,
  copies: PropTypes.number,
};

InventoryItemCard.defaultProps = {
  copies: 0,
};

export default InventoryItemCard;
