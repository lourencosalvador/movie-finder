'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export const LoadingSpinner = ({ 
  size = 'md', 
  text = 'Carregando...', 
  className = '' 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <motion.div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`${sizeClasses[size]} text-purple-600`}
      >
        <Loader2 className="w-full h-full" />
      </motion.div>
      
      {text && (
        <motion.p
          className={`${textSizes[size]} text-gray-600 dark:text-gray-400 font-medium`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );
};

export const LoadingCards = ({ count = 12 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="p-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export const LoadingMovieDetails = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="h-12 md:h-16 bg-gray-700 rounded mb-4 animate-pulse" />
              <div className="h-6 bg-gray-700 rounded w-3/4 mb-6 animate-pulse" />
              
              <div className="flex items-center gap-6 mb-6">
                <div className="h-8 w-20 bg-gray-700 rounded-full animate-pulse" />
                <div className="h-4 w-16 bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
              </div>
              
              <div className="flex gap-2 mb-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-6 w-16 bg-gray-700 rounded-full animate-pulse" />
                ))}
              </div>
              
              <div className="h-12 w-48 bg-gray-700 rounded-2xl animate-pulse" />
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <div className="aspect-[2/3] bg-gray-800 rounded-2xl animate-pulse" />
          </div>
          
          <div className="lg:col-span-2">
            <div className="h-8 bg-gray-800 rounded mb-4 animate-pulse" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-800 rounded mb-2 animate-pulse" />
            ))}
            
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <div className="h-6 bg-gray-800 rounded mb-4 animate-pulse" />
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-4 bg-gray-800 rounded mb-2 animate-pulse" />
                ))}
              </div>
              <div>
                <div className="h-6 bg-gray-800 rounded mb-4 animate-pulse" />
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-4 bg-gray-800 rounded mb-2 animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 