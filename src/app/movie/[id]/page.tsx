'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Star, 
  Play, 
  Heart, 
  Share2,
  ExternalLink
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getMovieDetails, getImageUrl, MovieDetails } from '@/lib/api';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useFavorites } from '@/hooks/useFavorites';
import { TrailerModal } from '@/components/TrailerModal';

export default function MovieDetailsPage() {
  const params = useParams();
  const movieId = parseInt(params.id as string);
  
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTrailerModal, setShowTrailerModal] = useState(false);

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const movieData = await getMovieDetails(movieId);
      setMovie(movieData);
    } catch (err) {
      console.error('Erro ao buscar detalhes do filme:', err);
      setError('Erro ao carregar detalhes do filme');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share && movie) {
      try {
        await navigator.share({
          title: movie.title,
          text: `Confira este filme: ${movie.title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Erro ao compartilhar:', err);
      }
    } else if (movie) {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Carregando detalhes do filme..." />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Filme não encontrado
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {error || 'O filme que você está procurando não foi encontrado.'}
          </p>
          <Link href="/">
            <motion.button
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar ao Início
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="relative">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={getImageUrl(movie.backdrop_path, 'original')}
              alt={movie.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40" />
          </div>

          <div className="relative z-10 container mx-auto px-4 py-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <Link href="/">
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm text-white rounded-xl hover:bg-black/70 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                  Voltar
                </motion.button>
              </Link>

              <div className="flex items-center gap-3">
                <motion.button
                  onClick={() => toggleFavorite(movie)}
                  className={`p-3 rounded-xl backdrop-blur-sm transition-colors ${
                    isFavorite(movie.id)
                      ? 'bg-red-500/90 text-white'
                      : 'bg-black/50 text-white hover:bg-red-500/90'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className={`w-6 h-6 ${isFavorite(movie.id) ? 'fill-current' : ''}`} />
                </motion.button>

                <motion.button
                  onClick={handleShare}
                  className="p-3 bg-black/50 backdrop-blur-sm text-white rounded-xl hover:bg-black/70 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          <div className="relative z-10 container mx-auto px-4 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="aspect-[2/3] max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={getImageUrl(movie.poster_path)}
                    alt={movie.title}
                    width={400}
                    height={600}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2 text-white"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {movie.title}
                </h1>

                {movie.tagline && (
                  <p className="text-xl text-gray-300 italic mb-6">
                    &quot;{movie.tagline}&quot;
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                    <span className="text-gray-300">({movie.vote_count.toLocaleString()})</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <motion.button
                    onClick={() => setShowTrailerModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-5 h-5" />
                    Assistir Trailer
                  </motion.button>

                  {movie.homepage && (
                    <motion.a
                      href={movie.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-5 h-5" />
                      Site Oficial
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {showTrailerModal && (
        <TrailerModal
          isOpen={showTrailerModal}
          onClose={() => setShowTrailerModal(false)}
          movieId={movie.id}
          movieTitle={movie.title}
        />
      )}
    </>
  );
} 