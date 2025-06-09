'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/header';

interface TVShow {
  id: number;
  title: string;
  poster: string;
  year: string;
  seasons: string;
  genre: string;
  rating: string;
}

export default function TVShows() {
  const [selectedGenre, setSelectedGenre] = useState('All');

  const handleLogout = () => {
    window.location.href = '/';
  };

  const genres = ['All', 'Drama', 'Comedy', 'Action', 'Thriller', 'Sci-Fi', 'Crime', 'Fantasy'];

  const tvShows: TVShow[] = [
    {
      id: 1,
      title: 'Breaking Bad',
      poster: 'https://images.unsplash.com/photo-1489599856405-8c8ea5b7a27c?w=300&h=450&fit=crop&crop=faces',
      year: '2008-2013',
      seasons: '5 Seasons',
      genre: 'Crime',
      rating: '9.5'
    },
    {
      id: 2,
      title: 'Stranger Things',
      poster: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=450&fit=crop&crop=center',
      year: '2016-2025',
      seasons: '4 Seasons',
      genre: 'Sci-Fi',
      rating: '8.7'
    },
    {
      id: 3,
      title: 'The Crown',
      poster: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop&crop=center',
      year: '2016-2023',
      seasons: '6 Seasons',
      genre: 'Drama',
      rating: '8.6'
    },
    {
      id: 4,
      title: 'Money Heist',
      poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop&crop=center',
      year: '2017-2021',
      seasons: '5 Seasons',
      genre: 'Action',
      rating: '8.2'
    },
    {
      id: 5,
      title: 'Dark',
      poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop&crop=faces',
      year: '2017-2020',
      seasons: '3 Seasons',
      genre: 'Sci-Fi',
      rating: '8.8'
    },
    {
      id: 6,
      title: 'The Witcher',
      poster: 'https://images.unsplash.com/photo-1533563906091-fdfdffc3e3c4?w=300&h=450&fit=crop&crop=center',
      year: '2019-Present',
      seasons: '3 Seasons',
      genre: 'Fantasy',
      rating: '8.0'
    },
    {
      id: 7,
      title: 'Ozark',
      poster: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=450&fit=crop&crop=center',
      year: '2017-2022',
      seasons: '4 Seasons',
      genre: 'Crime',
      rating: '8.4'
    },
    {
      id: 8,
      title: 'Narcos',
      poster: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=300&h=450&fit=crop&crop=center',
      year: '2015-2017',
      seasons: '3 Seasons',
      genre: 'Crime',
      rating: '8.8'
    },
    {
      id: 9,
      title: 'Game of Thrones',
      poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop&crop=center',
      year: '2011-2019',
      seasons: '8 Seasons',
      genre: 'Fantasy',
      rating: '9.2'
    },
    {
      id: 10,
      title: 'The Office',
      poster: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=300&h=450&fit=crop&crop=center',
      year: '2005-2013',
      seasons: '9 Seasons',
      genre: 'Comedy',
      rating: '8.8'
    },
    {
      id: 11,
      title: 'Friends',
      poster: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=450&fit=crop&crop=center',
      year: '1994-2004',
      seasons: '10 Seasons',
      genre: 'Comedy',
      rating: '8.9'
    },
    {
      id: 12,
      title: 'The Mandalorian',
      poster: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=450&fit=crop&crop=center',
      year: '2019-Present',
      seasons: '3 Seasons',
      genre: 'Sci-Fi',
      rating: '8.7'
    }
  ];

  const filteredShows = selectedGenre === 'All' 
    ? tvShows 
    : tvShows.filter(show => show.genre === selectedGenre);

  return (
    <div className="min-h-screen bg-black">
      <Header onLogout={handleLogout} />
      
      <div className="pt-20 px-4 md:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-light text-white mb-2">TV Shows</h1>
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

          {/* TV Shows Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredShows.map((show) => (
              <div
                key={show.id}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <Image
                    src={show.poster}
                    alt={show.title}
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
                  <h3 className="font-medium text-sm mb-1 line-clamp-2">{show.title}</h3>
                  <div className="text-gray-400 text-xs space-y-1">
                    <div>{show.year}</div>
                    <div>{show.seasons}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#F56D22]">★ {show.rating}</span>
                      <span className="bg-gray-800 px-2 py-1 rounded text-xs">{show.genre}</span>
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