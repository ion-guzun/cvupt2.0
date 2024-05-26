// components/MainContent.tsx
import React from 'react';
import { MainContentProps } from '../types';

export const MainContent: React.FC<MainContentProps> = ({ content }) => (
  <div className="ml-64 p-8 overflow-y-auto h-full">
    <h1 className="text-2xl font-bold mb-4">{content.title}</h1>
    <div>
      {[...Array(50)].map((_, i) => (
        <p key={i}>{content.body}</p>
      ))}
    </div>
  </div>
);
