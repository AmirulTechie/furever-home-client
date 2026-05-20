import React from 'react';

const SkeletonCard = () => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-neutral-100 animate-pulse">
            <div className="h-52 bg-neutral-100" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-neutral-100 rounded w-1/2" />
              <div className="h-3 bg-neutral-100 rounded w-1/3" />
              <div className="h-3 bg-neutral-100 rounded w-full" />
              <div className="h-10 bg-neutral-100 rounded-xl" />
            </div>
          </div>
    );
};

export default SkeletonCard;