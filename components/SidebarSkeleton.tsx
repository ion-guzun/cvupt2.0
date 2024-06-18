// components/SidebarSkeleton.tsx
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SidebarSkeleton: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-white text-black fixed overflow-y-auto py-4 px-4">
      <div className="mb-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-6 w-1/2" />
      </div>
      <div className="mb-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-6 w-1/2" />
      </div>
      <div className="mb-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-6 w-1/2" />
      </div>
      <div className="mb-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-6 w-1/2" />
      </div>
      <div className="mt-4">
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};

export default SidebarSkeleton;
