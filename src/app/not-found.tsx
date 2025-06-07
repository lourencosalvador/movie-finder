'use client';

import { motion } from 'framer-motion';
import { Film, Home, Search } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
      <div className="text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              className="text-9xl md:text-[12rem] font-bold text-gray-200 dark:text-gray-800"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              404
            </motion.div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              <Film className="w-16 h-16 md:w-24 md:h-24 text-purple-600" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Oops! Página não encontrada
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
            Parece que o filme que você está procurando saiu de cartaz. Que tal explorar nosso catálogo?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <motion.button
              className="
                flex items-center justify-center gap-3 px-8 py-4 
                bg-gradient-to-r from-purple-600 to-blue-600 text-white 
                font-semibold rounded-2xl shadow-lg hover:shadow-xl
                transition-all duration-300 w-full sm:w-auto
              "
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Home className="w-5 h-5" />
              Voltar ao Início
            </motion.button>
          </Link>

          <Link href="/">
            <motion.button
              className="
                flex items-center justify-center gap-3 px-8 py-4 
                bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                font-semibold rounded-2xl shadow-lg hover:shadow-xl
                border border-gray-200 dark:border-gray-700
                transition-all duration-300 w-full sm:w-auto
              "
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Search className="w-5 h-5" />
              Buscar Filmes
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-purple-200 dark:bg-purple-900 rounded-full opacity-20"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 bg-blue-200 dark:bg-blue-900 rounded-full opacity-20"
          animate={{ 
            x: [0, -20, 0],
            y: [0, 20, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-20 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full opacity-10 blur-3xl animate-pulse delay-500" />
      </div>
    </div>
  );
} 