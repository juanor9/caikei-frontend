import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooksByPublisher } from '../../../books/services/books';
import getLibrariesByPublisher from '../../../libraries/services/allLibraries';
import './InventoryByLibrary.scss';

const InventoryByLibrary = () => {
  const [fullInventory, setFullInventory] = useState([]);
  const { allLibraries } = useSelector((state) => state.allLibraries);
  const { catalogue } = useSelector((state) => state.catalogue);
  const { publisher } = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const publisherData = useSelector((state) => state.publisher.publisher);
  const userToken = localStorage.getItem('login-token');

  useEffect(() => {
    dispatch(getBooksByPublisher({ publisher, userToken }));
  }, [publisher, userToken]);

  useEffect(() => {
    if (publisher) {
      dispatch(getLibrariesByPublisher({ publisher, userToken }));
    }
  }, [publisher, userToken]);

  useEffect(() => {
    if (Array.isArray(allLibraries)) {
      const finalObject = allLibraries.map(({ _id, name }) => {
        if (!catalogue || !Array.isArray(catalogue)) {
          return null;
        }
        const books = catalogue.map(({ inventory, ...book }) => {
          let copies = 0;
          if (!inventory || !Array.isArray(inventory)) {
            return null;
          }
          const libraryInventory = inventory.findIndex(
            (library) => String(library.placeId) === String(_id),
          );
          if (libraryInventory >= 0) {
            copies = inventory[libraryInventory].copies;
          }
          return ({
            id: book._id,
            title: book.title,
            cover: book.cover,
            copies,
          });
        });
        return ({ id: _id, name, books });
      });
      const pub = { id: publisherData._id, name: publisherData.name };
      if (catalogue && Array.isArray(catalogue)) {
        const pubBooks = catalogue.map(({ inventory, ...book }) => {
          let copies = 0;
          if (!inventory || !Array.isArray(inventory)) {
            return null;
          }
          const libraryInventory = inventory.findIndex(
            (library) => String(library.placeId) === String(publisherData._id),
          );
          if (libraryInventory >= 0) {
            copies = inventory[libraryInventory].copies;
          }
          return ({
            id: book._id,
            title: book.title,
            cover: book.cover,
            copies,
          });
        });
        pub.books = pubBooks;
        finalObject.unshift(pub);
      }
      setFullInventory(finalObject);
    }
  }, [allLibraries, catalogue, publisherData]);

  return (
    <section className="by-library">
      <h3>Por librería</h3>
      <section className="by-library__book-container">
        {fullInventory && Array.isArray(fullInventory)
          ? fullInventory.map((library) => (
            <article key={library.id}>
              <h4>{library.name}</h4>
              {library.books && Array.isArray(library.books) && (
              <table className="by-library__table-inventory">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Ejemplares</th>
                  </tr>
                </thead>
                {library.books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.copies}</td>
                  </tr>
                ))}
              </table>
              )}
            </article>
          ))
          : null}
      </section>
    </section>
  );
};
export default InventoryByLibrary;
