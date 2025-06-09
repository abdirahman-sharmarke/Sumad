'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';
import Image from 'next/image';

export default function TVShowsManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedShows, setSelectedShows] = useState<string[]>([]);

  // Mock TV Shows data
  const shows = [
    {
      id: '1',
      title: 'Stranger Things',
      genre: 'Sci-Fi',
      year: '2016',
      seasons: 4,
      episodes: 42,
      rating: 8.7,
      status: 'Published',
      views: '2.1M',
      dateAdded: '2024-01-20',
      poster: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg'
    },
    {
      id: '2',
      title: 'The Bear',
      genre: 'Comedy',
      year: '2022',
      seasons: 3,
      episodes: 28,
      rating: 8.9,
      status: 'Published',
      views: '1.8M',
      dateAdded: '2024-01-19',
      poster: 'https://image.tmdb.org/t/p/w500/sHFlbKS3WLqVcv9bCQauemzSn93.jpg'
    },
    {
      id: '3',
      title: 'House of the Dragon',
      genre: 'Fantasy',
      year: '2022',
      seasons: 2,
      episodes: 18,
      rating: 8.4,
      status: 'Published',
      views: '3.2M',
      dateAdded: '2024-01-18',
      poster: 'https://image.tmdb.org/t/p/w500/7QMsOTMUswlwxJP0rTTZfmz2tX2.jpg'
    },
    {
      id: '4',
      title: 'Wednesday',
      genre: 'Horror',
      year: '2022',
      seasons: 1,
      episodes: 8,
      rating: 8.1,
      status: 'Published',
      views: '2.8M',
      dateAdded: '2024-01-17',
      poster: 'https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg'
    },
    {
      id: '5',
      title: 'The Last of Us',
      genre: 'Drama',
      year: '2023',
      seasons: 1,
      episodes: 9,
      rating: 8.8,
      status: 'Published',
      views: '2.5M',
      dateAdded: '2024-01-16',
      poster: 'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg'
    },
    {
      id: '6',
      title: 'Breaking Bad',
      genre: 'Crime',
      year: '2008',
      seasons: 5,
      episodes: 62,
      rating: 9.5,
      status: 'Published',
      views: '4.1M',
      dateAdded: '2024-01-15',
      poster: 'https://image.tmdb.org/t/p/w500/3xnWaLQjelJDDF7LT1WBo6f4BRe.jpg'
    }
  ];

  const genres = ['All', 'Action', 'Comedy', 'Drama', 'Sci-Fi', 'Crime', 'Thriller', 'Fantasy', 'Horror'];

  const filteredShows = shows.filter(show => {
    const matchesSearch = show.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || show.genre.toLowerCase() === selectedGenre.toLowerCase();
    return matchesSearch && matchesGenre;
  });

  const handleSelectShow = (showId: string) => {
    setSelectedShows(prev => 
      prev.includes(showId) 
        ? prev.filter(id => id !== showId)
        : [...prev, showId]
    );
  };



  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          title="TV Shows Management"
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          showMenuButton={true}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search TV shows..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F56D22] focus:border-transparent w-full sm:w-80"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F56D22] focus:border-transparent"
                >
                  {genres.map(genre => (
                    <option key={genre} value={genre.toLowerCase()}>{genre}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-3">
                <button className="bg-[#F56D22] text-white px-4 py-2 rounded-lg hover:bg-[#E55A1C] transition-colors">
                  Add New Show
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Import Shows
                </button>
              </div>
              {selectedShows.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{selectedShows.length} selected</span>
                  <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                    Delete
                  </button>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                    Publish
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* TV Shows Grid */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">All TV Shows ({filteredShows.length})</h3>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredShows.map((show) => (
                <div key={show.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="relative mb-4">
                    <input
                      type="checkbox"
                      checked={selectedShows.includes(show.id)}
                      onChange={() => handleSelectShow(show.id)}
                      className="absolute top-2 left-2 rounded border-gray-300 text-[#F56D22] focus:ring-[#F56D22] z-10"
                    />
                    <div className="w-full h-64 rounded-lg overflow-hidden">
                      <Image
                        src={show.poster}
                        alt={show.title}
                        width={300}
                        height={450}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${
                      show.status === 'Published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {show.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 truncate">{show.title}</h4>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{show.year}</span>
                      <span>{show.seasons} Season{show.seasons > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{show.genre}</span>
                      <span className="text-yellow-600">★ {show.rating}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{show.episodes} Episodes</span>
                      <span>{show.views} views</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Added: {show.dateAdded}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Edit
                    </button>
                    <button className="flex items-center text-green-600 hover:text-green-800 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Episodes
                    </button>
                    <button className="flex items-center text-red-600 hover:text-red-800 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredShows.length}</span> of{' '}
              <span className="font-medium">{shows.length}</span> results
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-2 text-sm font-medium text-white bg-[#F56D22] border border-transparent rounded-md hover:bg-[#E55A1C]">
                1
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
