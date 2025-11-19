/**
 * Shared PDF Styles
 * Applies DRY - centralizes common PDF styles
 * Applies OCP - easy to extend for new PDF types
 */
import { StyleSheet, Font } from '@react-pdf/renderer';
import Merriweather from '../../../../../assets/fonts/Merriweather/Merriweather-Light.ttf';
import MerriweatherItalic from '../../../../../assets/fonts/Merriweather/Merriweather-LightItalic.ttf';
import MerriweatherBold from '../../../../../assets/fonts/Merriweather/Merriweather-Bold.ttf';

// Register font once
Font.register({
  family: 'Merriweather',
  fonts: [
    { src: Merriweather },
    { src: MerriweatherItalic, fontStyle: 'italic' },
    { src: MerriweatherBold, fontWeight: 'bold' },
  ],
});

// Shared styles for all PDF documents
export const sharedStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
    padding: 25,
    fontSize: 8,
    fontFamily: 'Merriweather',
  },
  date: {
    marginBottom: 20,
  },
  generalData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  publisherData: {
    flexDirection: 'row',
    gap: 10,
  },
  publisherLogo: {
    width: '100%',
  },
  logoContainer: {
    width: '20%',
  },
  bookListHeader: {
    marginTop: 30,
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#E6E6E6',
    fontWeight: 'extrabold',
    padding: 4,
  },
  bookList: {
    marginTop: 5,
    flexDirection: 'row',
    gap: 10,
    borderBottom: 1,
    borderBottomColor: '#E6E6E6',
    paddingBottom: 2,
  },
  bookListTotal: {
    marginTop: 5,
    flexDirection: 'row',
    gap: 10,
    borderBottom: 1,
    borderBottomColor: '#E6E6E6',
    paddingBottom: 2,
    fontWeight: 'bold',
  },
  bookTitle: {
    width: '30%',
  },
  bookIsbn: {
    width: '15%',
  },
  bookItems: {
    width: '9%',
  },
  header: {
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
  },
  credits: {
    fontSize: 6,
    color: '#B8B8B8',
    marginTop: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
});

// Helper to format currency
export const formatPdfCurrency = (value) => {
  if (value === null || value === undefined) return '$0';
  return `$${value.toLocaleString()}`;
};

export default sharedStyles;
