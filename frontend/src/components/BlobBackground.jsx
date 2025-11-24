import React from 'react';

const blobs = [
  {
    className:
      'absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob',
  },
  {
    className:
      'absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-2000',
  },
  {
    className:
      'absolute bottom-1/4 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-4000',
  },
];

const BlobBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="relative w-full h-full max-w-4xl">
      {blobs.map((blob) => (
        <div key={blob.className} className={blob.className} />
      ))}
    </div>
  </div>
);

export default BlobBackground;
