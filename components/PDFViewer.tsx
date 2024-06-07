'use client'
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

interface PDFViewerProps {
  fileUrl: string;
}

export const PDFViewer = ({ fileUrl }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const scale = 1.25;  

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  const goToNextPage = () => setPageNumber(prevPageNumber => prevPageNumber + 1);
  const goToPreviousPage = () => setPageNumber(prevPageNumber => prevPageNumber - 1);

  return (
    <div>
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} scale={scale} renderTextLayer={true} />
      </Document>
      <div>
        <p>Page {pageNumber} of {numPages}</p>
        <button onClick={goToPreviousPage} disabled={pageNumber <= 1}>
          Previous
        </button>
        <button onClick={goToNextPage} disabled={pageNumber >= (numPages || 0)}>
          Next
        </button>
      </div>
    </div>
  );
};
