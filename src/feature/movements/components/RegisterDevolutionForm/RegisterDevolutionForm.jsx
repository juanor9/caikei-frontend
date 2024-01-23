import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import getLibrariesByPublisher from '../../../libraries/services/allLibraries';
import { getPublisherById } from '../../../publishers/services/publishers';

const RegisterDevolutionForm = ({ from, to }) => {
  const dispatch = useDispatch();
  const { publisher } = useSelector((state) => state.user.userData);

  const [storages, setStorages] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);

  useEffect(() => {
    if (publisher) {
      const userToken = localStorage.getItem('login-token');
      try {
        dispatch(getLibrariesByPublisher({ publisher, userToken }));
        dispatch(getPublisherById({ publisher, userToken }));
      } catch (error) {
        throw new Error(error);
      }
    }
  }, [publisher, dispatch]);

  const allLibraries = useSelector((state) => state.allLibraries.allLibraries);
  const publisherData = useSelector((state) => state.publisher.publisher);

  useEffect(() => {
    if (Array.isArray(allLibraries) && publisherData) {
      setStorages([...allLibraries, publisherData]);
      setSelectedTo({
        value: publisherData._id,
        label: publisherData.name,
      });
    }
  }, [allLibraries, publisherData]);

  const storagesSelect = storages.map((storage) => ({
    value: storage._id,
    label: storage.name,
  }));

  useEffect(() => {
    if (selectedFrom && selectedTo) {
      from(selectedFrom.value);
      to(selectedTo.value);
    }
  }, [selectedFrom, selectedTo, from, to]);

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
          onChange={setSelectedFrom}
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
          onChange={setSelectedTo}
          value={selectedTo}
        />
      </div>
    </>
  );
};

RegisterDevolutionForm.propTypes = {
  from: PropTypes.func.isRequired,
  to: PropTypes.func.isRequired,
};

export default RegisterDevolutionForm;
