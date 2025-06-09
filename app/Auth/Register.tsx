'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Registration attempt:', { email, password });
  };

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
        </header>

        {/* Registration Form */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-black bg-opacity-75 rounded-lg p-8 md:p-12">
            <h1 className="text-white text-3xl font-bold mb-8">Sign Up</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-[#F56D22] focus:ring-1 focus:ring-[#F56D22]"
                  required
                />
              </div>
              
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-[#F56D22] focus:ring-1 focus:ring-[#F56D22]"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-[#F56D22] focus:ring-1 focus:ring-[#F56D22]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#F56D22] hover:bg-[#E55A1B] text-white font-semibold py-4 rounded transition-colors duration-200"
              >
                Sign Up
              </button>
            </form>

            <div className="mt-6 text-gray-400">
              <div className="flex items-center text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" required />
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div>
            </div>

            <div className="mt-8 text-gray-400">
              <p>
                Already have an account?{' '}
                <button 
                  onClick={() => window.location.href = '/?view=login'} 
                  className="text-white hover:underline"
                >
                  Sign in now
                </button>
                .
              </p>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
              <a href="#" className="text-blue-500 hover:underline">Learn more</a>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
