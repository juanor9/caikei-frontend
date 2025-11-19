/**
 * MovementCard Component - Refactored
 * Applies SRP (Single Responsibility Principle)
 * Applies OCP (Open/Closed Principle) - uses configuration for PDF types
 */
import './MovementCard.scss';
import { useDispatch } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { getBookById } from '../../../books/services/books';
import EntryPdf from '../pdf/EntryPdf/EntryPdf';
import RemisionPdf from '../pdf/RemissionPdf/RemisionPdf';
import DevolutionPdf from '../pdf/DevolutionPdf/DevolutionPdf';
import SalePdf from '../pdf/SalePdf/SalePdf';
import { deleteMovementById } from '../../services/movements';
import PdfDownloadButton from '../../../../components/PdfDownloadButton';
import useInitializeUser from '../../../../hooks/useInitializeUser';
import useCurrency from '../../../../hooks/useCurrency';
import useDate from '../../../../hooks/useDate';

// PDF component configuration - OCP: easy to add new movement types
const PDF_COMPONENTS = {
  ingreso: EntryPdf,
  remision: RemisionPdf,
  devolucion: DevolutionPdf,
  liquidacion: SalePdf,
};

const MovementCard = ({
  id,
  date,
  kind,
  from,
  to,
  grossTotal,
  netTotal,
  books,
  movementId,
  deletedFunc,
}) => {
  const dispatch = useDispatch();
  const formatCurrency = useCurrency();
  const { formatDate } = useDate();

  const {
    userToken,
    publisher,
    publisherData,
    allLibraries,
  } = useInitializeUser();

  const [toData, setToData] = useState({});
  const [fromData, setFromData] = useState({});
  const [discount, setDiscount] = useState(0);
  const [movementBookData, setMovementBookData] = useState([]);

  // Format currency values
  const currencyTotal = useMemo(() => {
    const total = netTotal || grossTotal;
    return formatCurrency(total);
  }, [netTotal, grossTotal, formatCurrency]);

  // Format date
  const formattedDate = useMemo(() => formatDate(date), [date, formatDate]);

  // Get place names and data
  const { toName, fromName } = useMemo(() => {
    let toNameResult = '';
    let fromNameResult = '';

    if (String(to) === String(publisher)) {
      toNameResult = publisherData.name || '';
    }

    if (String(from) === String(publisher)) {
      fromNameResult = publisherData.name || '';
    }

    if (allLibraries && Array.isArray(allLibraries)) {
      const toLibrary = allLibraries.find((lib) => String(to) === String(lib._id));
      const fromLibrary = allLibraries.find((lib) => String(from) === String(lib._id));

      if (toLibrary) {
        toNameResult = toLibrary.name;
        setToData(toLibrary);
        const pubInLibrary = toLibrary.publishers?.find(
          (pub) => pub.publisherId === publisher,
        );
        if (pubInLibrary) setDiscount(pubInLibrary.discount);
      }

      if (fromLibrary) {
        fromNameResult = fromLibrary.name;
        setFromData(fromLibrary);
        const pubInLibrary = fromLibrary.publishers?.find(
          (pub) => pub.publisherId === publisher,
        );
        if (pubInLibrary) setDiscount(pubInLibrary.discount);
      }
    }

    return { toName: toNameResult, fromName: fromNameResult };
  }, [publisher, publisherData.name, allLibraries, to, from]);

  // Get grey logo
  const greyLogo = useMemo(() => {
    if (!publisherData.logo) return '';
    return publisherData.logo.replace('/upload', '/upload/c_scale,e_grayscale,w_200');
  }, [publisherData.logo]);

  // Get publisher ID
  const publisherId = useMemo(() => {
    const pubIds = publisherData.publisherIds;
    if (!pubIds || !Array.isArray(pubIds) || pubIds.length === 0) return {};
    return pubIds[pubIds.length - 1];
  }, [publisherData.publisherIds]);

  // Fetch book data
  useEffect(() => {
    const fetchBookData = async () => {
      const booksData = await Promise.all(
        books.map(async (book) => {
          const result = await dispatch(getBookById({ id: book.id, userToken }));
          const bookDBData = result.payload;
          const subTotal = book.copies * bookDBData.price;
          const discountPercentage = discount / 100;
          const discountAmount = bookDBData.price * discountPercentage * book.copies;
          const total = subTotal - discountAmount;

          return {
            id: book.id,
            copies: book.copies,
            title: bookDBData.title,
            isbn: bookDBData.isbn,
            pvp: bookDBData.price,
            subTotal,
            dicAmount: discountAmount,
            total,
          };
        }),
      );
      setMovementBookData(booksData);
    };

    if (books.length > 0 && userToken) {
      fetchBookData();
    }
  }, [books, discount, userToken, dispatch]);

  // Calculate totals
  const { copiesTotal, fullTotal } = useMemo(() => ({
    copiesTotal: movementBookData.reduce((acc, book) => acc + book.copies, 0),
    fullTotal: movementBookData.reduce((acc, book) => acc + book.total, 0),
  }), [movementBookData]);

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      await dispatch(deleteMovementById({ id: movementId }));
      toast.success(`El movimiento con numero ${id} fue exitosamente eliminado`);
      deletedFunc(true);
    } catch (error) {
      toast.error(`Hubo un error al eliminar el movimiento con numero ${id}`);
      throw new Error(error);
    }
  };

  // Normalize kind for PDF component lookup
  const normalizedKind = kind.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const PdfComponent = PDF_COMPONENTS[normalizedKind];

  // Common PDF props
  const basePdfProps = {
    publisher: publisherData,
    logo: greyLogo,
    kind,
    pubId: publisherId,
    internalId: id,
    date: formattedDate,
    books: movementBookData,
  };

  // Render PDF button based on movement type
  const renderPdfButton = () => {
    if (!greyLogo || !publisherId || !PdfComponent) return null;

    const pdfProps = normalizedKind === 'ingreso'
      ? { ...basePdfProps, total: grossTotal }
      : {
        ...basePdfProps,
        destination: normalizedKind === 'remision' ? toData : fromData,
        discount,
        copiesTotal,
        fullTotal,
      };

    return (
      <PdfDownloadButton
        // eslint-disable-next-line react/jsx-props-no-spreading
        document={<PdfComponent {...pdfProps} />}
        filename={`${kind}-${id}.pdf`}
      />
    );
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{formattedDate}</td>
      <td>{kind}</td>
      <td className="movements__cell--not-mobile">{fromName}</td>
      <td className="movements__cell--not-mobile">{toName}</td>
      <td className="movements__cell--not-mobile">{currencyTotal}</td>
      <td>{renderPdfButton()}</td>
      <td>
        <button type="button" onClick={handleDelete} aria-label="Eliminar movimiento">
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </td>
    </tr>
  );
};

MovementCard.propTypes = {
  from: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  kind: PropTypes.string.isRequired,
  grossTotal: PropTypes.number.isRequired,
  netTotal: PropTypes.number,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      copies: PropTypes.number,
    }),
  ).isRequired,
  movementId: PropTypes.string.isRequired,
  deletedFunc: PropTypes.func.isRequired,
};

MovementCard.defaultProps = {
  netTotal: undefined,
};

export default MovementCard;
