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
  const scale = 1.5;

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };



  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-200 shadow-sm rounded-md">
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page 
          pageNumber={pageNumber} 
          scale={scale} 
          renderTextLayer={true} 
        />
      </Document>
    </div>
  );
};
