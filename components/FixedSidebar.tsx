// components/Sidebar.tsx
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SidebarProps, SubItem } from "../types";

export const Sidebar: React.FC<SidebarProps> = ({ items, onSelectItem }) => {
  const [selectedSubItem, setSelectedSubItem] = useState<SubItem | null>(null);

  const handleSubItemClick = (subItem: SubItem) => {
    setSelectedSubItem(subItem);
    onSelectItem(subItem);
  };

  return (
    <div className="w-64 h-screen bg-white text-black fixed overflow-y-auto py-4 px-4">
      <Accordion type="single" collapsible>
        {items.map((item) => (
          <AccordionItem key={item.id} value={`item-${item.id}`}>
            <AccordionTrigger className="px-4 py-2">{item.title}</AccordionTrigger>
            <AccordionContent className="pl-8">
              {item.subItems.map((subItem) => (
                <button
                  key={subItem.id}
                  className={`block px-4 py-2 w-full text-left rounded-md ${
                    selectedSubItem?.id === subItem.id ? 'bg-gray-400' : 'hover:bg-gray-300 active:bg-gray-500'
                  }`}
                  onClick={() => handleSubItemClick(subItem)}
                >
                  {subItem.title}
                </button>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
