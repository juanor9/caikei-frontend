/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLibrariesByPublisher } from '../../../libraries/services/libraries';
import { getPublisherById } from '../../../publishers/services/publishers';

const RegisterSaleForm = ({ from }) => {
  const dispatch = useDispatch();
  const { publisher } = useSelector((state) => state.user.userData);

  // get all storages
  useEffect(() => {
    if (publisher) {
      try {
        dispatch(getLibrariesByPublisher(publisher));
        dispatch(getPublisherById(publisher));
      } catch (error) {
        throw new Error(error);
      }
    }
  }, [publisher]);
  const { library } = useSelector((state) => state.library);
  const publisherData = useSelector((state) => state.publisher.publisher);
  const [storages, setStorages] = useState([]);
  const [storagesSelect, setStoragesSelect] = useState([]);
  // FROM
  const [selectedFrom, setSelectedFrom] = useState(null);
  const handleChangeFrom = (selected) => {
    setSelectedFrom(selected);
  };
  //----------------------------------------------

  // Get all storages, publisher included
  useEffect(() => {
    if (Array.isArray(library)) {
      setStorages([...library, publisherData]);
    }
  }, [library, publisherData]);
  useEffect(() => {
    setStoragesSelect(storages.map((storage) => ({
      value: storage._id,
      label: storage.name,
    })));
  }, [storages]);

  // Send values to main form
  useEffect(() => {
    if (!selectedFrom) {
      return;
    }
    const fromValue = selectedFrom.value;
    from(fromValue);
  }, [selectedFrom]);
  //

  return (
    <>
      <p>Desde</p>
      <Select
        id="from"
        options={storagesSelect}
        isSearchable
        isClearable
        onChange={handleChangeFrom}
      />
    </>
  );
};

export default RegisterSaleForm;
