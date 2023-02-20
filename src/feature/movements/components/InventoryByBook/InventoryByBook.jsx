/* eslint-disable no-unused-vars */
import './InventoryByBook.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooksByFilter } from '../../../books/services/books';
import getLibrariesByPublisher from '../../../libraries/services/allLibraries';

const InventoryByBook = () => {
  const dispatch = useDispatch();
  const { publisher } = useSelector((state) => state.user.userData);
  const { catalogue } = useSelector((state) => state.catalogue);
  const { allLibraries } = useSelector((state) => state.allLibraries);
  const publisherData = useSelector((state) => state.publisher.publisher);

  const userToken = localStorage.getItem('login-token');

  const [fullInventory, setFullInventory] = useState([]);

  useEffect(() => {
    dispatch(getBooksByFilter({ publisher, userToken }));
  }, [publisher, userToken]);

  useEffect(() => {
    if (publisher) {
      dispatch(getLibrariesByPublisher({ publisher, userToken }));
    }
  }, [publisher, userToken]);

  useEffect(() => {
    const finalObject = catalogue.map(({
      cover, inventory, title, _id,
    }) => {
      const bookInventory = inventory.map((place) => { // array de lugares con el libro
        if (place.placeId === publisherData._id) {
          const $library = { name: publisherData.name, copies: place.copies };
          return $library;
        }
        // console.log('all libraries: ', allLibraries);
        const $allLibraries = allLibraries.map((library) => (
          { name: library.name, id: library._id }
        ));
        console.log(`place: ${place._id}, libraries:`, $allLibraries);
        return ({ name: place._id, copies: place.copies });
      });
      return ({
        cover, bookInventory, title, _id,
      });
    });
    // console.log(finalObject);
  }, [catalogue, allLibraries]);
  return (
    <section className="by-book">
      <h3>Por libros</h3>

      {catalogue && Array.isArray(catalogue)
        ? catalogue.map((book) => (
          <article key={book._id}>
            <figure className="by-book__book-fig">
              <img src={book.cover} alt={book.title} className="by-book__book-img" />
              <figcaption>{book.title}</figcaption>
            </figure>
            <div>
              {book.inventory && Array.isArray(book.inventory)
                ? book.inventory.map((library) => (
                  <>
                    <p><b>Librería 1</b></p>
                    <p>Ejemplares: {library.copies}</p>
                  </>
                ))
                : null}

            </div>
            <hr />
          </article>
        ))
        : null}

    </section>
  );
};
export default InventoryByBook;
