import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "MovieFinder - Descubra seus filmes favoritos",
  description: "Descubra, explore e encontre seus filmes favoritos com o MovieFinder. Uma experiência moderna e elegante para explorar o mundo do cinema.",
  keywords: ["filmes", "cinema", "movies", "entertainment", "tmdb"],
  authors: [{ name: "MovieFinder Team" }],
  creator: "MovieFinder",
  publisher: "MovieFinder",
  robots: "index, follow",
  openGraph: {
    title: "MovieFinder - Descubra seus filmes favoritos",
    description: "Descubra, explore e encontre seus filmes favoritos com o MovieFinder.",
    type: "website",
    locale: "pt_BR",
    siteName: "MovieFinder",
  },
  twitter: {
    card: "summary_large_image",
    title: "MovieFinder - Descubra seus filmes favoritos",
    description: "Descubra, explore e encontre seus filmes favoritos com o MovieFinder.",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#8b5cf6" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2937" }
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />
        <meta name="theme-color" content="#8b5cf6" />
      </head>
      <body className={`${inter.className} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}>
        <main className="min-h-screen">
          {children}
        </main>
        
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-blue-50/30 to-indigo-100/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        </div>
        
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-indigo-600/20"></div>
      </body>
    </html>
  );
}
