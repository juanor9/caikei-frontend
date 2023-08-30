import './UserProfile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getUser } from '../../feature/users/services/users';
import GeneralInventory from '../../feature/inventory/components/GeneralInventory/GeneralInventory';
import ProfileTabs from '../../feature/users/components/ProfileTabs/ProfileTabs';
import PublisherProfile from '../../feature/publishers/components/PublisherProfile/PublisherProfile';
import TopNav from '../../components/TopNav/TopNav';
import UserProfile from '../../feature/users/components/UserProfile/UserProfile';
import { getPublisherById } from '../../feature/publishers/services/publishers';

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const userToken = localStorage.getItem('login-token');
  const { userData } = useSelector((state) => state.user);
  const { publisher } = userData;

  const [profileTab, setProfileTab] = useState('userProfile');

  useEffect(() => {}, [ProfileTabs]);
  useEffect(() => {
    dispatch(getUser(userToken));
  }, []);
  const dispatchPublisher = async (publisherId, jwsToken) => {
    if (publisherId !== undefined && jwsToken !== undefined) {
      dispatch(getPublisherById({ publisher: publisherId, userToken: jwsToken }));
    }
  };
  useEffect(() => {
    dispatchPublisher(publisher, userToken);
  }, [publisher, userToken]);
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
