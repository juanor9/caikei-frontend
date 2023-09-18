import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import getLibrariesByPublisher from '../../../libraries/services/allLibraries';
import { getPublisherById } from '../../../publishers/services/publishers';

const RegisterSaleForm = ({ from }) => {
  const dispatch = useDispatch();
  const { publisher } = useSelector((state) => state.user.userData);
  const userToken = localStorage.getItem('login-token');

  // get all storages
  useEffect(() => {
    if (publisher) {
      try {
        dispatch(getLibrariesByPublisher(publisher));
        dispatch(getPublisherById({ publisher, userToken }));
      } catch (error) {
        throw new Error(error);
      }
    }
  }, [publisher]);
  const { allLibraries } = useSelector((state) => state.allLibraries);
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
    if (Array.isArray(allLibraries)) {
      setStorages([...allLibraries, publisherData]);
    }
  }, [allLibraries, publisherData]);
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
    <div><p>Desde</p>
      <Select
        id="from"
        options={storagesSelect}
        isSearchable
        isClearable
        required
        onChange={handleChangeFrom}
      />
    </div>

  );
};

RegisterSaleForm.propTypes = {
  from: PropTypes.func.isRequired,
};

export default RegisterSaleForm;
