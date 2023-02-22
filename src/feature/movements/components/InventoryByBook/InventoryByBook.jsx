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
    if (Array.isArray(allLibraries)) {
      const finalObject = catalogue.map(({
        cover, inventory, title, _id,
      }) => {
        if (!Array.isArray(inventory)) {
          return null;
        }
        const $inventory = inventory.map((place) => {
          let name = '';
          if (String(place.placeId) === String(publisherData._id)) {
            name = publisherData.name;
          }
          const findLibraryIndex = allLibraries.findIndex(
            (library) => String(library._id) === String(place.placeId),
          );
          if (findLibraryIndex >= 0) {
            name = allLibraries[findLibraryIndex].name;
          }
          return ({ id: place.placeId, name, copies: place.copies });
        });
        return ({
          _id, title, cover, $inventory,
        });
      });
      setFullInventory(finalObject);
    }
  }, [catalogue, allLibraries]);
  return (
    <section className="by-book">
      <h3>Por libros</h3>
      {/* {console.log(fullInventory)} */}
      {fullInventory && Array.isArray(fullInventory)
        ? fullInventory.map((book) => (
          <article key={book._id}>
            <figure className="by-book__book-fig">
              <img src={book.cover} alt={book.title} className="by-book__book-img" />
              <figcaption>{book.title}</figcaption>
            </figure>
            <div />
            {book.$inventory && Array.isArray(book.$inventory) && (
              <div>
                {book.$inventory.map((storage) => (
                  <div key={storage.id}>
                    <p><b>{storage.name}</b></p>
                    <p>Cantidad de ejemplares: {storage.copies}</p>
                  </div>
                ))}
              </div>
            )}
            <hr />
          </article>
        ))
        : null}

    </section>
  );
};
export default InventoryByBook;
