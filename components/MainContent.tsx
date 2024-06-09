import React from 'react';
import { MainContentProps } from '../types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from './ui/button';
import { useRouter } from 'next/navigation'; 

export const MainContent: React.FC<MainContentProps> = ({ content }) => {
  const router = useRouter(); 

  const handleCreateLab = () => {
    router.push(`/teacher/create-lab-within-course/${content.courseObjectId}`); 
  };

  return (
    <div className="ml-64 p-8 overflow-y-auto h-full">
      <h1 className="text-2xl font-bold mb-4">{content.title}</h1>
      {content.title.includes('Labs') && (
        <Button onClick={handleCreateLab} className="mb-4">Create New Lab</Button>
      )}
      <div>
        {content.body!.split('\n').map((link, i) => (
          <Accordion key={`accordion-${i}`} type="single" collapsible className="w-full">
            <AccordionItem value={`item-${i}`}>
              <AccordionTrigger className='min-w-[950px]'>
                {content.title.includes('Courses') ? `Course Material ${i + 1}` : `Lab Material ${i + 1}`}
              </AccordionTrigger>
              <AccordionContent className="min-h-[150px]">
                <iframe
                  src={link.trim()}
                  width="100%"
                  height="500px"
                  style={{ border: 'none' }}
                >
                  This browser does not support PDFs. Please download the PDF to view it: <a href={link.trim()}>Download PDF</a>.
                </iframe>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};
