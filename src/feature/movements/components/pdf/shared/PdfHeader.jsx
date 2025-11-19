/**
 * PdfHeader Component
 * Shared header component for all PDF documents
 * Applies SRP and DRY
 */
import PropTypes from 'prop-types';
import { View, Text, Image } from '@react-pdf/renderer';
import { sharedStyles } from './pdfStyles';

const PdfHeader = ({ publisher, logo, pubId, destination }) => (
  <View style={sharedStyles.generalData}>
    <View style={sharedStyles.publisherData}>
      <View style={sharedStyles.logoContainer}>
        <Image src={logo} style={sharedStyles.publisherLogo} />
      </View>
      <View>
        <Text>{publisher.name}</Text>
        <Text>
          {pubId.type}: {pubId.number}
        </Text>
        <Text>Direccion: {publisher.address}</Text>
        <Text>Telefono: {publisher.phone}</Text>
        <Text>Correo electronico: {publisher.email}</Text>
      </View>
    </View>
    {destination && (
      <View>
        <Text style={sharedStyles.bold}>
          {destination.isDestination ? 'Destinatario:' : 'Remitente:'}
        </Text>
        <Text>{destination.name}</Text>
        <Text>
          Direccion: {destination.address}, {destination.city}
        </Text>
        <Text>Telefono: {destination.phone}</Text>
        <Text>Correo electronico: {destination.email}</Text>
      </View>
    )}
  </View>
);

PdfHeader.propTypes = {
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
    isDestination: PropTypes.bool,
  }),
};

PdfHeader.defaultProps = {
  destination: null,
};

export default PdfHeader;
