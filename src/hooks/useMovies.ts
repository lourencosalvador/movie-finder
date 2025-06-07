import { useState, useEffect, useCallback } from 'react';
import { Movie, searchMovies, getPopularMovies, SearchResponse } from '@/lib/api';

interface CachedData {
  data: SearchResponse;
  timestamp: number;
  query: string;
  page: number;
}

interface UseMoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  searchQuery: string;
  currentPage: number;
}

const CACHE_DURATION = 5 * 60 * 1000;
const cache = new Map<string, CachedData>();

export const useMovies = () => {
  const [state, setState] = useState<UseMoviesState>({
    movies: [],
    loading: false,
    error: null,
    hasMore: true,
    searchQuery: '',
    currentPage: 1,
  });

  const getCacheKey = (query: string, page: number) => `${query}-${page}`;

  const isValidCache = (cached: CachedData): boolean => {
    return Date.now() - cached.timestamp < CACHE_DURATION;
  };

  const setCache = (query: string, page: number, data: SearchResponse) => {
    const key = getCacheKey(query, page);
    cache.set(key, { data, timestamp: Date.now(), query, page });
  };

  const loadMovies = useCallback(async (query: string, page: number, append: boolean = false) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const cacheKey = getCacheKey(query, page);
      const cached = cache.get(cacheKey);
      
      if (cached && isValidCache(cached)) {
        setState(prev => ({
          ...prev,
          movies: append ? [...prev.movies, ...cached.data.results] : cached.data.results,
          hasMore: cached.data.page < cached.data.total_pages,
          loading: false,
          currentPage: page,
        }));
        return;
      }

      const response = query 
        ? await searchMovies(query, page)
        : await getPopularMovies(page);

      setCache(query, page, response);

      setState(prev => ({
        ...prev,
        movies: append ? [...prev.movies, ...response.results] : response.results,
        hasMore: response.page < response.total_pages,
        loading: false,
        currentPage: page,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Erro ao carregar filmes',
        loading: false,
      }));
    }
  }, []);

  const searchMoviesHandler = useCallback((query: string) => {
    setState(prev => ({ ...prev, searchQuery: query, currentPage: 1 }));
    loadMovies(query, 1, false);
  }, [loadMovies]);

  const loadMore = useCallback(() => {
    const nextPage = state.currentPage + 1;
    loadMovies(state.searchQuery, nextPage, true);
  }, [state.searchQuery, state.currentPage, loadMovies]);

  const resetSearch = useCallback(() => {
    setState(prev => ({ ...prev, searchQuery: '', currentPage: 1 }));
    loadMovies('', 1, false);
  }, [loadMovies]);

  useEffect(() => {
    loadMovies('', 1, false);
  }, [loadMovies]);

  return {
    movies: state.movies,
    loading: state.loading,
    error: state.error,
    hasMore: state.hasMore,
    searchQuery: state.searchQuery,
    searchMovies: searchMoviesHandler,
    loadMore,
    resetSearch,
  };
}; 