/* eslint-disable react/prop-types */
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMovementsByPublisher } from '../../../../services/movements';

const InternalId = ({ setId, internalId }) => {
  const { movement, publisher } = useSelector((state) => ({
    movement: state.movements.movement,
    publisher: state.user.userData.publisher,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (publisher) {
      dispatch(getMovementsByPublisher(publisher));
    }
  }, [publisher, dispatch]);

  const handleInternalIdChange = useCallback(({ target: { value } }) => {
    setId(value);
  }, [setId]);

  useEffect(() => {
    const numberOfMovements = Array.isArray(movement) ? movement.length : 0;
    if (numberOfMovements > 0) {
      setId(numberOfMovements + 1);
    }
  }, [movement]);

  return (
    <label htmlFor="internalId" className="movement-form__label">
      Número de referencia
      <input
        type="number"
        name="internalId"
        id="internalId"
        required
        defaultValue={internalId}
        onChange={handleInternalIdChange}
        className="movement-form__input"
      />
    </label>
  );
};

export default InternalId;
