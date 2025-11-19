/**
 * EntryPdf Component - Refactored
 * Uses shared PDF styles and components
 * Applies DRY principle
 */
import PropTypes from 'prop-types';
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import { sharedStyles, formatPdfCurrency } from '../shared';

const EntryPdf = ({
  publisher,
  logo,
  pubId,
  internalId,
  date,
  books,
  total,
}) => {
  const copiesTotal = books.reduce((acc, book) => acc + book.copies, 0);

  return (
    <Document>
      <Page size="LETTER" style={sharedStyles.page}>
        <Text style={sharedStyles.date}>{date}</Text>

        <View style={sharedStyles.publisherData}>
          <View style={{ width: '10%' }}>
            <Image src={logo} style={sharedStyles.publisherLogo} />
          </View>
          <View>
            <Text>{publisher.name}</Text>
            <Text>{pubId.type}: {pubId.number}</Text>
            <Text>Direccion: {publisher.address}</Text>
            <Text>Telefono: {publisher.phone}</Text>
            <Text>Correo electronico: {publisher.email}</Text>
          </View>
        </View>

        <Text style={sharedStyles.header}>Ingreso de ejemplares</Text>
        <Text>Ingreso No. {internalId}</Text>

        <View style={sharedStyles.bookListHeader}>
          <Text style={sharedStyles.bookTitle}>Titulo</Text>
          <Text style={sharedStyles.bookIsbn}>ISBN</Text>
          <Text style={sharedStyles.bookItems}>Cantidad</Text>
        </View>

        {books && Array.isArray(books)
          ? books.map((book) => (
            <View key={book.id} style={sharedStyles.bookList}>
              <Text style={sharedStyles.bookTitle}>{book.title}</Text>
              <Text style={sharedStyles.bookIsbn}>{book.isbn}</Text>
              <Text style={sharedStyles.bookItems}>{book.copies}</Text>
            </View>
          ))
          : null}

        <View style={sharedStyles.bookListTotal}>
          <Text style={sharedStyles.bookTitle}>
            TOTAL: {formatPdfCurrency(total)}
          </Text>
          <Text style={sharedStyles.bookIsbn} />
          <Text style={sharedStyles.bookItems}>{copiesTotal}</Text>
        </View>

        <Text style={sharedStyles.credits}>Documento generado por Caikei</Text>
      </Page>
    </Document>
  );
};

EntryPdf.propTypes = {
  publisher: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  logo: PropTypes.string.isRequired,
  pubId: PropTypes.shape({
    type: PropTypes.string,
    number: PropTypes.string,
  }).isRequired,
  internalId: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      copies: PropTypes.number,
    }),
  ).isRequired,
  total: PropTypes.number.isRequired,
};

export default EntryPdf;
