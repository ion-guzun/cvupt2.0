import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const Credits = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto mt-16 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Credits</h1>
      <p className="text-gray-700 text-lg mb-4">
        This app is a bachelor project inspired by <a href="https://cv.upt.ro/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">https://cv.upt.ro/</a>. Some graphics were used from the original app (the UPT logo and the logos for all faculties within UPT), and also from SVG Repo and Icons8.
      </p>
      <div className="text-center">
        <Link href='/'>
          <Button>
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Credits;
