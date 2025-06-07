'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  placeholder?: string;
  loading?: boolean;
  initialValue?: string;
}

export const SearchBar = ({
  onSearch,
  onClear,
  placeholder = "Buscar filmes...",
  loading = false,
  initialValue = ""
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (query.trim()) {
        onSearch(query.trim());
      } else if (query === '') {
        onClear();
      }
    }, 500);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, onSearch, onClear]);

  const handleClear = () => {
    setQuery('');
    onClear();
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="relative">
        <motion.div
          className={`
            relative flex items-center bg-white dark:bg-gray-800 
            rounded-2xl shadow-lg border-2 transition-all duration-300
            ${isFocused 
              ? 'border-purple-500 shadow-purple-500/20 shadow-2xl' 
              : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
            }
          `}
          animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="pl-6 pr-3">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  className="text-purple-500"
                >
                  <Sparkles className="w-5 h-5 animate-spin" />
                </motion.div>
              ) : (
                <motion.div
                  key="search"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  className={`transition-colors duration-200 ${
                    isFocused ? 'text-purple-500' : 'text-gray-400'
                  }`}
                >
                  <Search className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="
              flex-1 py-4 px-2 bg-transparent text-gray-900 dark:text-white 
              placeholder-gray-500 focus:outline-none text-lg
            "
            disabled={loading}
          />

          <AnimatePresence>
            {query && (
              <motion.button
                type="button"
                onClick={handleClear}
                className="
                  p-2 mr-4 text-gray-400 hover:text-red-500 
                  transition-colors duration-200 rounded-full 
                  hover:bg-red-50 dark:hover:bg-red-900/20
                "
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </form>

      <AnimatePresence>
        {isFocused && !query && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="
              absolute top-full left-0 right-0 mt-2 p-4 
              bg-white dark:bg-gray-800 rounded-xl shadow-lg 
              border border-gray-200 dark:border-gray-700 z-50
            "
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              💡 Dicas de pesquisa:
            </p>
            <ul className="text-sm text-gray-500 dark:text-gray-500 space-y-1">
              <li>• Tente nomes de filmes como &quot;Vingadores&quot; ou &quot;Titanic&quot;</li>
              <li>• Use nomes de atores como &quot;Leonardo DiCaprio&quot;</li>
              <li>• Ou diretores como &quot;Christopher Nolan&quot;</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}; 