'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';
import Image from 'next/image';

export default function MoviesManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedMovies, setSelectedMovies] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: '',
    genre: '',
    year: '',
    duration: '',
    rating: '',
    poster: '',
    description: '',
    director: '',
    cast: '',
    trailerUrl: ''
  });

  const movies = [
    {
      id: '1',
      title: 'Inception',
      genre: 'Sci-Fi',
      year: 2010,
      duration: '148 min',
      rating: 8.8,
      status: 'Published',
      views: '2.4M',
      dateAdded: '2024-01-15',
      poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg'
    },
    {
      id: '2',
      title: 'The Dark Knight',
      genre: 'Action',
      year: 2008,
      duration: '152 min',
      rating: 9.0,
      status: 'Published',
      views: '3.1M',
      dateAdded: '2024-01-12',
      poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg'
    },
    {
      id: '3',
      title: 'Interstellar',
      genre: 'Sci-Fi',
      year: 2014,
      duration: '169 min',
      rating: 8.6,
      status: 'Published',
      views: '1.9M',
      dateAdded: '2024-01-10',
      poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'
    },
    {
      id: '4',
      title: 'Pulp Fiction',
      genre: 'Crime',
      year: 1994,
      duration: '154 min',
      rating: 8.9,
      status: 'Published',
      views: '1.7M',
      dateAdded: '2024-01-08',
      poster: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg'
    },
    {
      id: '5',
      title: 'The Matrix',
      genre: 'Sci-Fi',
      year: 1999,
      duration: '136 min',
      rating: 8.7,
      status: 'Draft',
      views: '1.5M',
      dateAdded: '2024-01-05',
      poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg'
    },
    {
      id: '6',
      title: 'Fight Club',
      genre: 'Drama',
      year: 1999,
      duration: '139 min',
      rating: 8.8,
      status: 'Published',
      views: '1.4M',
      dateAdded: '2024-01-03',
      poster: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'
    }
  ];

  const genres = ['All', 'Action', 'Comedy', 'Drama', 'Sci-Fi', 'Crime', 'Thriller', 'Romance'];

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || movie.genre.toLowerCase() === selectedGenre.toLowerCase();
    return matchesSearch && matchesGenre;
  });

  const handleSelectMovie = (movieId: string) => {
    setSelectedMovies(prev => 
      prev.includes(movieId) 
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMovies.length === filteredMovies.length) {
      setSelectedMovies([]);
    } else {
      setSelectedMovies(filteredMovies.map(movie => movie.id));
    }
  };

  const handleAddMovie = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the data to your backend
    console.log('Adding new movie:', newMovie);
    
    // Reset form and close modal
    setNewMovie({
      title: '',
      genre: '',
      year: '',
      duration: '',
      rating: '',
      poster: '',
      description: '',
      director: '',
      cast: '',
      trailerUrl: ''
    });
    setShowAddModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMovie(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          title="Movies Management"
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
                    placeholder="Search movies..."
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
              {selectedMovies.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{selectedMovies.length} selected</span>
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

          {/* Movies Grid */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">All Movies ({filteredMovies.length})</h3>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center px-4 py-2 bg-[#F56D22] text-white rounded-lg hover:bg-[#E55A1C] transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Movie
                </button>
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
              {filteredMovies.map((movie) => (
                <div key={movie.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="relative mb-4">
                    <input
                      type="checkbox"
                      checked={selectedMovies.includes(movie.id)}
                      onChange={() => handleSelectMovie(movie.id)}
                      className="absolute top-2 left-2 rounded border-gray-300 text-[#F56D22] focus:ring-[#F56D22] z-10"
                    />
                    <div className="w-full h-64 rounded-lg overflow-hidden">
                      <Image
                        src={movie.poster}
                        alt={movie.title}
                        width={300}
                        height={450}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${
                      movie.status === 'Published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {movie.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 truncate">{movie.title}</h4>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{movie.year}</span>
                      <span>{movie.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{movie.genre}</span>
                      <span className="text-yellow-600">★ {movie.rating}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{movie.views} views</span>
                      <span>{movie.dateAdded}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Edit
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
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredMovies.length}</span> of{' '}
              <span className="font-medium">{movies.length}</span> results
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

      {/* Add Movie Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col relative">
            {/* Close Button */}
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header with Icon */}
            <div className="text-center pt-8 pb-6 px-6">
              <div className="w-16 h-16 bg-gradient-to-r from-[#F56D22] to-[#E55A1C] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4l-2 14h14L17 4M9 9v6m6-6v6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Add New Movie</h3>
              <p className="text-gray-600 text-sm">Fill in the details below to add a new movie to your collection</p>
            </div>

                        <div className="flex-1 overflow-y-auto">
              <form onSubmit={handleAddMovie} className="px-6 pb-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Movie Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={newMovie.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F56D22] focus:border-[#F56D22] transition-all duration-200 text-gray-800 placeholder-gray-400"
                      placeholder="Enter movie title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Genre *
                    </label>
                    <select
                      name="genre"
                      value={newMovie.genre}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F56D22] focus:border-[#F56D22] transition-all duration-200 text-gray-800 bg-white"
                    >
                      <option value="">Select Genre</option>
                      <option value="Action">Action</option>
                      <option value="Comedy">Comedy</option>
                      <option value="Drama">Drama</option>
                      <option value="Sci-Fi">Sci-Fi</option>
                      <option value="Crime">Crime</option>
                      <option value="Thriller">Thriller</option>
                      <option value="Romance">Romance</option>
                      <option value="Horror">Horror</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Animation">Animation</option>
                    </select>
                  </div>

                                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Release Year *
                    </label>
                    <input
                      type="number"
                      name="year"
                      value={newMovie.year}
                      onChange={handleInputChange}
                      required
                      min="1900"
                      max="2030"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F56D22] focus:border-[#F56D22] transition-all duration-200 text-gray-800 placeholder-gray-400"
                      placeholder="2024"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Duration *
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={newMovie.duration}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F56D22] focus:border-[#F56D22] transition-all duration-200 text-gray-800 placeholder-gray-400"
                      placeholder="120 min"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Rating (1-10)
                    </label>
                    <input
                      type="number"
                      name="rating"
                      value={newMovie.rating}
                      onChange={handleInputChange}
                      min="1"
                      max="10"
                      step="0.1"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F56D22] focus:border-[#F56D22] transition-all duration-200 text-gray-800 placeholder-gray-400"
                      placeholder="8.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Director
                    </label>
                    <input
                      type="text"
                      name="director"
                      value={newMovie.director}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F56D22] focus:border-[#F56D22] transition-all duration-200 text-gray-800 placeholder-gray-400"
                      placeholder="Director name"
                    />
                  </div>
              </div>

                              <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Poster URL
                  </label>
                  <input
                    type="url"
                    name="poster"
                    value={newMovie.poster}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F56D22] focus:border-[#F56D22] transition-all duration-200 text-gray-800 placeholder-gray-400"
                    placeholder="https://example.com/poster.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Cast
                  </label>
                  <input
                    type="text"
                    name="cast"
                    value={newMovie.cast}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F56D22] focus:border-[#F56D22] transition-all duration-200 text-gray-800 placeholder-gray-400"
                    placeholder="Actor 1, Actor 2, Actor 3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Trailer URL
                  </label>
                  <input
                    type="url"
                    name="trailerUrl"
                    value={newMovie.trailerUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F56D22] focus:border-[#F56D22] transition-all duration-200 text-gray-800 placeholder-gray-400"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={newMovie.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F56D22] focus:border-[#F56D22] transition-all duration-200 text-gray-800 placeholder-gray-400 resize-none"
                    placeholder="Movie description..."
                  />
                </div>

                              <div className="flex items-center justify-center space-x-4 pt-8 pb-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold min-w-[120px]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-[#F56D22] to-[#E55A1C] text-white rounded-xl hover:from-[#E55A1C] hover:to-[#D4511A] transition-all duration-200 font-semibold shadow-lg min-w-[120px]"
                  >
                    Add Movie
                  </button>
                </div>
             </form>
           </div>
           </div>
         </div>
       )}
    </div>
  );
} 