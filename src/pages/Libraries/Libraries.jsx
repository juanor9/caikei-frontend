import './Libraries.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getUser } from '../../feature/users/services/users';
import TopNav from '../../components/TopNav/TopNav';
import getLibrariesByPublisher from '../../feature/libraries/services/allLibraries';
import LibraryCard from '../../feature/libraries/components/LibraryCard/LibraryCard';

const LibrariesPage = () => {
  const userToken = localStorage.getItem('login-token');
  const { publisher } = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const { allLibraries } = useSelector((state) => state.allLibraries);

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
    if (publisher && userToken) {
      try {
        dispatch(getLibrariesByPublisher({ publisher, userToken }));
      } catch (error) {
        throw new Error(error);
      }
    }
  }, [publisher]);

  const [sortedLibraries, setSortedLibraries] = useState([]);

  useEffect(() => {
    if (allLibraries && Array.isArray(allLibraries) && allLibraries.length > 0) {
      const sortedList = [...allLibraries].sort(((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return dateB - dateA;
      }));
      setSortedLibraries(sortedList);
    }
  }, [allLibraries]);
  return (
    <div className="libraries">
      <TopNav />
      <main className="libraries__main-container">
        <h2>Librerías</h2>
        <Link to="/library/register" className="libraries__add-button">
          <FontAwesomeIcon icon={faPlus} />
          Añadir librería
        </Link>
        <Link to="/library/import">Importar librerías</Link>
        <section className="libraries__libraries-container" key={`${Math.floor((Math.random() * 1000))}-min`}>
          {sortedLibraries && Array.isArray(sortedLibraries) && sortedLibraries.length > 0
            ? sortedLibraries.map((lib) => (
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
