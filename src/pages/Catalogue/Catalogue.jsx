/* eslint-disable no-unused-vars */
import './Catalogue.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getUser } from '../../feature/users/services/users';
import { getBooksByPublisher } from '../../feature/books/services/books';
import TopNav from '../../components/TopNav/TopNav';
import BookCard from '../../feature/books/components/BookCard/BookCard';

const CataloguePage = () => {
  const dispatch = useDispatch();
  const [userToken, setUserToken] = useState(localStorage.getItem('login-token'));

  const { publisher } = useSelector((state) => state.user.userData);
  const { catalogue } = useSelector((state) => state.catalogue);

  useEffect(() => {
    setUserToken(localStorage.getItem('login-token'));
  }, []);

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
        dispatch(getBooksByPublisher({ publisher, userToken }));
      } catch (error) {
        throw new Error(error);
      }
    }
  }, [publisher, userToken]);

  return (
    <div className="catalogue">
      <TopNav />
      <main className="catalogue__main-container">
        <h2>Catálogo</h2>
        <div className="catalogue__top-links">
          <Link to="/book/register" className="catalogue__add-button">
            <FontAwesomeIcon icon={faPlus} />
            Añadir libro
          </Link>
          <Link to="/book/import">Importar catálogo</Link>
        </div>

        <section className="catalogue__books-container">

          {catalogue && Array.isArray(catalogue) && publisher
            ? (
              catalogue.map((book) => (
                <BookCard
                  key={book._id}
                  title={book.title}
                  cover={book.cover}
                  bookId={book._id}
                />
              ))
            )
            : null}
        </section>
      </main>
    </div>
  );
};

export default CataloguePage;
