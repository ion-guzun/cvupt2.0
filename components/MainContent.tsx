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
import { useUser } from '@clerk/nextjs';
import { AssignmentCard } from './AssignmentCard';
import { IAssignment } from '@/lib/database/models/assignment.model';

export const MainContent: React.FC<MainContentProps> = ({ content }) => {

  const router = useRouter();
  const handleCreateLab = () => {router.push(`/teacher/create-lab-within-course/${content.courseObjectId}`);};
  const handleCreateAssignment = () => {router.push(`/teacher/create-assignment-within-course/${content.courseObjectId}`);};
  const isTeacherEmail = useUser().user?.emailAddresses[0].emailAddress.endsWith('github@gmail.com');

  return (
      <div className="ml-64 p-8 overflow-y-auto h-full">
          <h1 className="text-2xl font-bold mb-4">{content.title}</h1>

          {content.title.includes('Labs') && isTeacherEmail && (
              <Button onClick={handleCreateLab} className="mb-4">Create New Lab</Button>
          )}
          {content.title.includes('Assignments') && isTeacherEmail && (
              <Button onClick={handleCreateAssignment} className="mb-4">Create New Assignment</Button>
          )}
          
          <div>
              {content.assignments?.map((assignment, i) => (
                  <Accordion key={`accordion-assignment-${i}`} type="single" collapsible className="w-full">
                      <AccordionItem value={`item-${i}`}>
                          <AccordionTrigger className='min-w-[950px]'>
                              {`Assignment ${i + 1}`}
                          </AccordionTrigger>
                          <AccordionContent className="min-h-[150px]">
                              <AssignmentCard 
                                assignmentObjectId={assignment._id}
                                createdBy={assignment.createdBy}
                                title={assignment.title}
                                description={assignment.description}
                                deadline={assignment.deadline}
                                createdAt={assignment.createdAt}
                              />
                          </AccordionContent>
                      </AccordionItem>
                  </Accordion>
              ))}
              {content.labs?.map((lab, i) => (
                  <Accordion key={`accordion-lab-${i}`} type="single" collapsible className="w-full">
                      <AccordionItem value={`item-${i}`}>
                          <AccordionTrigger className='min-w-[950px]'>
                              {`Lab ${i + 1}`}
                          </AccordionTrigger>
                          <AccordionContent className="min-h-[150px]">
                            <iframe
                              src={lab.labPdfs[0]}
                              width="100%"
                              height="500px"
                              style={{ border: 'none' }}
                              >
                              This browser does not support PDFs. Please download the PDF to view it.
                            </iframe>
                          </AccordionContent>
                      </AccordionItem>
                  </Accordion>
              ))}
              {content.courses?.map((course, i) => (
                  <Accordion key={`accordion-course-${i}`} type="single" collapsible className="w-full">
                      <AccordionItem value={`item-${i}`}>
                          <AccordionTrigger className='min-w-[950px]'>
                              {`Course Material ${i + 1}`}
                          </AccordionTrigger>
                          <AccordionContent className="min-h-[150px]">
                            {course.pdfs?.map((pdf, idx) => (
                              <iframe key={idx} src={pdf} width="100%" height="500px" style={{ border: 'none' }} />
                            ))}
                          </AccordionContent>
                      </AccordionItem>
                  </Accordion>
              ))}
          </div>
      </div>
  );
};


export default MainContent;
