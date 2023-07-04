import { useState, useEffect } from 'react';
import TopNav from '../../components/TopNav/TopNav';
import UserProfile from '../../feature/users/components/UserProfile/UserProfile';
import './UserProfile.scss';
import PublisherProfile from '../../feature/publishers/components/PublisherProfile/PublisherProfile';
import GeneralInventory from '../../feature/movements/components/GeneralInventory/GeneralInventory';
import ProfileTabs from '../../feature/users/components/ProfileTabs/ProfileTabs';

const UserProfilePage = () => {
  const [profileTab, setProfileTab] = useState('userProfile');

  useEffect(() => {}, [ProfileTabs]);
  return (
    <div className="user-profile">
      <TopNav />
      <main className="user-profile__main-container">
        <ProfileTabs tabChange={setProfileTab} selectedTab={profileTab} />
        {profileTab === 'userProfile' ? <UserProfile /> : null}
        {profileTab === 'publisherProfile' ? <PublisherProfile /> : null}
        {profileTab === 'inventory' ? <GeneralInventory /> : null}
      </main>
    </div>
  );
};

export default UserProfilePage;
