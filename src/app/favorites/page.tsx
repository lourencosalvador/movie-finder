/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowLeft, SortAsc, Trash2, Film } from 'lucide-react';
import Link from 'next/link';
import { MovieCard } from '@/components/MovieCard';
import { useFavorites } from '@/hooks/useFavorites';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function FavoritesPage() {
  const { 
    loading, 
    toggleFavorite, 
    clearFavorites, 
    getFavoritesSorted,
    favoritesCount 
  } = useFavorites();
  
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'rating'>('date');
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const sortedFavorites = getFavoritesSorted(sortBy);

  const handleClearAll = () => {
    clearFavorites();
    setShowConfirmClear(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Carregando seus favoritos..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(255,255,255)_1px,transparent_0)] [background-size:20px_20px]"></div>
        </div>

        <div className="relative container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link href="/">
              <motion.button
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar ao Início
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl shadow-lg">
              <Heart className="w-8 h-8 text-white fill-current" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              Meus Favoritos
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {favoritesCount === 0 
                ? 'Nenhum filme favorito ainda' 
                : `${favoritesCount} filme${favoritesCount !== 1 ? 's' : ''} no seu coração`
              }
            </p>
          </motion.div>

          {favoritesCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8"
            >
              <div className="flex items-center gap-2">
                <SortAsc className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Ordenar por:</span>
                <div className="flex gap-2">
                  {[
                    { key: 'date', label: 'Data' },
                    { key: 'title', label: 'Nome' },
                    { key: 'rating', label: 'Nota' }
                  ].map((option) => (
                    <motion.button
                      key={option.key}
                      onClick={() => setSortBy(option.key as any)}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                        sortBy === option.key
                          ? 'bg-purple-600 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.button
                onClick={() => setShowConfirmClear(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Trash2 className="w-4 h-4" />
                Limpar Tudo
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {favoritesCount === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Nenhum favorito ainda
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Explore nosso catálogo e adicione filmes aos seus favoritos clicando no ❤️
            </p>
            <Link href="/">
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Film className="w-5 h-5" />
                Descobrir Filmes
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            <AnimatePresence>
              {sortedFavorites.map((movie, index) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  index={index}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={true}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showConfirmClear && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                  <Trash2 className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Limpar todos os favoritos?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Esta ação não pode ser desfeita. Todos os seus filmes favoritos serão removidos.
                </p>
                <div className="flex gap-3">
                  <motion.button
                    onClick={() => setShowConfirmClear(false)}
                    className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancelar
                  </motion.button>
                  <motion.button
                    onClick={handleClearAll}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Limpar Tudo
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 