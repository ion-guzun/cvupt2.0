// components/ContentManager.tsx
'use client';

import React, { useState } from 'react';
import { MainContent } from './MainContent';
import { SubItem, Content, Item } from '../types';
import { Sidebar } from './FixedSidebar';

interface ContentManagerProps {
  initialItems: Item[];
  initialSelectedContent: Content;
}

const ContentManager: React.FC<ContentManagerProps> = ({ initialItems, initialSelectedContent }) => {
  const [selectedContent, setSelectedContent] = useState<Content>(initialSelectedContent);

  const handleSelectItem = (item: SubItem) => {
    setSelectedContent(item.content);
  };

  return (
    <div className="flex flex-1">
      <Sidebar items={initialItems} onSelectItem={handleSelectItem} />
      <MainContent content={selectedContent} />
    </div>
  );
};

export default ContentManager;
