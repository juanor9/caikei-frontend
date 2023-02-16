import TopNav from '../../components/TopNav/TopNav';
import UserProfile from '../../feature/users/components/UserProfile/UserProfile';
import './UserProfile.scss';
import PublisherProfile from '../../feature/publishers/components/PublisherProfile/PublisherProfile';
import GeneralInventory from '../../feature/movements/components/GeneralInventory/GeneralInventory';

const UserProfilePage = () => (
  <div className="user-profile">
    <TopNav />
    <main className="user-profile__main-container">
      <UserProfile />
      <PublisherProfile />
      <GeneralInventory />
    </main>

  </div>
);

export default UserProfilePage;
