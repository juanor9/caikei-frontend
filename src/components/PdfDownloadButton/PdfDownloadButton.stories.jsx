import PdfDownloadButton from './PdfDownloadButton';
import { Document, Page, Text } from '@react-pdf/renderer';

// Simple PDF document for demo
const SimplePdf = () => (
  <Document>
    <Page size="A4" style={{ padding: 30 }}>
      <Text>Documento de ejemplo</Text>
    </Page>
  </Document>
);

export default {
  title: 'Components/PdfDownloadButton',
  component: PdfDownloadButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    document: <SimplePdf />,
    filename: 'documento-ejemplo.pdf',
  },
};

export const CustomFilename = {
  args: {
    document: <SimplePdf />,
    filename: 'reporte-ventas-2024.pdf',
  },
};
