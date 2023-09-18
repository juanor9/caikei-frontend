import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import getLibrariesByPublisher from '../../../libraries/services/allLibraries';
import { getPublisherById } from '../../../publishers/services/publishers';

const RegisterRemisionForm = ({ from, to }) => {
  const dispatch = useDispatch();
  const { publisher } = useSelector((state) => state.user.userData);
  const userToken = localStorage.getItem('login-token');

  // get all storages
  useEffect(() => {
    if (publisher) {
      try {
        dispatch(getLibrariesByPublisher({ publisher, userToken }));
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
  const [selectedFrom, setSelectedFrom] = useState({
    value: publisherData._id,
    label: publisherData.name,
  });
  const handleChangeFrom = (selected) => {
    setSelectedFrom(selected);
  };
  //----------------------------------------------

  // TO
  const [selectedTo, setSelectedTo] = useState(null);
  const handleChangeTo = (selected) => {
    setSelectedTo(selected);
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
    if (!selectedTo) {
      return;
    }
    const fromValue = selectedFrom.value;
    const toValue = selectedTo.value;
    from(fromValue);
    to(toValue);
  }, [selectedFrom, selectedTo]);
  //

  return (
    <>
      <div>
        <p>Desde</p>
        <Select
          id="from"
          options={storagesSelect}
          isSearchable
          isClearable
          required
          defaultValue={{
            value: publisherData._id,
            label: publisherData.name,
          }}
          onChange={handleChangeFrom}
        />
      </div>
      <div>
        <p>Hacia</p>
        <Select
          id="to"
          options={storagesSelect}
          isSearchable
          isClearable
          required
          onChange={handleChangeTo}
        />
      </div>

    </>
  );
};

RegisterRemisionForm.propTypes = {
  from: PropTypes.func.isRequired,
  to: PropTypes.func.isRequired,
};

export default RegisterRemisionForm;
