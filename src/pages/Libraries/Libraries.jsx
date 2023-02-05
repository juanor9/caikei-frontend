/* eslint-disable no-unused-vars */
import './Libraries.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../feature/users/services/users';
import TopNav from '../../components/TopNav/TopNav';
import { getLibrariesByPublisher } from '../../feature/libraries/services/libraries';
import LibraryCard from '../../feature/libraries/components/LibraryCard/LibraryCard';

const LibrariesPage = () => {
  const userToken = localStorage.getItem('login-token');
  const { publisher } = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const { library } = useSelector((state) => state.library);

  useEffect(() => {
    if (userToken) {
      try {
        dispatch(getUser(userToken));
      } catch (error) {
        throw new Error(error);
      }
    }
  }, []);

  useEffect(() => {
    if (publisher) {
      try {
        dispatch(getLibrariesByPublisher(publisher));
      } catch (error) {
        throw new Error(error);
      }
    }
  }, [publisher]);
  return (
    <div className="libraries">
      <TopNav />
      <main>
        <h2>Librerías</h2>
        <Link to="/library/register" className="libraries__add-button"> Añadir una librería</Link>
        <section className="libraries__libraries-container">
          {library && Array.isArray(library)
            ? library.map((lib) => (
              <LibraryCard
                key={lib._id}
                name={lib.name}
                city={lib.city}
                link={lib._id}
              />
            ))
            : null}
        </section>
      </main>
    </div>
  );
};

export default LibrariesPage;
