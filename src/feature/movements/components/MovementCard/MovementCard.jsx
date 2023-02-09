/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import './MovementCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import getLibrariesByPublisher from '../../../libraries/services/allLibraries';
import { getPublisherById } from '../../../publishers/services/publishers';

const MovementCard = ({
  id,
  date,
  kind,
  from,
  to,
  grossTotal,
  netTotal,
}) => {
  const dispatch = useDispatch();
  const { publisher } = useSelector((state) => state.user.userData);
  const { allLibraries } = useSelector((state) => state.allLibraries);
  const publisherName = useSelector((state) => state.publisher.publisher.name);

  const [toName, setToName] = useState('');
  const [fromName, setFromName] = useState('');
  useEffect(() => {
    if (String(to) === String(publisher)) {
      setToName(publisher.name);
    }

    if (String(from) === String(publisher)) {
      setFromName(publisherName);
    }

    if (allLibraries && Array.isArray(allLibraries)) {
      allLibraries.map((library) => {
        if (String(to) === String(library._id)) {
          setToName(library.name);
        }
        if (String(from) === String(library._id)) {
          setFromName(library.name);
        }
        return library;
      });
    }
  }, [publisher, allLibraries]);

  const setDate = new Date(date);
  const dateOptions = {
    year: 'numeric', month: 'long', day: 'numeric',
  };
  const dateN = setDate.toLocaleDateString('es-ES', dateOptions);

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

  return (
    <tr>
      <td>{id}</td>
      <td>{dateN}</td>
      <td>{kind}</td>
      <td>{fromName}</td>
      <td>{toName}</td>
      {netTotal
        ? <td>{netTotal}</td>
        : <td>{grossTotal}</td>}
    </tr>
  );
};
export default MovementCard;
