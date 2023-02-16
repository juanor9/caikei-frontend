/* eslint-disable no-unused-vars */
import { useState } from 'react';

const InventoryByLibrary = () => {
  const [by, setby] = useState(null);

  const handleClick = (event) => {
    setby(event.target.name);
  };

  return (
    <h3>Por librería</h3>
  );
};
export default InventoryByLibrary;
