import PropTypes from 'prop-types';

const InventoryItemCard = ({
  name, copies,
}) => (
  <article className="library-card">
    <p className="library-card__name">{name}</p>
    <p className="library-card__city">{copies}</p>
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
