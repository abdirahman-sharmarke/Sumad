'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Login from './Auth/login';
import Register from './Auth/Register';

export default function Home() {
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'register'>('home');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Check URL parameters for direct navigation
    const urlParams = new URLSearchParams(window.location.search);
    const view = urlParams.get('view');
    if (view === 'login' || view === 'register') {
      setCurrentView(view);
    }
  }, []);

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setCurrentView('register');
    }
  };



  if (currentView === 'login') {
    return <Login />;
  }

  if (currentView === 'register') {
    return <Register />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Netflix-style Movie Poster Grid Background */}
      <div className="absolute inset-0 opacity-40">
        <div className="grid grid-cols-8 gap-2 h-full w-full transform rotate-12 scale-150 -translate-y-20">
          {Array.from({ length: 48 }, (_, i) => {
            const moviePosters = [
              'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', // Inception
              'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', // The Dark Knight
              'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', // Interstellar
              'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', // Pulp Fiction
              'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', // The Matrix
              'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', // Fight Club
              'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg', // Forrest Gump
              'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg', // The Godfather
              'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg', // Titanic
              'https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg', // Avatar
              'https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg', // Game of Thrones
              'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg', // Stranger Things
              'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg', // Money Heist
              'https://image.tmdb.org/t/p/w500/56v2KjBlU4XaOv9rVYEQypROD7P.jpg', // Dark
              'https://image.tmdb.org/t/p/w500/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg', // The Witcher
              'https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg', // Wednesday
              'https://image.tmdb.org/t/p/w500/7QMsOTMUswlwxJP0rTTZfmz2tX2.jpg', // House of the Dragon
              'https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg', // Squid Game
              'https://image.tmdb.org/t/p/w500/mY7SeH4HFFxW1hiI6cWuwCRKptN.jpg', // The Boys
              'https://image.tmdb.org/t/p/w500/jtnfNzqZwN4E32FGGxx1YZaBWWf.jpg', // Euphoria
              'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg', // The Last of Us
              'https://image.tmdb.org/t/p/w500/7HW47XbkNQ5fiwQFYGWdw9gs144.jpg', // Succession
              'https://image.tmdb.org/t/p/w500/mYLOqiStMxDK3fYZFirgrMt8z5d.jpg', // Rings of Power
              'https://image.tmdb.org/t/p/w500/59SVNwLfoMnZPPB6ukW6dlPxAdI.jpg', // Andor
            ];
            return (
              <div
                key={i}
                className="aspect-[2/3] bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400 rounded-lg opacity-80"
                style={{
                  backgroundImage: `url(${moviePosters[i % moviePosters.length]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            );
          })}
        </div>
      </div>
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-6 md:p-12">
          <Image
            src="/Sumad.png"
            alt="Sumad Logo"
            width={120}
            height={40}
            className="h-8 md:h-10 w-auto"
          />
          <button
            onClick={() => setCurrentView('login')}
            className="bg-[#F56D22] hover:bg-[#E55A1B] text-white px-6 py-2 rounded font-medium transition-colors duration-200"
          >
            Sign In
          </button>
        </header>

        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
              Unlimited movies, TV shows, and more
            </h1>
            <p className="text-white text-lg md:text-2xl mb-6">
              Starts at USD 2.99. Cancel anytime.
            </p>
            <p className="text-white text-lg mb-8">
              Ready to watch? Enter your email to create or restart your membership.
            </p>

            {/* Email Form */}
            <form onSubmit={handleGetStarted} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 p-4 bg-black bg-opacity-70 text-white border border-gray-600 rounded focus:outline-none focus:border-[#F56D22] focus:ring-1 focus:ring-[#F56D22] text-lg"
                required
              />
              <button
                type="submit"
                className="bg-[#F56D22] hover:bg-[#E55A1B] text-white px-8 py-4 rounded font-semibold text-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                Get Started
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Features Section */}
        <div className="pb-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="text-white">
                <div className="mb-4">
                  <svg className="w-12 h-12 mx-auto text-[#F56D22]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Watch anywhere</h3>
                <p className="text-gray-300">Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
              </div>
              
              <div className="text-white">
                <div className="mb-4">
                  <svg className="w-12 h-12 mx-auto text-[#F56D22]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium content</h3>
                <p className="text-gray-300">Enjoy exclusive shows, movies, and documentaries you won&apos;t find anywhere else.</p>
              </div>
              
              <div className="text-white">
                <div className="mb-4">
                  <svg className="w-12 h-12 mx-auto text-[#F56D22]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Create profiles</h3>
                <p className="text-gray-300">Create profiles for different family members to get personalized recommendations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
