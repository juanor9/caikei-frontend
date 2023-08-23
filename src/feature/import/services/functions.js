export function excelDateToJSDate(excelDate) {
  const adjustedExcelDate = excelDate + 1;
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const date = new Date((adjustedExcelDate - 25569) * millisecondsPerDay);
  return date;
}

export function convertCamelCaseToReadable(input) {
  const words = input.split(/(?=[A-Z])/);
  const result = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return result;
}

export const catalogueKeys = {
  titulo: 'title',
  isbn: 'isbn',
  pvp: 'price',
  fechaDePublicacion: 'pubDate',
  paginas: 'pages',
  autores: 'authors',
  alto: 'height',
  ancho: 'width',
  codigoCentroDeCosto: 'costCenter',
};
