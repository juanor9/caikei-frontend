/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import './MovementCard.scss';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { faSpinner, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getPublisherById } from '../../../publishers/services/publishers';
import getLibrariesByPublisher from '../../../libraries/services/allLibraries';
import EntryPdf from '../pdf/EntryPdf/EntryPdf';
import { getBookById } from '../../../books/services/books';

const MovementCard = ({
  id,
  date,
  kind,
  from,
  to,
  grossTotal,
  netTotal,
  dbid,
  books,
}) => {
  const dispatch = useDispatch();
  const { publisher } = useSelector((state) => state.user.userData);
  const { allLibraries } = useSelector((state) => state.allLibraries);
  const publisherName = useSelector((state) => state.publisher.publisher.name);
  const publisherData = useSelector((state) => state.publisher.publisher);
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
    year: 'numeric',
    month: 'long',
    day: 'numeric',
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
  const { logo } = publisherData;
  const [greyLogo, setGreyLogo] = useState('');

  useEffect(() => {
    if (logo !== undefined) {
      const grey = logo.replace('/upload', '/upload/c_scale,e_grayscale,w_200');
      setGreyLogo(grey);
    }
  }, [logo]);

  const [publisherId, setPublisherId] = useState({});
  useEffect(() => {
    if (publisherData !== undefined) {
      const pubids = publisherData.publisherIds;
      let index;
      if (pubids && Array.isArray(pubids)) {
        index = pubids.length - 1;
      }
      let pubid;
      if (index >= 0) {
        pubid = pubids[index];
      }
      setPublisherId(pubid);
    }
  }, [publisherData]);

  const [movementBookData, setMovementBookData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const booksData = await Promise.all(
        books.map(async (book) => {
          const fetchBookDBdata = await dispatch(getBookById({ id: book.id, userToken }));
          const bookDBdata = fetchBookDBdata.payload;
          return ({
            id: book.id,
            copies: book.copies,
            title: bookDBdata.title,
            isbn: bookDBdata.isbn,
            pvp: bookDBdata.price,
          });
        }),
      );
      setMovementBookData(booksData);
    };
    fetchData();
  }, [books]);
  return (
    <tr>
      <td>{id}</td>
      <td>{dateN}</td>
      <td>{kind}</td>
      <td className="movements__cell--not-mobile">{fromName}</td>
      <td className="movements__cell--not-mobile">{toName}</td>
      {netTotal ? (
        <td className="movements__cell--not-mobile">{netTotal}</td>
      ) : (
        <td className="movements__cell--not-mobile">{grossTotal}</td>
      )}
      <td>
        {greyLogo && publisherId && kind === 'ingreso' ? (
          <PDFDownloadLink
            document={(
              <EntryPdf
                publisher={publisherData}
                logo={greyLogo}
                kind={kind}
                pubId={publisherId}
                internalId={id}
                date={dateN}
                books={movementBookData}
                total={grossTotal}
              />
            )}
            filename="FORM"
          >
            {({ loading }) => (loading ? (
              <button type="button" aria-label="loading">
                <FontAwesomeIcon icon={faSpinner} spin />
              </button>
            ) : (
              <button type="button" aria-label="download">
                <FontAwesomeIcon icon={faFileArrowDown} />
              </button>
            ))}
          </PDFDownloadLink>
        ) : null}
      </td>
    </tr>
  );
};
export default MovementCard;
