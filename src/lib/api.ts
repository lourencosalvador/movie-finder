import axios from 'axios';

const API_KEY = '2a3654fa74226cb969c407ae48a633e6';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR'
  }
});

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  popularity: number;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
  vote_count: number;
  homepage: string | null;
}

export interface Genre {
  id: number;
  name: string;
}

export interface SearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  published_at: string;
}

export interface VideosResponse {
  id: number;
  results: MovieVideo[];
}

export const searchMovies = async (query: string, page: number = 1): Promise<SearchResponse> => {
  const response = await api.get('/search/movie', {
    params: { query, page }
  });
  return response.data;
};

export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  const response = await api.get(`/movie/${id}`);
  return response.data;
};

export const getPopularMovies = async (page: number = 1): Promise<SearchResponse> => {
  const response = await api.get('/movie/popular', {
    params: { page }
  });
  return response.data;
};

export const getTrendingMovies = async (): Promise<SearchResponse> => {
  const response = await api.get('/trending/movie/week');
  return response.data;
};

export const getMoviesByGenre = async (genreId: number, page: number = 1): Promise<SearchResponse> => {
  const response = await api.get('/discover/movie', {
    params: { with_genres: genreId, page }
  });
  return response.data;
};

export const getGenres = async (): Promise<Genre[]> => {
  const response = await api.get('/genre/movie/list');
  return response.data.genres;
};

export const getMovieVideos = async (id: number): Promise<VideosResponse> => {
  const response = await api.get(`/movie/${id}/videos`);
  return response.data;
};

export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '/placeholder-movie.jpg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path: string | null): string => {
  if (!path) return '/placeholder-backdrop.jpg';
  return `${IMAGE_BASE_URL}/w1280${path}`;
}; 