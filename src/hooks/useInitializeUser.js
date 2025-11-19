/**
 * Hook for initializing user data
 * Applies SRP (Single Responsibility Principle)
 */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../feature/users/services/users';
import { getPublisherById } from '../feature/publishers/services/publishers';
import getLibrariesByPublisher from '../feature/libraries/services/allLibraries';
import useAuthToken from './useAuthToken';

const useInitializeUser = () => {
  const dispatch = useDispatch();
  const userToken = useAuthToken();
  const { publisher } = useSelector((state) => state.user.userData);
  const publisherData = useSelector((state) => state.publisher.publisher);
  const { allLibraries } = useSelector((state) => state.allLibraries);

  // Initialize user on mount
  useEffect(() => {
    if (userToken) {
      dispatch(getUser(userToken));
    }
  }, [userToken, dispatch]);

  // Load publisher and libraries when publisher ID is available
  useEffect(() => {
    if (publisher && userToken) {
      dispatch(getLibrariesByPublisher({ publisher, userToken }));
      dispatch(getPublisherById({ publisher, userToken }));
    }
  }, [publisher, userToken, dispatch]);

  return {
    userToken,
    publisher,
    publisherData,
    allLibraries,
  };
};

export default useInitializeUser;
