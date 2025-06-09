'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/footer';

interface Video {
  id: number;
  title: string;
  description?: string;
  duration?: string;
  genre?: string;
  year?: number;
  rating?: string;
  poster?: string;
}

export default function Dashboard() {
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mock video data - in real app, this would come from API
  const featuredVideo = {
    id: 1,
    title: "Teskilat",
    description: "An elite intelligence organization fights against terrorism and national threats to protect Turkey. Follow the dangerous missions and personal sacrifices of the agents who risk everything for their country in this gripping Turkish drama series.",
    duration: "120m per episode",
    rating: "TV-14",
    year: 2021
  };

  const continueWatching: Video[] = [
    { id: 1, title: "Breaking Bad", description: "Crime Drama", duration: "45m", genre: "Drama", poster: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg" },
    { id: 2, title: "Stranger Things", description: "Sci-Fi Horror", duration: "50m", genre: "Horror", poster: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg" },
    { id: 3, title: "The Crown", description: "Historical Drama", duration: "55m", genre: "Drama", poster: "https://image.tmdb.org/t/p/w500/1M876KPjulVwppEpldhdc8V4o68.jpg" },
    { id: 4, title: "Money Heist", description: "Crime Thriller", duration: "70m", genre: "Thriller", poster: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg" },
    { id: 5, title: "Dark", description: "Sci-Fi Mystery", duration: "60m", genre: "Mystery", poster: "https://image.tmdb.org/t/p/w500/56v2KjBlU4XaOv9rVYEQypROD7P.jpg" },
    { id: 101, title: "The Witcher", description: "Fantasy Adventure", duration: "55m", genre: "Fantasy", poster: "https://image.tmdb.org/t/p/w500/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg" },
    { id: 102, title: "Ozark", description: "Crime Drama", duration: "60m", genre: "Crime", poster: "https://image.tmdb.org/t/p/w500/m73QkLhOLmdj5J8RYuWq1mF6pD4.jpg" },
    { id: 103, title: "Narcos", description: "Crime Biography", duration: "50m", genre: "Biography", poster: "https://image.tmdb.org/t/p/w500/rTmal9fDbwh5F0waol2hq35U4ah.jpg" },
    { id: 104, title: "Peaky Blinders", description: "Crime Drama", duration: "55m", genre: "Crime", poster: "https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg" },
    { id: 105, title: "Vikings", description: "Historical Drama", duration: "45m", genre: "History", poster: "https://image.tmdb.org/t/p/w500/bQLrHIRNEkE3PdIWQrZHynQZazu.jpg" },
  ];

  const popularMovies: Video[] = [
    { id: 6, title: "Inception", duration: "2h 28m", year: 2010, rating: "PG-13", poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg" },
    { id: 7, title: "The Dark Knight", duration: "2h 32m", year: 2008, rating: "PG-13", poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
    { id: 8, title: "Interstellar", duration: "2h 49m", year: 2014, rating: "PG-13", poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
    { id: 9, title: "Pulp Fiction", duration: "2h 34m", year: 1994, rating: "R", poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg" },
    { id: 10, title: "The Matrix", duration: "2h 16m", year: 1999, rating: "R", poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg" },
    { id: 11, title: "Fight Club", duration: "2h 19m", year: 1999, rating: "R", poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg" },
    { id: 106, title: "Forrest Gump", duration: "2h 22m", year: 1994, rating: "PG-13", poster: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg" },
    { id: 107, title: "The Godfather", duration: "2h 55m", year: 1972, rating: "R", poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg" },
    { id: 108, title: "Titanic", duration: "3h 14m", year: 1997, rating: "PG-13", poster: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg" },
    { id: 109, title: "Avatar", duration: "2h 42m", year: 2009, rating: "PG-13", poster: "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg" },
  ];

  const tvShows: Video[] = [
    { id: 12, title: "Game of Thrones", genre: "Fantasy", year: 2011, rating: "TV-MA", poster: "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg" },
    { id: 13, title: "The Office", genre: "Comedy", year: 2005, rating: "TV-14", poster: "https://image.tmdb.org/t/p/w500/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg" },
    { id: 14, title: "Friends", genre: "Comedy", year: 1994, rating: "TV-PG", poster: "https://image.tmdb.org/t/p/w500/f496cm9enuEsZkSPzCwnTESEK5s.jpg" },
    { id: 15, title: "The Mandalorian", genre: "Sci-Fi", year: 2019, rating: "TV-14", poster: "https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXQ4Dc.jpg" },
    { id: 16, title: "Sherlock", genre: "Mystery", year: 2010, rating: "TV-14", poster: "https://image.tmdb.org/t/p/w500/7WTsnHkbA0FaG6R9twfFde0I9hl.jpg" },
    { id: 17, title: "Black Mirror", genre: "Sci-Fi", year: 2011, rating: "TV-MA", poster: "https://image.tmdb.org/t/p/w500/5UaYsGZOFhjFDwQh6GuLjjA5WSpO.jpg" },
    { id: 110, title: "Better Call Saul", genre: "Crime", year: 2015, rating: "TV-MA", poster: "https://image.tmdb.org/t/p/w500/fC2HDm5t0kHl7mTm7jxMR31jqVH.jpg" },
    { id: 111, title: "The Sopranos", genre: "Crime", year: 1999, rating: "TV-MA", poster: "https://image.tmdb.org/t/p/w500/rTc7ZXdroqjkKivFPvCPX0Ru7uw.jpg" },
    { id: 112, title: "Lost", genre: "Mystery", year: 2004, rating: "TV-14", poster: "https://image.tmdb.org/t/p/w500/og6S0aTZU6YUJAbqxeKjCa3kY1E.jpg" },
    { id: 113, title: "The Walking Dead", genre: "Horror", year: 2010, rating: "TV-MA", poster: "https://image.tmdb.org/t/p/w500/rqeYMLryjcawh2JeRpCVUDXYM5b.jpg" },
  ];

  const trending: Video[] = [
    { id: 18, title: "Wednesday", genre: "Comedy Horror", year: 2022, rating: "TV-14", poster: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg" },
    { id: 19, title: "House of the Dragon", genre: "Fantasy", year: 2022, rating: "TV-MA", poster: "https://image.tmdb.org/t/p/w500/7QMsOTMUswlwxJP0rTTZfmz2tX2.jpg" },
    { id: 20, title: "The Bear", genre: "Comedy Drama", year: 2022, rating: "TV-MA", poster: "https://image.tmdb.org/t/p/w500/sHFlbKS3WLqG7UE2aV4jXp6dIKZ.jpg" },
    { id: 21, title: "Euphoria", genre: "Drama", year: 2019, rating: "TV-MA", poster: "https://image.tmdb.org/t/p/w500/jtnfNzqZwN4E32FGGxx1YZaBWWf.jpg" },
    { id: 22, title: "The Boys", genre: "Superhero", year: 2019, rating: "TV-MA", poster: "https://image.tmdb.org/t/p/w500/mY7SeH4HFFxW1hiI6cWuwCRKptN.jpg" },
    { id: 23, title: "Squid Game", genre: "Thriller", year: 2021, rating: "TV-MA", poster: "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg" },
    { id: 114, title: "The Last of Us", genre: "Drama Horror", year: 2023, rating: "TV-MA", poster: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg" },
    { id: 115, title: "Succession", genre: "Drama", year: 2018, rating: "TV-MA", poster: "https://image.tmdb.org/t/p/w500/7HW47XbkNQ5fiwQFYGWdw9gs144.jpg" },
    { id: 116, title: "Rings of Power", genre: "Fantasy", year: 2022, rating: "TV-14", poster: "https://image.tmdb.org/t/p/w500/mYLOqiStMxDK3fYZFirgrMt8z5d.jpg" },
    { id: 117, title: "Andor", genre: "Sci-Fi", year: 2022, rating: "TV-14", poster: "https://image.tmdb.org/t/p/w500/59SVNwLfoMnZPPB6ukW6dlPxAdI.jpg" },
  ];

  // Auto-play trailer after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTrailer(true);
      if (videoRef.current) {
        videoRef.current.play().catch(console.error);
      }
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    // In real app, this would clear auth state and redirect
    window.location.href = '/';
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsVideoMuted(videoRef.current.muted);
    }
  };

  const handlePlayTrailer = () => {
    setShowTrailer(true);
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  };

  const VideoCard = ({ video, isLarge = false }: { video: Video; isLarge?: boolean }) => (
    <div
      className={`flex-shrink-0 ${isLarge ? 'w-80' : 'w-48'} cursor-pointer transform transition-transform duration-300 hover:scale-105`}
      onMouseEnter={() => setHoveredVideo(video.id)}
      onMouseLeave={() => setHoveredVideo(null)}
    >
      <div className={`${isLarge ? 'aspect-video' : 'aspect-[2/3]'} rounded-lg mb-3 relative overflow-hidden group`}>
        <Image
          src={video.poster || `https://picsum.photos/seed/${video.id}/${isLarge ? '320/180' : '192/288'}`}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Title Overlay for Continue Watching */}
        {isLarge && (
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-semibold text-lg truncate">{video.title}</h3>
            {video.description && <p className="text-gray-300 text-sm">{video.description}</p>}
          </div>
        )}
        
        {/* Hover Overlay - Netflix Style */}
        {hoveredVideo === video.id && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div className="flex gap-2">
                <button className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
                <button className="bg-gray-600/70 text-white p-2 rounded-full hover:bg-gray-600/90 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                <button className="bg-gray-600/70 text-white p-2 rounded-full hover:bg-gray-600/90 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Info Section (for smaller cards) */}
      {!isLarge && (
        <div>
          <h3 className="text-white font-medium mb-1 truncate">{video.title}</h3>
          {video.description && <p className="text-gray-400 text-sm mb-1">{video.description}</p>}
          <div className="flex items-center gap-2 text-xs text-gray-400">
            {video.year && <span>{video.year}</span>}
            {video.rating && <span className="border border-gray-500 px-1">{video.rating}</span>}
            {video.duration && <span>{video.duration}</span>}
            {video.genre && <span>{video.genre}</span>}
          </div>
        </div>
      )}
    </div>
  );

  const ContentRow = ({ title, videos, isLarge = false }: { title: string; videos: Video[]; isLarge?: boolean }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const rowId = title.toLowerCase().replace(/\s+/g, '-');

    const scroll = (direction: 'left' | 'right') => {
      if (scrollRef.current) {
        const scrollAmount = isLarge ? 320 : 200;
        const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
        scrollRef.current.scrollTo({
          left: newScrollLeft,
          behavior: 'smooth'
        });
      }
    };

    return (
      <section 
        className="mb-12 group/row relative"
        onMouseEnter={() => setHoveredRow(rowId)}
        onMouseLeave={() => setHoveredRow(null)}
      >
        <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
        <div className="relative">
          {/* Left Arrow */}
          {hoveredRow === rowId && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover/row:opacity-100"
              style={{ marginLeft: '-24px' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Content Container */}
          <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
          >
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} isLarge={isLarge} />
            ))}
          </div>

          {/* Right Arrow */}
          {hoveredRow === rowId && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover/row:opacity-100"
              style={{ marginRight: '-24px' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-black">
      <Header onLogout={handleLogout} />
      
      {/* Featured Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {/* Background Image */}
          <Image
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
            alt="Featured Content"
            fill
            className={`object-cover object-center w-full h-full transition-opacity duration-1000 ${showTrailer ? 'opacity-0' : 'opacity-100'}`}
            priority
            style={{ objectPosition: 'center center' }}
          />
          
          {/* Teskilat Drama Promotional Trailer */}
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${showTrailer ? 'opacity-100' : 'opacity-0'}`}
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
            crossOrigin="anonymous"
          >
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" type="video/mp4" />
            <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" type="video/mp4" />
            <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" type="video/mp4" />
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 flex items-center h-full px-4 md:px-12 pt-20">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              {featuredVideo.title}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[#F56D22] font-semibold">DRAMA</span>
              <span className="text-white">{featuredVideo.year}</span>
              <span className="border border-gray-400 text-white px-2 py-1 text-sm">{featuredVideo.rating}</span>
              <span className="text-gray-300">{featuredVideo.duration}</span>
            </div>
            {!showTrailer && (
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                {featuredVideo.description}
              </p>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handlePlayTrailer}
                className="bg-white text-black px-8 py-3 rounded font-semibold text-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                {showTrailer ? 'Playing' : 'Play'}
              </button>
              <button 
                onClick={() => setShowMoreInfo(true)}
                className="bg-gray-600 bg-opacity-70 text-white px-8 py-3 rounded font-semibold text-lg hover:bg-opacity-90 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                More Info
              </button>
            </div>
          </div>
        </div>
        
        {/* Netflix-style Video Controls - Bottom Right */}
        {showTrailer && (
          <div className="absolute bottom-24 right-6 z-20 flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full border-2 border-white/30 transition-colors duration-200"
            >
              {isVideoMuted ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>
            <div className="bg-black/60 text-white px-4 py-2 rounded text-sm font-medium border-2 border-white/30">
              13+
            </div>
          </div>
        )}
      </div>

      {/* Content Sections */}
      <div className="bg-black px-4 md:px-12 py-20">
          <ContentRow title="Continue Watching" videos={continueWatching} isLarge={true} />
          <ContentRow title="Trending Now" videos={trending} />
          <ContentRow title="Popular Movies" videos={popularMovies} />
          <ContentRow title="TV Shows" videos={tvShows} />
        </div>

        {/* Footer */}
        <Footer />

        {/* More Info Modal */}
        {showMoreInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black bg-opacity-80"
              onClick={() => setShowMoreInfo(false)}
            ></div>
            
            {/* Modal Content */}
            <div className="relative bg-gray-900 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={() => setShowMoreInfo(false)}
                className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Video Section */}
              <div className="relative aspect-video">
                <Image
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
                  alt="Teskilat"
                  fill
                  className="object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-4 rounded-full transition-colors">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Title and Year */}
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-3xl font-bold text-white">{featuredVideo.title}</h2>
                  <span className="text-[#F56D22] font-semibold text-lg">DRAMA</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-6">
                  <button className="bg-white text-black px-6 py-2 rounded font-semibold flex items-center gap-2 hover:bg-gray-200 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    Play
                  </button>
                  <button className="bg-gray-600 bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-90 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                  <button className="bg-gray-600 bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-90 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <button className="bg-gray-600 bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-90 transition-colors ml-auto">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  </button>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Column */}
                  <div className="md:col-span-2">
                    {/* Match & Rating */}
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-green-400 font-semibold">98% Match</span>
                      <span className="border border-gray-400 text-white px-2 py-1 text-sm">{featuredVideo.rating}</span>
                      <span className="text-gray-300">{featuredVideo.year}</span>
                      <span className="border border-gray-400 text-white px-2 py-1 text-sm">HD</span>
                      <span className="border border-gray-400 text-white px-2 py-1 text-sm">🔊</span>
                    </div>

                    {/* Watch Season */}
                    <h3 className="text-white text-xl font-semibold mb-3">Watch Season 1 Now</h3>
                    
                    {/* Description */}
                    <p className="text-gray-300 text-base leading-relaxed mb-4">
                      {featuredVideo.description}
                    </p>
                  </div>

                  {/* Right Column */}
                  <div>
                    {/* Cast */}
                    <div className="mb-4">
                      <span className="text-gray-400 text-sm">Cast: </span>
                      <span className="text-white text-sm">Serdar Yeğin, Deniz Baysal, Çağlar Ertuğrul, </span>
                      <span className="text-gray-400 text-sm">more</span>
                    </div>

                    {/* Genres */}
                    <div className="mb-4">
                      <span className="text-gray-400 text-sm">Genres: </span>
                      <span className="text-white text-sm">TV Dramas, Turkish, TV Action & Adventure</span>
                    </div>

                    {/* This Show Is */}
                    <div>
                      <span className="text-gray-400 text-sm">This Show Is: </span>
                      <span className="text-white text-sm">Intense</span>
                    </div>
                  </div>
                </div>

                {/* Episodes Section */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white text-xl font-semibold">Episodes</h3>
                    <select className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-600">
                      <option>Season 1</option>
                      <option>Season 2</option>
                      <option>Season 3</option>
                    </select>
                  </div>
                  
                  {/* Episode List */}
                  <div className="space-y-3">
                    {[1, 2, 3].map((ep) => (
                      <div key={ep} className="flex gap-4 p-3 hover:bg-gray-800 rounded transition-colors">
                        <div className="flex-shrink-0 w-16 h-16 bg-gray-700 rounded flex items-center justify-center">
                          <span className="text-white font-bold">{ep}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-white font-medium">Episode {ep}</h4>
                            <span className="text-gray-400 text-sm">{featuredVideo.duration}</span>
                          </div>
                          <p className="text-gray-400 text-sm line-clamp-2">
                            An intense mission begins as the team infiltrates a dangerous operation...
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Custom Scrollbar Styles */}
        <style jsx global>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
  );
}
