/**
 * PdfDownloadButton Component
 * Applies SRP (Single Responsibility Principle)
 * Applies DRY - eliminates duplicated PDF download code
 */
import PropTypes from "prop-types";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Loader2, FileDown } from "lucide-react";
import "./PdfDownloadButton.scss";

const PdfDownloadButton = ({ document, filename }) => (
  <PDFDownloadLink document={document} filename={filename}>
    {({ loading }) =>
      loading ? (
        <button
          type="button"
          aria-label="Generando PDF"
          className="pdf-download__loading"
        >
          <Loader2 size={20} className="animate-spin" />
        </button>
      ) : (
        <button
          type="button"
          aria-label="Descargar PDF"
          className="pdf-download__button"
        >
          <FileDown size={20} />
        </button>
      )
    }
  </PDFDownloadLink>
);

PdfDownloadButton.propTypes = {
  document: PropTypes.node.isRequired,
  filename: PropTypes.string,
};

PdfDownloadButton.defaultProps = {
  filename: "document.pdf",
};

export default PdfDownloadButton;
