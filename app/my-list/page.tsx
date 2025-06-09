'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/header';

interface SavedContent {
  id: number;
  title: string;
  poster: string;
  year: string;
  duration: string;
  type: 'Movie' | 'TV Show';
  genre: string;
  rating: string;
  dateAdded: string;
  watchProgress?: number;
}

export default function MyList() {
  const [sortBy, setSortBy] = useState<'date-added' | 'title' | 'year' | 'rating'>('date-added');

  const handleLogout = () => {
    window.location.href = '/';
  };

  const savedContent: SavedContent[] = [
    {
      id: 1,
      title: 'Breaking Bad',
      poster: 'https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg',
      year: '2008',
      duration: '5 Seasons',
      type: 'TV Show',
      genre: 'Crime',
      rating: '9.5',
      dateAdded: '2024-01-15',
      watchProgress: 85
    },
    {
      id: 2,
      title: 'Inception',
      poster: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
      year: '2010',
      duration: '2h 28m',
      type: 'Movie',
      genre: 'Sci-Fi',
      rating: '8.8',
      dateAdded: '2024-01-10',
      watchProgress: 45
    },
    {
      id: 3,
      title: 'Stranger Things',
      poster: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
      year: '2016',
      duration: '4 Seasons',
      type: 'TV Show',
      genre: 'Sci-Fi',
      rating: '8.7',
      dateAdded: '2024-01-12'
    },
    {
      id: 4,
      title: 'The Dark Knight',
      poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      year: '2008',
      duration: '2h 32m',
      type: 'Movie',
      genre: 'Action',
      rating: '9.0',
      dateAdded: '2024-01-08'
    },
    {
      id: 5,
      title: 'The Crown',
      poster: 'https://image.tmdb.org/t/p/w500/1M876KPjulVwppEpldhdc8V4o68.jpg',
      year: '2016',
      duration: '6 Seasons',
      type: 'TV Show',
      genre: 'Drama',
      rating: '8.6',
      dateAdded: '2024-01-05',
      watchProgress: 20
    },
    {
      id: 6,
      title: 'Interstellar',
      poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      year: '2014',
      duration: '2h 49m',
      type: 'Movie',
      genre: 'Sci-Fi',
      rating: '8.6',
      dateAdded: '2024-01-03'
    }
  ];

  const getSortedContent = () => {
    const sorted = [...savedContent];
    switch (sortBy) {
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'year':
        return sorted.sort((a, b) => parseInt(b.year) - parseInt(a.year));
      case 'rating':
        return sorted.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      case 'date-added':
      default:
        return sorted.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    }
  };

  const sortedContent = getSortedContent();

  const removeFromList = (id: number) => {
    // Handle remove from list logic here
    alert(`Removed item ${id} from your list`);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header onLogout={handleLogout} />
      
      <div className="pt-20 px-4 md:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-light text-white mb-2">My List</h1>
            <div className="w-16 h-1 bg-[#F56D22]"></div>
            <p className="text-gray-400 mt-3">{savedContent.length} titles</p>
          </div>

          {/* Sort Options */}
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <span className="text-white text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date-added' | 'title' | 'year' | 'rating')}
                className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#F56D22]"
              >
                <option value="date-added">Date Added</option>
                <option value="title">Title</option>
                <option value="year">Year</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {sortedContent.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <Image
                    src={item.poster}
                    alt={item.title}
                    width={300}
                    height={450}
                    className="w-full h-auto aspect-[2/3] object-cover"
                  />
                  
                  {/* Watch Progress Bar */}
                  {item.watchProgress && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-80">
                      <div 
                        className="bg-[#F56D22] h-1"
                        style={{ width: `${item.watchProgress}%` }}
                      ></div>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                      <button className="bg-white text-black rounded-full p-3 hover:bg-gray-200 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => removeFromList(item.id)}
                        className="bg-gray-800 text-white rounded-full p-3 hover:bg-gray-700 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-white">
                  <h3 className="font-medium text-sm mb-1 line-clamp-2">{item.title}</h3>
                  <div className="text-gray-400 text-xs space-y-1">
                    <div>{item.year}</div>
                    <div>{item.duration}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#F56D22]">★ {item.rating}</span>
                      <span className="bg-gray-800 px-2 py-1 rounded text-xs">{item.genre}</span>
                    </div>
                    {item.watchProgress && (
                      <div className="text-[#F56D22] text-xs">
                        {item.watchProgress}% watched
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {savedContent.length === 0 && (
            <div className="text-center py-20">
              <div className="text-gray-400 text-6xl mb-4">📺</div>
              <h2 className="text-white text-2xl font-medium mb-2">Your list is empty</h2>
              <p className="text-gray-400 mb-6">Add movies and TV shows to your list to watch them later</p>
              <button 
                onClick={() => window.location.href = '/movies'}
                className="bg-[#F56D22] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#E5611F] transition-colors"
              >
                Browse Movies
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 