// components/Sidebar.tsx
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SidebarProps, SubItem } from "../types";
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from './ui/button';

export const Sidebar: React.FC<SidebarProps> = ({ items, onSelectItem }) => {
  const [selectedSubItem, setSelectedSubItem] = useState<SubItem | null>(null);

  const handleSubItemClick = (subItem: SubItem) => {
    setSelectedSubItem(subItem);
    onSelectItem(subItem);
  };
  const isTeacherEmail = useUser().user?.emailAddresses[0].emailAddress.endsWith('github@gmail.com')

  return (
    <div className="w-64 h-screen bg-white text-black fixed overflow-y-auto py-4 px-4">
      <Accordion type="single" collapsible>
        {items.map((item) => (
          <AccordionItem key={item.id} value={`item-${item.id}`}>
            <AccordionTrigger className="px-4 py-2">{item.title}</AccordionTrigger>
            <AccordionContent className="pl-8 py-2">  
              {item.subItems.map((subItem, index) => (
                <button
                  key={subItem.id}
                  className={`flex items-center px-4 py-2 w-full text-left rounded-md ${
                    selectedSubItem?.id === subItem.id ? 'bg-gray-200' : 'hover:bg-gray-100 active:bg-gray-300'
                  } ${index !== item.subItems.length - 1 ? 'mb-2' : ''}`}  
                  onClick={() => handleSubItemClick(subItem)}
                >
                  <div className="flex-grow-0">
                    {subItem.title === "Courses" && (
                      <Image
                        src='graduation.svg'
                        width={32}
                        height={32}
                        alt=''
                      />
                    )}
                    {subItem.title === "Labs" && (
                      <Image
                        src='/laboratory.svg'
                        width={32}
                        height={32}
                        alt=''
                      />
                    )}
                    {subItem.title === "Assignments" && (
                      <Image
                        src='/assignment.svg'
                        width={32}
                        height={32}
                        alt=''
                      />
                    )}
                    {subItem.title === "Exams" && (
                      <Image
                        src='/exam.svg'
                        width={32}
                        height={32}
                        alt=''
                      />
                    )}
                    
                  </div>
                  <span className="flex-grow pl-2">{subItem.title}</span>
                </button>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {isTeacherEmail && (
        <div className="mt-4">
          <Link href="/teacher/create-course" className='w-full'>
              <Button className='w-full'>
                Create a course
              </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
