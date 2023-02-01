/* eslint-disable no-unused-vars */
import './Catalogue.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../feature/users/services/users';
import { getBooksByFilter } from '../../feature/books/services/books';
import TopNav from '../../components/TopNav/TopNav';
import BookCard from '../../feature/books/components/BookCard/BookCard';

const CataloguePage = () => {
  const userToken = localStorage.getItem('login-token');
  const dispatch = useDispatch();

  const { publisher } = useSelector((state) => state.user.userData);
  const { catalogue } = useSelector((state) => state.catalogue);

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
        dispatch(getBooksByFilter(publisher));
      } catch (error) {
        throw new Error(error);
      }
    }
  }, [publisher]);
  return (
    <div className="user-profile">
      <TopNav />
      <main className="user-profile__main-container">
        <h2>Catálogo</h2>
        <section>
          {catalogue.map((book) => (
            <BookCard
              key={book._id}
              title={book.title}
              cover={book.cover}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default CataloguePage;
