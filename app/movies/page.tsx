'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/header';

interface Movie {
  id: number;
  title: string;
  poster: string;
  year: string;
  duration: string;
  genre: string;
  rating: string;
}

export default function Movies() {
  const [selectedGenre, setSelectedGenre] = useState('All');

  const handleLogout = () => {
    window.location.href = '/';
  };

  const genres = ['All', 'Action', 'Drama', 'Comedy', 'Thriller', 'Sci-Fi', 'Romance', 'Crime'];

  const movies: Movie[] = [
    {
      id: 1,
      title: 'Inception',
      poster: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
      year: '2010',
      duration: '2h 28m',
      genre: 'Sci-Fi',
      rating: '8.8'
    },
    {
      id: 2,
      title: 'The Dark Knight',
      poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      year: '2008',
      duration: '2h 32m',
      genre: 'Action',
      rating: '9.0'
    },
    {
      id: 3,
      title: 'Interstellar',
      poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      year: '2014',
      duration: '2h 49m',
      genre: 'Sci-Fi',
      rating: '8.6'
    },
    {
      id: 4,
      title: 'Pulp Fiction',
      poster: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
      year: '1994',
      duration: '2h 34m',
      genre: 'Crime',
      rating: '8.9'
    },
    {
      id: 5,
      title: 'The Matrix',
      poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
      year: '1999',
      duration: '2h 16m',
      genre: 'Sci-Fi',
      rating: '8.7'
    },
    {
      id: 6,
      title: 'Fight Club',
      poster: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
      year: '1999',
      duration: '2h 19m',
      genre: 'Drama',
      rating: '8.8'
    },
    {
      id: 7,
      title: 'Forrest Gump',
      poster: 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
      year: '1994',
      duration: '2h 22m',
      genre: 'Drama',
      rating: '8.8'
    },
    {
      id: 8,
      title: 'The Godfather',
      poster: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      year: '1972',
      duration: '2h 55m',
      genre: 'Crime',
      rating: '9.2'
    },
    {
      id: 9,
      title: 'Titanic',
      poster: 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
      year: '1997',
      duration: '3h 14m',
      genre: 'Romance',
      rating: '7.9'
    },
    {
      id: 10,
      title: 'Avatar',
      poster: 'https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg',
      year: '2009',
      duration: '2h 42m',
      genre: 'Sci-Fi',
      rating: '7.9'
    },
    {
      id: 11,
      title: 'Avengers: Endgame',
      poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
      year: '2019',
      duration: '3h 1m',
      genre: 'Action',
      rating: '8.4'
    },
    {
      id: 12,
      title: 'Parasite',
      poster: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
      year: '2019',
      duration: '2h 12m',
      genre: 'Thriller',
      rating: '8.5'
    },
    {
      id: 13,
      title: 'Joker',
      poster: 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
      year: '2019',
      duration: '2h 2m',
      genre: 'Drama',
      rating: '8.4'
    },
    {
      id: 14,
      title: 'Spider-Man: No Way Home',
      poster: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
      year: '2021',
      duration: '2h 28m',
      genre: 'Action',
      rating: '8.2'
    },
    {
      id: 15,
      title: 'Top Gun: Maverick',
      poster: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
      year: '2022',
      duration: '2h 11m',
      genre: 'Action',
      rating: '8.3'
    }
  ];

  const filteredMovies = selectedGenre === 'All' 
    ? movies 
    : movies.filter(movie => movie.genre === selectedGenre);

  return (
    <div className="min-h-screen bg-black">
      <Header onLogout={handleLogout} />
      
      <div className="pt-20 px-4 md:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-light text-white mb-2">Movies</h1>
            <div className="w-16 h-1 bg-[#F56D22]"></div>
          </div>

          {/* Genre Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-4 py-2 rounded-full border transition-colors ${
                    selectedGenre === genre
                      ? 'bg-[#F56D22] text-white border-[#F56D22]'
                      : 'bg-transparent text-white border-gray-600 hover:border-gray-400'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Movies Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    width={300}
                    height={450}
                    className="w-full h-auto aspect-[2/3] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <button className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button className="bg-gray-600/80 text-white rounded-full p-2 hover:bg-gray-500 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                        <button className="bg-gray-600/80 text-white rounded-full p-2 hover:bg-gray-500 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-white">
                  <h3 className="font-medium text-sm mb-1 line-clamp-2">{movie.title}</h3>
                  <div className="text-gray-400 text-xs space-y-1">
                    <div>{movie.year}</div>
                    <div>{movie.duration}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#F56D22]">★ {movie.rating}</span>
                      <span className="bg-gray-800 px-2 py-1 rounded text-xs">{movie.genre}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 