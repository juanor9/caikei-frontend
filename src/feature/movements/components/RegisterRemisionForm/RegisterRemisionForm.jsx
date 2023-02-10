/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getLibrariesByPublisher from '../../../libraries/services/allLibraries';
import { getPublisherById } from '../../../publishers/services/publishers';

const RegisterRemisionForm = ({ from, to }) => {
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
  const { allLibraries } = useSelector((state) => state.allLibraries);
  const publisherData = useSelector((state) => state.publisher.publisher);
  const [storages, setStorages] = useState([]);
  const [storagesSelect, setStoragesSelect] = useState([]);
  // FROM
  const [selectedFrom, setSelectedFrom] = useState({
    value: '63e0f2f8b7fbc17be761a93a',
    label: 'Tanuki',
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
          defaultValue={{
            value: '63e0f2f8b7fbc17be761a93a',
            label: 'Tanuki',
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
          onChange={handleChangeTo}
        />
      </div>

    </>
  );
};

export default RegisterRemisionForm;
