'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, X } from 'lucide-react';
import { Genre, getGenres, getMoviesByGenre, Movie } from '@/lib/api';

interface GenreFilterProps {
  selectedGenre: number | null;
  onGenreChange: (genreId: number | null) => void;
}

export const GenreFilter = ({ selectedGenre, onGenreChange }: GenreFilterProps) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreList = await getGenres();
        setGenres(genreList);
      } catch (error) {
        console.error('Erro ao carregar gêneros:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedGenreName = selectedGenre 
    ? genres.find(g => g.id === selectedGenre)?.name 
    : null;

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 
          text-gray-700 dark:text-gray-300 rounded-xl border-2 transition-all
          ${isOpen 
            ? 'border-purple-500 shadow-lg' 
            : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
          }
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading}
      >
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">
          {loading ? 'Carregando...' : selectedGenreName || 'Todos os gêneros'}
        </span>
        {selectedGenre && (
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onGenreChange(null);
            }}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-3 h-3" />
          </motion.button>
        )}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && !loading && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              className="
                absolute top-full left-0 mt-2 min-w-[200px] max-w-xs
                bg-white dark:bg-gray-800 rounded-xl shadow-xl
                border border-gray-200 dark:border-gray-700 z-50
                max-h-64 overflow-y-auto
              "
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-2">
                <motion.button
                  onClick={() => {
                    onGenreChange(null);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                    ${!selectedGenre 
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }
                  `}
                  whileHover={{ x: 2 }}
                >
                  Todos os gêneros
                </motion.button>

                {genres.map((genre) => (
                  <motion.button
                    key={genre.id}
                    onClick={() => {
                      onGenreChange(genre.id);
                      setIsOpen(false);
                    }}
                    className={`
                      w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                      ${selectedGenre === genre.id
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }
                    `}
                    whileHover={{ x: 2 }}
                  >
                    {genre.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export const useGenreFilter = () => {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const loadMoviesByGenre = async (genreId: number) => {
    try {
      setLoading(true);
      const response = await getMoviesByGenre(genreId);
      setMovies(response.results);
    } catch (error) {
      console.error('Erro ao carregar filmes por gênero:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreChange = (genreId: number | null) => {
    setSelectedGenre(genreId);
    if (genreId) {
      loadMoviesByGenre(genreId);
    }
  };

  const clearFilter = () => {
    setSelectedGenre(null);
  };

  return {
    selectedGenre,
    movies,
    loading,
    handleGenreChange,
    clearFilter,
  };
}; 