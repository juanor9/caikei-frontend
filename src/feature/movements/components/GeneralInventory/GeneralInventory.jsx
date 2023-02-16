/* eslint-disable no-unused-vars */
import { useState } from 'react';
import InventoryByBook from '../InventoryByBook/InventoryByBook';
import InventoryByLibrary from '../InventoryByLibrary/InventoryByLibrary';

const GeneralInventory = () => {
  const [by, setby] = useState('library');

  const handleClick = (event) => {
    setby(event.target.name);
  };

  return (
    <>
      <h2>Inventario</h2>
      <div>
        <button type="button" name="library" onClick={handleClick}>Por librería</button>
        <button type="button" name="book" onClick={handleClick}>Por libro</button>
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
