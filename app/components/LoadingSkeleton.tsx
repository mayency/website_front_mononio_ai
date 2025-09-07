'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  animated?: boolean;
}

/**
 * Base skeleton component with animation
 */
const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width,
  height,
  rounded = 'md',
  animated = true,
}) => {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };
  const animationClasses = animated ? 'animate-pulse' : '';

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={`${baseClasses} ${roundedClasses[rounded]} ${animationClasses} ${className}`}
      style={style}
    />
  );
};

/**
 * Text skeleton with variable lines
 */
interface TextSkeletonProps extends SkeletonProps {
  lines?: number;
  lineHeight?: string;
  lastLineWidth?: string;
}

export const TextSkeleton: React.FC<TextSkeletonProps> = ({
  lines = 1,
  lineHeight = 'h-4',
  lastLineWidth = 'w-3/4',
  className = '',
  animated = true,
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          key={index}
          className={`${lineHeight} ${index === lines - 1 ? lastLineWidth : 'w-full'}`}
          animated={animated}
        />
      ))}
    </div>
  );
};

/**
 * Avatar skeleton
 */
interface AvatarSkeletonProps extends SkeletonProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const AvatarSkeleton: React.FC<AvatarSkeletonProps> = ({
  size = 'md',
  className = '',
  animated = true,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <Skeleton
      className={`${sizeClasses[size]} ${className}`}
      rounded="full"
      animated={animated}
    />
  );
};

/**
 * Card skeleton
 */
interface CardSkeletonProps extends SkeletonProps {
  showImage?: boolean;
  showAvatar?: boolean;
  lines?: number;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({
  showImage = true,
  showAvatar = true,
  lines = 3,
  className = '',
  animated = true,
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 ${className}`}>
      <div className="flex items-start space-x-4">
        {showAvatar && (
          <AvatarSkeleton size="md" animated={animated} />
        )}
        <div className="flex-1 space-y-3">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-24" animated={animated} />
            <Skeleton className="h-4 w-16" animated={animated} />
          </div>
          <TextSkeleton lines={lines} animated={animated} />
        </div>
      </div>
      {showImage && (
        <div className="mt-4">
          <Skeleton className="h-48 w-full" animated={animated} />
        </div>
      )}
    </div>
  );
};

/**
 * Table skeleton
 */
interface TableSkeletonProps extends SkeletonProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 5,
  columns = 4,
  showHeader = true,
  className = '',
  animated = true,
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          {showHeader && (
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {Array.from({ length: columns }, (_, index) => (
                  <th key={index} className="px-6 py-3 text-left">
                    <Skeleton className="h-4 w-20" animated={animated} />
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {Array.from({ length: rows }, (_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: columns }, (_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-16" animated={animated} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/**
 * List skeleton
 */
interface ListSkeletonProps extends SkeletonProps {
  items?: number;
  showAvatar?: boolean;
  lines?: number;
}

export const ListSkeleton: React.FC<ListSkeletonProps> = ({
  items = 5,
  showAvatar = true,
  lines = 2,
  className = '',
  animated = true,
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: items }, (_, index) => (
        <div key={index} className="flex items-start space-x-4">
          {showAvatar && (
            <AvatarSkeleton size="md" animated={animated} />
          )}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" animated={animated} />
            <TextSkeleton lines={lines} animated={animated} />
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Form skeleton
 */
interface FormSkeletonProps extends SkeletonProps {
  fields?: number;
  showSubmit?: boolean;
}

export const FormSkeleton: React.FC<FormSkeletonProps> = ({
  fields = 4,
  showSubmit = true,
  className = '',
  animated = true,
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {Array.from({ length: fields }, (_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-4 w-24" animated={animated} />
          <Skeleton className="h-10 w-full" animated={animated} />
        </div>
      ))}
      {showSubmit && (
        <div className="pt-4">
          <Skeleton className="h-10 w-24" animated={animated} />
        </div>
      )}
    </div>
  );
};

/**
 * Dashboard skeleton
 */
interface DashboardSkeletonProps extends SkeletonProps {
  showStats?: boolean;
  showChart?: boolean;
  showTable?: boolean;
}

export const DashboardSkeleton: React.FC<DashboardSkeletonProps> = ({
  showStats = true,
  showChart = true,
  showTable = true,
  className = '',
  animated = true,
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Stats Cards */}
      {showStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" animated={animated} />
                  <Skeleton className="h-8 w-16" animated={animated} />
                </div>
                <Skeleton className="h-12 w-12" rounded="lg" animated={animated} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chart */}
      {showChart && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" animated={animated} />
            <Skeleton className="h-64 w-full" animated={animated} />
          </div>
        </div>
      )}

      {/* Table */}
      {showTable && (
        <TableSkeleton rows={5} columns={4} animated={animated} />
      )}
    </div>
  );
};

/**
 * Hero section skeleton
 */
interface HeroSkeletonProps extends SkeletonProps {
  showImage?: boolean;
  showButton?: boolean;
}

export const HeroSkeleton: React.FC<HeroSkeletonProps> = ({
  showImage = true,
  showButton = true,
  className = '',
  animated = true,
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4" animated={animated} />
            <TextSkeleton lines={4} lineHeight="h-5" animated={animated} />
            {showButton && (
              <div className="flex space-x-4">
                <Skeleton className="h-12 w-32" animated={animated} />
                <Skeleton className="h-12 w-32" animated={animated} />
              </div>
            )}
          </div>
          {showImage && (
            <div className="flex justify-center">
              <Skeleton className="h-96 w-full max-w-md" rounded="lg" animated={animated} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Navigation skeleton
 */
export const NavigationSkeleton: React.FC<SkeletonProps> = ({
  className = '',
  animated = true,
}) => {
  return (
    <nav className={`bg-white dark:bg-gray-800 shadow-sm ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Skeleton className="h-8 w-32" animated={animated} />
            <div className="hidden md:flex space-x-8">
              {Array.from({ length: 5 }, (_, index) => (
                <Skeleton key={index} className="h-4 w-16" animated={animated} />
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-20" animated={animated} />
            <Skeleton className="h-8 w-20" animated={animated} />
          </div>
        </div>
      </div>
    </nav>
  );
};

/**
 * Footer skeleton
 */
export const FooterSkeleton: React.FC<SkeletonProps> = ({
  className = '',
  animated = true,
}) => {
  return (
    <footer className={`bg-gray-900 text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-6 w-24" animated={animated} />
              <div className="space-y-2">
                {Array.from({ length: 4 }, (_, linkIndex) => (
                  <Skeleton key={linkIndex} className="h-4 w-20" animated={animated} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-48" animated={animated} />
            <div className="flex space-x-4">
              {Array.from({ length: 3 }, (_, index) => (
                <Skeleton key={index} className="h-4 w-16" animated={animated} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
