import React from 'react';
import { MainContentProps } from '../types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


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
              <iframe
                src={link.trim()}
                width="100%"
                height="500px"
                style={{ border: 'none' }}
              >
              This browser does not support PDFs. Please download the PDF to view it: <a href="https://utfs.io/f/6f648b47-3f29-4223-812d-806c17bc3749-41ftwr.pdf">Download PDF</a>.
            </iframe>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  </div>
);
