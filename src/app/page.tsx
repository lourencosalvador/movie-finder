'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Sparkles, TrendingUp, AlertCircle, ChevronDown, Heart } from 'lucide-react';
import Link from 'next/link';
import { SearchBar } from '@/components/SearchBar';
import { MovieCard } from '@/components/MovieCard';
import { LoadingSpinner, LoadingCards } from '@/components/ui/LoadingSpinner';
import { useMovies } from '@/hooks/useMovies';
import { useFavorites } from '@/hooks/useFavorites';

export default function HomePage() {
  const {
    movies,
    loading,
    error,
    hasMore,
    searchQuery,
    searchMovies,
    loadMore,
    resetSearch
  } = useMovies();

  const { toggleFavorite, isFavorite, favoritesCount } = useFavorites();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = useCallback((query: string) => {
    searchMovies(query);
  }, [searchMovies]);

  const handleClearSearch = useCallback(() => {
    resetSearch();
  }, [resetSearch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(255,255,255)_1px,transparent_0)] [background-size:20px_20px]"></div>
        </div>

        <div className="relative container mx-auto px-4 py-16 text-center">
          <motion.div
            className="absolute top-4 right-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/favorites">
              <motion.button
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-5 h-5 text-red-500 fill-current" />
                <span className="font-medium">{favoritesCount}</span>
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl shadow-2xl"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Film className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              MovieFinder
            </h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Descubra, explore e encontre seus filmes favoritos
              <Sparkles className="inline w-6 h-6 ml-2 text-yellow-500" />
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <SearchBar
              onSearch={handleSearch}
              onClear={handleClearSearch}
              loading={loading}
              placeholder="Busque por filmes, atores, diretores..."
            />
          </motion.div>

          {!searchQuery && (
            <motion.div
              className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Filmes Populares</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Sempre Atualizado</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {searchQuery ? (
              <>Resultados para &quot;{searchQuery}&quot;</>
            ) : (
              <>Filmes Populares</>
            )}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {searchQuery 
              ? `${movies.length} filme${movies.length !== 1 ? 's' : ''} encontrado${movies.length !== 1 ? 's' : ''}`
              : 'Os filmes mais populares do momento'
            }
          </p>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl"
            >
              <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Ops! Algo deu errado</h3>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 mb-12">
          <AnimatePresence>
            {movies.map((movie, index) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                index={index}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite(movie.id)}
              />
            ))}
          </AnimatePresence>
        </div>

        {loading && movies.length === 0 && (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" text="Carregando filmes incríveis..." />
          </div>
        )}

        {loading && movies.length === 0 && (
          <LoadingCards count={12} />
        )}

        {hasMore && !loading && movies.length > 0 && (
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.button
              onClick={loadMore}
              className="
                flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600
                text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl
                transition-all duration-300 transform hover:scale-105
              "
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Carregar Mais Filmes</span>
              <ChevronDown className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}

        {!loading && movies.length === 0 && searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Film className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Nenhum filme encontrado
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Tente buscar por outro termo ou navegue pelos filmes populares.
            </p>
            <motion.button
              onClick={handleClearSearch}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Filmes Populares
            </motion.button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="
              fixed bottom-6 right-6 p-3 bg-purple-600 text-white rounded-full
              shadow-lg hover:shadow-xl transition-all duration-300 z-50
            "
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronDown className="w-5 h-5 rotate-180" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
