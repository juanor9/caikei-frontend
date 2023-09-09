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
import { getPlan } from '../../feature/plans/services/plans';

const CataloguePage = () => {
  const dispatch = useDispatch();
  const [userToken, setUserToken] = useState(
    localStorage.getItem('login-token'),
  );

  const { publisher } = useSelector((state) => state.user.userData);
  const { catalogue } = useSelector((state) => state.catalogue);
  const planId = useSelector((state) => state.user.userData.plan);
  const { titles } = useSelector((state) => state.plan.plan);

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

  useEffect(() => {
    if (planId && userToken) {
      dispatch(getPlan({ planId, userToken }));
    }
  }, [planId, userToken]);
  const [newTitleAvailable, setNewTitleAvailable] = useState(false);
  useEffect(() => {
    if (titles && catalogue && Array.isArray(catalogue)) {
      if (catalogue.length < titles) {
        setNewTitleAvailable(true);
      }
    }
  }, [titles, catalogue]);

  return (
    <div className="catalogue">
      <TopNav />
      <main className="catalogue__main-container">
        <h2>Catálogo</h2>

        {newTitleAvailable === true ? (
          <div className="catalogue__top-links">
            <Link to="/book/register" className="catalogue__add-button">
              <FontAwesomeIcon icon={faPlus} />
              Añadir libro
            </Link>
            <Link to="/book/import">Importar catálogo</Link>
          </div>
        ) : (
          <div className="catalogue__top-links">
            <p>
              No puedes añadir más títulos a tu catálogo. Para hacerlo,{' '}
              <Link to="/plans">actualiza tu plan.</Link>
            </p>
          </div>
        )}

        <section className="catalogue__books-container">
          {catalogue && Array.isArray(catalogue) && publisher
            ? catalogue.map((book) => (
              <BookCard
                key={book._id}
                title={book.title}
                cover={book.cover}
                bookId={book._id}
              />
            ))
            : null}
        </section>
      </main>
    </div>
  );
};

export default CataloguePage;
