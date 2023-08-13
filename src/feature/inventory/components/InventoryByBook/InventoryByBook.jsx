import './InventoryByBook.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooksByPublisher } from '../../../books/services/books';
import getLibrariesByPublisher from '../../../libraries/services/allLibraries';

const InventoryByBook = () => {
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
      <div className="by-book__book-container">
        {fullInventory && Array.isArray(fullInventory)
          ? fullInventory.map((book) => (
            <article key={book._id} className="by-book__book">
              <figure className="by-book__book-fig">
                <img src={book.cover} alt={book.title} className="by-book__book-img" />
                <h4>{book.title}</h4>
              </figure>
              {book.$inventory && Array.isArray(book.$inventory) && (
                <table className="by-book__table-inventory">
                  <thead>
                    <tr>
                      <th>Bodega</th>
                      <th>Ejemplares</th>
                    </tr>
                  </thead>

                  {book.$inventory.map((storage) => (
                    <tr key={storage.id}>
                      <td>{storage.name}</td>
                      <td>{storage.copies}</td>
                    </tr>
                  ))}
                </table>
              )}
            </article>
          ))
          : null}
      </div>
    </section>
  );
};
export default InventoryByBook;
