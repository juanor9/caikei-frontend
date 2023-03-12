/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import './MovementCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import getLibrariesByPublisher from '../../../libraries/services/allLibraries';
import { getPublisherById } from '../../../publishers/services/publishers';
import MyDocument from '../MovementPdf/MovementPdf';

const MovementCard = ({
  id,
  date,
  kind,
  from,
  to,
  grossTotal,
  netTotal,
  dbid,
}) => {
  const dispatch = useDispatch();
  const { publisher } = useSelector((state) => state.user.userData);
  const { allLibraries } = useSelector((state) => state.allLibraries);
  const publisherName = useSelector((state) => state.publisher.publisher.name);
  const userToken = localStorage.getItem('login-token');

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
    if (publisher && userToken) {
      try {
        dispatch(getLibrariesByPublisher({ publisher, userToken }));
        dispatch(getPublisherById({ publisher, userToken }));
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
      <td className="movements__cell--not-mobile">{fromName}</td>
      <td className="movements__cell--not-mobile">{toName}</td>
      {netTotal
        ? <td className="movements__cell--not-mobile">{netTotal}</td>
        : <td className="movements__cell--not-mobile">{grossTotal}</td>}
      <td>
        <PDFDownloadLink document={<MyDocument data={dbid} />} filename="FORM">
          {({ loading }) => (loading
            ? <button type="button">Loading Document...</button>
            : <button type="button">Download</button>)}
        </PDFDownloadLink>
      </td>
    </tr>
  );
};
export default MovementCard;
