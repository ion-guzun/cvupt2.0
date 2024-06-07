import React from 'react';
import { MainContentProps } from '../types';

export const MainContent: React.FC<MainContentProps> = ({ content }) => (
  <div className="ml-64 p-8 overflow-y-auto h-full">
    <h1 className="text-2xl font-bold mb-4">{content.title}</h1>
    <div>
      {content.body.split('\n').map((link, i) => (
        <p key={i}>{link}</p> // Render each PDF link on its own line
      ))}
    </div>
  </div>
);
