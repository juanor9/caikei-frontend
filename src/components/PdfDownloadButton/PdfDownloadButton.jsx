/**
 * PdfDownloadButton Component
 * Applies SRP (Single Responsibility Principle)
 * Applies DRY - eliminates duplicated PDF download code
 */
import PropTypes from 'prop-types';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { faSpinner, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PdfDownloadButton.scss';

const PdfDownloadButton = ({ document, filename }) => (
  <PDFDownloadLink document={document} filename={filename}>
    {({ loading }) => (
      loading ? (
        <button
          type="button"
          aria-label="loading"
          className="pdf-download__loading"
        >
          <FontAwesomeIcon icon={faSpinner} spin />
        </button>
      ) : (
        <button
          type="button"
          aria-label="download"
          className="pdf-download__button"
        >
          <FontAwesomeIcon icon={faFileArrowDown} />
        </button>
      )
    )}
  </PDFDownloadLink>
);

PdfDownloadButton.propTypes = {
  document: PropTypes.node.isRequired,
  filename: PropTypes.string,
};

PdfDownloadButton.defaultProps = {
  filename: 'document.pdf',
};

export default PdfDownloadButton;
