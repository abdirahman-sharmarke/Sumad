'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/header';

interface Content {
  id: number;
  title: string;
  poster: string;
  year: string;
  duration: string;
  type: 'Movie' | 'TV Show';
  isNew: boolean;
  trending: boolean;
  description: string;
  rating: string;
}

export default function NewPopular() {
  const [activeTab, setActiveTab] = useState<'worth-watching' | 'coming-soon' | 'top-10'>('worth-watching');

  const handleLogout = () => {
    window.location.href = '/';
  };

  const content: Content[] = [
    {
      id: 1,
      title: 'Wednesday',
      poster: 'https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg',
      year: '2022',
      duration: '8 Episodes',
      type: 'TV Show',
      isNew: true,
      trending: true,
      description: 'A sleuthing, supernaturally infused mystery charting Wednesday Addams years as a student at Nevermore Academy.',
      rating: '8.1'
    },
    {
      id: 2,
      title: 'House of the Dragon',
      poster: 'https://image.tmdb.org/t/p/w500/z2yahl2uefxDCl0nogcRBstwruJ.jpg',
      year: '2022',
      duration: '10 Episodes',
      type: 'TV Show',
      isNew: true,
      trending: true,
      description: 'The Targaryen dynasty is at the absolute apex of its power, with more than 10 dragons under their yoke.',
      rating: '8.4'
    },
    {
      id: 3,
      title: 'The Bear',
      poster: 'https://image.tmdb.org/t/p/w500/sHFlbKS3WLqMnp9t2ghADIJFnuQ.jpg',
      year: '2022',
      duration: '3 Seasons',
      type: 'TV Show',
      isNew: true,
      trending: true,
      description: 'A young chef from the fine dining world comes home to Chicago to run his family sandwich shop.',
      rating: '8.7'
    },
    {
      id: 4,
      title: 'Top Gun: Maverick',
      poster: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
      year: '2022',
      duration: '2h 11m',
      type: 'Movie',
      isNew: true,
      trending: true,
      description: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator.',
      rating: '8.3'
    },
    {
      id: 5,
      title: 'Euphoria',
      poster: 'https://image.tmdb.org/t/p/w500/jtnfNzqZwN4E32FGGxx1YZaBWWf.jpg',
      year: '2019',
      duration: '2 Seasons',
      type: 'TV Show',
      isNew: false,
      trending: true,
      description: 'A look at life for a group of high school students as they grapple with issues of drugs, sex, and violence.',
      rating: '8.4'
    },
    {
      id: 6,
      title: 'The Boys',
      poster: 'https://image.tmdb.org/t/p/w500/stTEycfG9928HYGEISBFaG1ngjM.jpg',
      year: '2019',
      duration: '3 Seasons',
      type: 'TV Show',
      isNew: false,
      trending: true,
      description: 'A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.',
      rating: '8.7'
    },
    {
      id: 7,
      title: 'Squid Game',
      poster: 'https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg',
      year: '2021',
      duration: '9 Episodes',
      type: 'TV Show',
      isNew: false,
      trending: true,
      description: 'Hundreds of cash-strapped players accept a strange invitation to compete in childrens games.',
      rating: '8.0'
    },
    {
      id: 8,
      title: 'The Last of Us',
      poster: 'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg',
      year: '2023',
      duration: '9 Episodes',
      type: 'TV Show',
      isNew: true,
      trending: true,
      description: 'Twenty years after modern civilization has been destroyed, Joel and Ellie must survive a journey.',
      rating: '8.8'
    }
  ];

  const getFilteredContent = () => {
    switch (activeTab) {
      case 'worth-watching':
        return content.filter(item => item.trending);
      case 'coming-soon':
        return content.filter(item => item.isNew);
      case 'top-10':
        return content.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)).slice(0, 10);
      default:
        return content;
    }
  };

  const filteredContent = getFilteredContent();

  return (
    <div className="min-h-screen bg-black">
      <Header onLogout={handleLogout} />
      
      <div className="pt-20 px-4 md:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-light text-white mb-2">New & Popular</h1>
            <div className="w-16 h-1 bg-[#F56D22]"></div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex gap-6 border-b border-gray-700">
              <button
                onClick={() => setActiveTab('worth-watching')}
                className={`pb-4 px-2 text-lg font-medium transition-colors relative ${
                  activeTab === 'worth-watching'
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Worth Watching
                {activeTab === 'worth-watching' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F56D22]"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('coming-soon')}
                className={`pb-4 px-2 text-lg font-medium transition-colors relative ${
                  activeTab === 'coming-soon'
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Coming Soon
                {activeTab === 'coming-soon' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F56D22]"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('top-10')}
                className={`pb-4 px-2 text-lg font-medium transition-colors relative ${
                  activeTab === 'top-10'
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Top 10
                {activeTab === 'top-10' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F56D22]"></div>
                )}
              </button>
            </div>
          </div>

          {/* Content List */}
          <div className="space-y-6">
            {filteredContent.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row gap-4 bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors"
              >
                {/* Poster */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <Image
                      src={item.poster}
                      alt={item.title}
                      width={120}
                      height={180}
                      className="w-24 md:w-32 h-auto aspect-[2/3] object-cover rounded-lg"
                    />
                    {activeTab === 'top-10' && (
                      <div className="absolute -left-2 -top-2 bg-[#F56D22] text-white text-xl font-bold w-8 h-8 rounded-full flex items-center justify-center">
                        {index + 1}
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <div>
                      <h3 className="text-white text-xl font-medium mb-1">{item.title}</h3>
                      <div className="flex items-center gap-4 text-gray-400 text-sm mb-2">
                        <span>{item.year}</span>
                        <span>{item.duration}</span>
                        <span className="bg-gray-700 px-2 py-1 rounded text-xs">{item.type}</span>
                        <span className="text-[#F56D22]">★ {item.rating}</span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-2 md:mt-0">
                      <button className="bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        Play
                      </button>
                      <button className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 