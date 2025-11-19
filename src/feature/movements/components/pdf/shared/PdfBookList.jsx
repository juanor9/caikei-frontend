/**
 * PdfBookList Component
 * Shared book list component for all PDF documents
 * Applies SRP and DRY
 */
import PropTypes from 'prop-types';
import { View, Text } from '@react-pdf/renderer';
import { sharedStyles, formatPdfCurrency } from './pdfStyles';

const PdfBookList = ({
  books,
  showDiscount,
  copiesTotal,
  fullTotal,
  grossTotal,
}) => {
  // Determine which columns to show based on document type
  const showPricing = showDiscount !== undefined;

  return (
    <>
      {/* Header */}
      <View style={sharedStyles.bookListHeader}>
        <Text style={sharedStyles.bookTitle}>Titulo</Text>
        <Text style={sharedStyles.bookIsbn}>ISBN</Text>
        <Text style={sharedStyles.bookItems}>Cantidad</Text>
        {showPricing && (
          <>
            <Text style={sharedStyles.bookItems}>PVP</Text>
            <Text style={sharedStyles.bookItems}>Subtotal</Text>
            <Text style={sharedStyles.bookItems}>Descuento</Text>
            <Text style={sharedStyles.bookItems}>Total</Text>
          </>
        )}
      </View>

      {/* Book rows */}
      {books && Array.isArray(books)
        ? books.map((book) => (
          <View key={book.id} style={sharedStyles.bookList}>
            <Text style={sharedStyles.bookTitle}>{book.title}</Text>
            <Text style={sharedStyles.bookIsbn}>{book.isbn}</Text>
            <Text style={sharedStyles.bookItems}>{book.copies}</Text>
            {showPricing && (
              <>
                <Text style={sharedStyles.bookItems}>
                  {formatPdfCurrency(book.pvp)}
                </Text>
                <Text style={sharedStyles.bookItems}>
                  {formatPdfCurrency(book.subTotal)}
                </Text>
                <Text style={sharedStyles.bookItems}>
                  {formatPdfCurrency(book.dicAmount)}
                </Text>
                <Text style={sharedStyles.bookItems}>
                  {formatPdfCurrency(book.total)}
                </Text>
              </>
            )}
          </View>
        ))
        : null}

      {/* Totals row */}
      <View style={sharedStyles.bookListTotal}>
        <Text style={sharedStyles.bookTitle}>TOTAL</Text>
        <Text style={sharedStyles.bookIsbn} />
        <Text style={sharedStyles.bookItems}>{copiesTotal}</Text>
        {showPricing ? (
          <>
            <Text style={sharedStyles.bookItems} />
            <Text style={sharedStyles.bookItems} />
            <Text style={sharedStyles.bookItems} />
            <Text style={sharedStyles.bookItems}>
              {formatPdfCurrency(fullTotal)}
            </Text>
          </>
        ) : (
          grossTotal && (
            <Text style={sharedStyles.bookItems}>
              {formatPdfCurrency(grossTotal)}
            </Text>
          )
        )}
      </View>
    </>
  );
};

PdfBookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      isbn: PropTypes.number,
      copies: PropTypes.number,
      pvp: PropTypes.number,
      subTotal: PropTypes.number,
      dicAmount: PropTypes.number,
      total: PropTypes.number,
    }),
  ).isRequired,
  showDiscount: PropTypes.number,
  copiesTotal: PropTypes.number.isRequired,
  fullTotal: PropTypes.number,
  grossTotal: PropTypes.number,
};

PdfBookList.defaultProps = {
  showDiscount: undefined,
  fullTotal: 0,
  grossTotal: 0,
};

export default PdfBookList;
