'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, AlertCircle, Loader2 } from 'lucide-react';
import { getMovieVideos, MovieVideo } from '@/lib/api';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  movieId: number;
  movieTitle: string;
}

export const TrailerModal = ({ isOpen, onClose, movieId, movieTitle }: TrailerModalProps) => {
  const [videos, setVideos] = useState<MovieVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && movieId) {
      fetchVideos();
    }
    
    return () => {
      setVideos([]);
      setError(null);
    };
  }, [isOpen, movieId]);

  const fetchVideos = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getMovieVideos(movieId);
      const trailers = response.results.filter(
        video => video.site === 'YouTube' && 
        (video.type === 'Trailer' || video.type === 'Teaser')
      );
      setVideos(trailers);
      
      if (trailers.length === 0) {
        setError('Nenhum trailer disponível para este filme.');
      }
    } catch (err) {
      console.error('Erro ao buscar vídeos:', err);
      setError('Erro ao carregar trailer. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mainTrailer = videos[0];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Trailer - {movieTitle}
              </h2>
              {videos.length > 1 && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {videos.length} trailer{videos.length !== 1 ? 's' : ''} disponível{videos.length !== 1 ? 'eis' : ''}
                </p>
              )}
            </div>
            
            <motion.button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>

          <div className="p-6">
            {loading && (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="w-8 h-8 text-purple-600 animate-spin mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Carregando trailer...</p>
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Trailer não disponível
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  {error}
                </p>
              </div>
            )}

            {!loading && !error && mainTrailer && (
              <div className="space-y-6">
                <div className="aspect-video rounded-xl overflow-hidden bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${mainTrailer.key}?autoplay=1&rel=0`}
                    title={mainTrailer.name}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {videos.length > 1 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Outros trailers
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {videos.slice(1, 5).map((video) => (
                        <motion.div
                          key={video.id}
                          className="group cursor-pointer"
                          whileHover={{ scale: 1.02 }}
                          onClick={() => {
                            setVideos([video, ...videos.filter(v => v.id !== video.id)]);
                          }}
                        >
                          <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
                            <img
                              src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                              alt={video.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                                <Play className="w-5 h-5 text-gray-900 ml-1" />
                              </div>
                            </div>
                          </div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white mt-2 line-clamp-2">
                            {video.name}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}; 