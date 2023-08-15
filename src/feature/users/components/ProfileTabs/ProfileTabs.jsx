/* eslint-disable no-unused-vars */
import './ProfileTabs.scss';
import PropTypes from 'prop-types';

const ProfileTabs = ({ tabChange, selectedTab }) => {
  const handleClickProfile = () => {
    tabChange('userProfile');
  };
  const handleClickPublisher = () => {
    tabChange('publisherProfile');
  };
  const handleClickInventory = () => {
    tabChange('inventory');
  };
  return (
    <aside className="profile-tabs">
      <nav>
        <ul>
          <li>
            <button
              type="button"
              onClick={handleClickProfile}
              className="profile-tabs__button"
            >
              Perfil
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={handleClickPublisher}
              className="profile-tabs__button"
            >
              Mi editorial
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={handleClickInventory}
              className="profile-tabs__button"
            >
              Inventario
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
ProfileTabs.propTypes = {
  tabChange: PropTypes.func.isRequired,
  selectedTab: PropTypes.string.isRequired,
};
export default ProfileTabs;
