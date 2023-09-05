import React, {useState, useEffect} from "react";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import { PDFViewer } from '@react-pdf/renderer';
import CustomHeader from "../component/CustomHeader.jsx";
//. para visualizar pdf existe pdf viewer

function PDFview() {
    const [pdfData, setPdfData] = useState(null);

  useEffect(() => {
    // Genera el PDF utilizando pdf-lib u otra biblioteca
    const generatePDF = async () => {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 400]);
      const { width, height } = page.getSize();
      const helveticaFont = await pdfDoc.embedFont('Helvetica');
      const drawTextOptions = {
        x: 50,
        y: height - 50,
        font: helveticaFont,
        size: 30,
      };
      page.drawText('Hello, PDF!', drawTextOptions);

      // Guarda el PDF generado en memoria
      const pdfBytes = await pdfDoc.save();
      setPdfData(pdfBytes);
    };

    generatePDF();
  }, []);

  return (
    <div>
      <h1>PDF Viewer</h1>
      {pdfData && (
        <PDFViewer width={600} height={400}>
          <Document>
            <Page size="A4">
              <Text>This is a dynamically generated PDF.</Text>
            </Page>
            {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1}>
          <CustomHeader />
        </Page>
        ))}
          </Document>
        </PDFViewer>
      )}
      {pdfData && (
        <PDFDownloadLink document={<Document file={pdfData} />} fileName="generated.pdf">
          {({ blob, url, loading, error }) => (loading ? 'Loading...' : 'Download PDF')}
        </PDFDownloadLink>
      )}
    </div>
  );
}
  
  export default PDFview;// la planilla pdf en formato web. recibiendo los props del boton para llenar segun sea el caso.
// en caso de que se reciban datos vacios se debe llenar con no aplica.