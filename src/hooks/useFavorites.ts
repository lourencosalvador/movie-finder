import { useState, useEffect, useCallback } from 'react';
import { Movie } from '@/lib/api';

const FAVORITES_KEY = 'moviefinder_favorites_complete';

export interface FavoriteMovie extends Movie {
  favoriteDate: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);
        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveFavorites = useCallback((newFavorites: FavoriteMovie[]) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
    }
  }, []);

  const isFavorite = useCallback((movieId: number): boolean => {
    return favorites.some(fav => fav.id === movieId);
  }, [favorites]);

  const addToFavorites = useCallback((movie: Movie) => {
    if (!isFavorite(movie.id)) {
      const favoriteMovie: FavoriteMovie = {
        ...movie,
        favoriteDate: new Date().toISOString()
      };
      const newFavorites = [favoriteMovie, ...favorites];
      saveFavorites(newFavorites);
    }
  }, [favorites, isFavorite, saveFavorites]);

  const removeFromFavorites = useCallback((movieId: number) => {
    const newFavorites = favorites.filter(fav => fav.id !== movieId);
    saveFavorites(newFavorites);
  }, [favorites, saveFavorites]);

  const toggleFavorite = useCallback((movie: Movie) => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  }, [isFavorite, addToFavorites, removeFromFavorites]);

  const clearFavorites = useCallback(() => {
    localStorage.removeItem(FAVORITES_KEY);
    setFavorites([]);
  }, []);

  const getFavoritesSorted = useCallback((sortBy: 'date' | 'title' | 'rating' = 'date') => {
    const sorted = [...favorites].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'rating':
          return b.vote_average - a.vote_average;
        case 'date':
        default:
          return new Date(b.favoriteDate).getTime() - new Date(a.favoriteDate).getTime();
      }
    });
    return sorted;
  }, [favorites]);

  return {
    favorites,
    loading,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    clearFavorites,
    getFavoritesSorted,
    favoritesCount: favorites.length
  };
}; 