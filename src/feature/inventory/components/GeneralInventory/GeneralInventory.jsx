import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InventoryByBook from '../InventoryByBook/InventoryByBook';
import InventoryByLibrary from '../InventoryByLibrary/InventoryByLibrary';
import './GeneralInventory.scss';

const GeneralInventory = () => {
  const [by, setby] = useState('library');

  const handleClick = (event) => {
    setby(event.target.name);
  };

  useEffect(() => {
    if (by === 'library') {
      const button = document.getElementById('byLibrary');
      button.classList.remove('inventory__toggle-button-left');
      button.classList.add('inventory__toggle-button-left--active');

      const otherButton = document.getElementById('byBook');
      otherButton.classList.remove('inventory__toggle-button-right--active');
      otherButton.classList.add('inventory__toggle-button-right');
    }
    if (by === 'book') {
      const button = document.getElementById('byBook');
      button.classList.remove('inventory__toggle-button-right');
      button.classList.add('inventory__toggle-button-right--active');

      const otherButton = document.getElementById('byLibrary');
      otherButton.classList.remove('inventory__toggle-button-left--active');
      otherButton.classList.add('inventory__toggle-button-left');
    }
  }, [by]);

  return (
    <>
      <h2>Inventario</h2>
      <div>
        <div>
          <button
            id="byLibrary"
            type="button"
            name="library"
            onClick={handleClick}
            className="inventory__toggle-button-left"
          >
            Por librería
          </button>
          <button
            id="byBook"
            type="button"
            name="book"
            onClick={handleClick}
            className="inventory__toggle-button-right"
          >
            Por libro
          </button>
        </div>
        <Link to="/movement/import"> Importar inventario</Link>
      </div>

      {by === 'book'
        ? <InventoryByBook />
        : null}
      {by === 'library'
        ? <InventoryByLibrary />
        : null}
    </>
  );
};
export default GeneralInventory;
