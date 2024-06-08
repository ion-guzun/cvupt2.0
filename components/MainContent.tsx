import React from 'react';
import { MainContentProps } from '../types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { PDFViewer } from './PDFViewer';

export const MainContent: React.FC<MainContentProps> = ({ content }) => (
  <div className="ml-64 p-8 overflow-y-auto h-full">
    <h1 className="text-2xl font-bold mb-4">{content.title}</h1>
    <div>
      {content.body.split('\n').map((link, i) => (
        <Accordion key={`accordion-${i}`} type="single" collapsible className="w-full">
          <AccordionItem value={`course-${i}`}>
            <AccordionTrigger className='min-w-[950px]'>
              {`COURSE ${i + 1}`}
            </AccordionTrigger>
            <AccordionContent className="min-h-[150px]">
              <PDFViewer fileUrl={link.trim()}/>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  </div>
);
