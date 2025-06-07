'use client';

import { motion } from 'framer-motion';
import { Star, Calendar, Eye, Heart } from 'lucide-react';
import { Movie, getImageUrl } from '@/lib/api';
import { useState } from 'react';
import Link from 'next/link';

interface MovieCardProps {
  movie: Movie;
  index?: number;
  onToggleFavorite?: (movie: Movie) => void;
  isFavorite?: boolean;
}

export const MovieCard = ({ movie, index = 0, onToggleFavorite, isFavorite = false }: MovieCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Data não disponível';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-green-500';
    if (rating >= 6) return 'text-yellow-500';
    return 'text-red-500';
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(movie);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.05,
        type: "spring",
        stiffness: 100 
      }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <Link href={`/movie/${movie.id}`} className="block">
        <div className="
          relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden 
          shadow-lg hover:shadow-2xl transition-all duration-300
          border border-gray-200 dark:border-gray-700
          group-hover:border-purple-300 dark:group-hover:border-purple-600
        ">
          <div className="relative aspect-[2/3] overflow-hidden bg-gray-200 dark:bg-gray-700">
            {!imageError ? (
              <>
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 border-2 border-purple-300 border-t-purple-600 rounded-full"
                    />
                  </div>
                )}
                <motion.img
                  src={getImageUrl(movie.poster_path, 'w500')}
                  alt={movie.title}
                  className={`
                    w-full h-full object-cover transition-all duration-500
                    group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                  `}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  loading="lazy"
                />
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                <Eye className="w-12 h-12 mb-2" />
                <p className="text-sm text-center px-4">Imagem não disponível</p>
              </div>
            )}

            <div className="
              absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent
              opacity-0 group-hover:opacity-100 transition-all duration-300
              flex flex-col justify-end p-4
            ">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-white"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs">
                    {formatDate(movie.release_date)}
                  </span>
                </div>
              </motion.div>
            </div>

            <div className="absolute top-3 left-3">
              <motion.div
                className={`
                  px-2 py-1 rounded-full text-xs font-bold
                  bg-black/70 backdrop-blur-sm border
                  ${getRatingColor(movie.vote_average)} border-current
                `}
                whileHover={{ scale: 1.05 }}
              >
                ★ {movie.vote_average.toFixed(1)}
              </motion.div>
            </div>

            {onToggleFavorite && (
              <motion.button
                onClick={handleToggleFavorite}
                className={`
                  absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm
                  transition-all duration-200 ${
                    isFavorite
                      ? 'bg-red-500/90 text-white'
                      : 'bg-black/50 text-white hover:bg-red-500/90'
                  }
                `}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart 
                  className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} 
                />
              </motion.button>
            )}
          </div>

          <div className="p-4">
            <motion.h3 
              className="
                font-bold text-gray-900 dark:text-white mb-2 line-clamp-2
                group-hover:text-purple-600 dark:group-hover:text-purple-400
                transition-colors duration-200
              "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {movie.title}
            </motion.h3>
            
            <motion.p 
              className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {movie.overview || 'Sinopse não disponível.'}
            </motion.p>

            <motion.div 
              className="flex items-center justify-between text-xs text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span>{formatDate(movie.release_date)}</span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}; 