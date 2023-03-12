/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  // Font,
} from '@react-pdf/renderer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
    margin: 25,
    // fontFamily: 'Roboto',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const MyDocument = ({ data }) => {
  const dispatch = useDispatch();

  useEffect(() => {

  }, [data]);

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text>Remisión de ejemplares</Text>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
