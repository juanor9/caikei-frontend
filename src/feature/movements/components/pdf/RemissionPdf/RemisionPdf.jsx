/**
 * RemisionPdf Component - Refactored
 * Uses shared PDF styles and components
 * Applies DRY principle
 */
import PropTypes from 'prop-types';
import {
  Page,
  Text,
  View,
  Document,
  Image,
} from '@react-pdf/renderer';
import { sharedStyles, formatPdfCurrency } from '../shared';

const RemisionPdf = ({
  publisher,
  logo,
  pubId,
  destination,
  internalId,
  date,
  books,
  discount,
  copiesTotal,
  fullTotal,
}) => (
  <Document>
    <Page size="LETTER" style={sharedStyles.page}>
      <Text style={sharedStyles.date}>{date}</Text>

      <View style={sharedStyles.generalData}>
        <View style={sharedStyles.publisherData}>
          <View style={sharedStyles.logoContainer}>
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
        <View>
          <Text style={sharedStyles.bold}>Destino:</Text>
          <Text>{destination.name}</Text>
          <Text>Direccion: {destination.address}, {destination.city}</Text>
          <Text>Telefono: {destination.phone}</Text>
          <Text>Correo electronico: {destination.email}</Text>
        </View>
      </View>

      <Text style={sharedStyles.header}>Remision de ejemplares</Text>
      <Text>Remision No. {internalId}</Text>
      <Text>Descuento: {discount}%</Text>

      <View style={sharedStyles.bookListHeader}>
        <Text style={sharedStyles.bookTitle}>Titulo</Text>
        <Text style={sharedStyles.bookIsbn}>ISBN</Text>
        <Text style={sharedStyles.bookItems}>Cantidad</Text>
        <Text style={sharedStyles.bookItems}>PVP</Text>
        <Text style={sharedStyles.bookItems}>Subtotal</Text>
        <Text style={sharedStyles.bookItems}>Descuento</Text>
        <Text style={sharedStyles.bookItems}>Total</Text>
      </View>

      {books && Array.isArray(books)
        ? books.map((book) => (
          <View key={book.id} style={sharedStyles.bookList}>
            <Text style={sharedStyles.bookTitle}>{book.title}</Text>
            <Text style={sharedStyles.bookIsbn}>{book.isbn}</Text>
            <Text style={sharedStyles.bookItems}>{book.copies}</Text>
            <Text style={sharedStyles.bookItems}>{formatPdfCurrency(book.pvp)}</Text>
            <Text style={sharedStyles.bookItems}>{formatPdfCurrency(book.subTotal)}</Text>
            <Text style={sharedStyles.bookItems}>{formatPdfCurrency(book.dicAmount)}</Text>
            <Text style={sharedStyles.bookItems}>{formatPdfCurrency(book.total)}</Text>
          </View>
        ))
        : null}

      <View style={sharedStyles.bookListTotal}>
        <Text style={sharedStyles.bookTitle}>TOTAL</Text>
        <Text style={sharedStyles.bookIsbn} />
        <Text style={sharedStyles.bookItems}>{copiesTotal}</Text>
        <Text style={sharedStyles.bookItems} />
        <Text style={sharedStyles.bookItems} />
        <Text style={sharedStyles.bookItems} />
        <Text style={sharedStyles.bookItems}>{formatPdfCurrency(fullTotal)}</Text>
      </View>

      <Text style={sharedStyles.credits}>Documento generado por Caikei</Text>
    </Page>
  </Document>
);

RemisionPdf.propTypes = {
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
  destination: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
  internalId: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      pvp: PropTypes.number,
    }),
  ).isRequired,
  discount: PropTypes.number,
  copiesTotal: PropTypes.number.isRequired,
  fullTotal: PropTypes.number.isRequired,
};

RemisionPdf.defaultProps = {
  discount: 0,
};

export default RemisionPdf;
