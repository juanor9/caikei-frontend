import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import getLibrariesByPublisher from '../../../libraries/services/allLibraries';
import { getPublisherById } from '../../../publishers/services/publishers';
import { getLibrariesById } from '../../../libraries/services/libraries';

const RegisterSaleForm = ({
  setFrom,
  salesDiscount,
  setSalesDiscount,
  remisionFrom,
  userToken,
}) => {
  const dispatch = useDispatch();
  const { publisher } = useSelector((state) => state.user.userData);
  const { allLibraries } = useSelector((state) => state.allLibraries);
  const { library } = useSelector((state) => state.library);
  const publisherData = useSelector((state) => state.publisher.publisher);

  useEffect(() => {
    if (publisher) {
      dispatch(getLibrariesByPublisher({ publisher, userToken }));
      dispatch(getPublisherById({ publisher, userToken }));
    }
  }, [publisher, userToken, dispatch]);

  const storages = useMemo(
    () => (Array.isArray(allLibraries)
      ? [...allLibraries, publisherData].filter(Boolean)
      : [publisherData].filter(Boolean)),
    [allLibraries, publisherData],
  );

  const storagesSelect = useMemo(() => storages.map((storage) => ({
    value: storage._id,
    label: storage.name,
  })), [storages]);

  const [selectedFrom, setSelectedFrom] = useState(() => {
    const defaultStorage = storages.find((storage) => storage._id === remisionFrom);
    return defaultStorage ? { value: defaultStorage._id, label: defaultStorage.name } : null;
  });

  useEffect(() => {
    if (selectedFrom) {
      setFrom(selectedFrom.value);
    }
  }, [selectedFrom, setFrom]);

  useEffect(() => {
    if (remisionFrom) {
      dispatch(getLibrariesById({ id: remisionFrom, userToken }));
    }
  }, [remisionFrom, userToken, dispatch]);

  useEffect(() => {
    if (library && publisher) {
      const publisherInfo = library.publishers?.find((pub) => pub.publisherId === publisher);
      if (publisherInfo) {
        setSalesDiscount(publisherInfo.discount || 0);
      }
    }
  }, [library, publisher, setSalesDiscount]);

  const handleChangeFrom = (selected) => setSelectedFrom(selected);
  const handleChangeSalesDiscount = ({ target: { value } }) => setSalesDiscount(Number(value));

  return (
    <>
      <div>
        <p>Desde</p>
        <Select
          id="from"
          options={storagesSelect}
          isSearchable
          isClearable
          value={selectedFrom}
          onChange={handleChangeFrom}
        />
      </div>
      <label htmlFor="discount" className="movement-form__label">
        Descuento
        <input
          type="number"
          name="discount"
          id="discount"
          value={salesDiscount || ''}
          onChange={handleChangeSalesDiscount}
          className="movement-form__input"
        />
      </label>
    </>
  );
};

RegisterSaleForm.propTypes = {
  setFrom: PropTypes.func.isRequired,
  salesDiscount: PropTypes.number,
  setSalesDiscount: PropTypes.func.isRequired,
  remisionFrom: PropTypes.string,
  userToken: PropTypes.string.isRequired,
};
RegisterSaleForm.defaultProps = {
  salesDiscount: 0,
  remisionFrom: '',
};

export default RegisterSaleForm;
