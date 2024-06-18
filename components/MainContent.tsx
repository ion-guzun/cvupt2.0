import React, { useEffect, useState } from 'react';
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
import QuizCard from './QuizCard';
import { Textarea } from './ui/textarea';
import Link from 'next/link';

export const MainContent: React.FC<MainContentProps> = ({ content }) => {
  const userEmail = useUser().user?.emailAddresses[0].emailAddress;
  const router = useRouter();

  const handleCreateLab = () => {
    router.push(`/teacher/create-lab-within-course/${content.courseObjectId}`);
  };
  const handleCreateAssignment = () => {
    router.push(`/teacher/create-assignment-within-course/${content.courseObjectId}`);
  };
  const handleCreateQuiz = () => {
    router.push(`/teacher/create-quiz-within-course/${content.courseObjectId}`);
  };

  if (!content) {
    return <div>No content available.</div>;
  }

  const isTeacherEmail = userEmail?.endsWith('github@gmail.com');
  const isStudentEmail = userEmail?.endsWith('@student.upt.ro');

  return (
    <div className="ml-64 p-8 overflow-y-auto h-full">
      {content.title && (
        <h1 className="text-2xl font-bold mb-4">{content.title}</h1>
      )}

      {content.title && content.title.includes('Labs') && isTeacherEmail && (
        <Button onClick={handleCreateLab} className="mb-4">Create New Lab</Button>
      )}
      {content.title && content.title.includes('Assignments') && isTeacherEmail && (
        <Button onClick={handleCreateAssignment} className="mb-4">Create New Assignment</Button>
      )}
      {content.title && content.title.includes('Exams') && isTeacherEmail && (
        <Button onClick={handleCreateQuiz} className="mb-4">Create New Quiz</Button>
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
                <div className="p-4 bg-gray-100 rounded-md mb-4">
                  <p className="text-gray-800">{lab.description}</p>
                </div>
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
          <div key={`course-${i}`}>
            {isTeacherEmail && (
              <Link href={`teacher/action-buttons-for-course/${course._id}`}>
                <Button className='bg-red-600 hover:bg-red-700'>Course actions</Button>
              </Link>
            )}
            {course.pdfs?.map((pdf, idx) => (
              <Accordion key={`accordion-course-${i}-${idx}`} type="single" collapsible className="w-full">
                <AccordionItem value={`item-${i}-${idx}`}>
                  <AccordionTrigger className='min-w-[950px]'>
                    {`Course Material ${idx + 1}`}
                  </AccordionTrigger>
                  <AccordionContent className="min-h-[150px]">
                    <Link href={pdf} target="_blank" rel="noopener noreferrer">
                      <Button>View in full screen</Button>
                    </Link>
                    <iframe key={idx} src={pdf} width="100%" height="500px" style={{ border: 'none' }} className='py-4'/>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        ))}
        {content.quizes?.map((quiz, i) => (
          <Accordion key={`accordion-quiz-${i}`} type="single" collapsible className="w-full">
            <AccordionItem value={`item-${i}`}>
              <AccordionTrigger className='min-w-[950px]'>
                {`EXAM ${i + 1}: ${quiz.title}`}
              </AccordionTrigger>
              <AccordionContent className="min-h-[150px]">
                <QuizCard
                  title={quiz.title}
                  description={quiz.description}
                  questionCount={quiz.questions.length}
                  timeLimit={quiz.timeLimit}
                  userEmail={userEmail!}
                  quizId={quiz._id!}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
