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
  language: string;
  originalLanguage: string;
  genre: string;
  rating: string;
  country: string;
}

export default function BrowseByLanguages() {
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  const handleLogout = () => {
    window.location.href = '/';
  };

  const languages = [
    { code: 'All', name: 'All Languages', flag: '🌍' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'so', name: 'Somali', flag: '🇸🇴' }
  ];

  const content: Content[] = [
    {
      id: 1,
      title: 'Squid Game',
      poster: 'https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg',
      year: '2021',
      duration: '9 Episodes',
      type: 'TV Show',
      language: 'ko',
      originalLanguage: 'Korean',
      genre: 'Thriller',
      rating: '8.0',
      country: 'South Korea'
    },
    {
      id: 2,
      title: 'Money Heist',
      poster: 'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
      year: '2017',
      duration: '5 Seasons',
      type: 'TV Show',
      language: 'es',
      originalLanguage: 'Spanish',
      genre: 'Action',
      rating: '8.2',
      country: 'Spain'
    },
    {
      id: 3,
      title: 'Dark',
      poster: 'https://image.tmdb.org/t/p/w500/5tgWf9n1ow8BTlWpXKFvVqfqUgP.jpg',
      year: '2017',
      duration: '3 Seasons',
      type: 'TV Show',
      language: 'de',
      originalLanguage: 'German',
      genre: 'Sci-Fi',
      rating: '8.8',
      country: 'Germany'
    },
    {
      id: 4,
      title: 'Parasite',
      poster: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
      year: '2019',
      duration: '2h 12m',
      type: 'Movie',
      language: 'ko',
      originalLanguage: 'Korean',
      genre: 'Thriller',
      rating: '8.5',
      country: 'South Korea'
    },
    {
      id: 5,
      title: 'Your Name',
      poster: 'https://image.tmdb.org/t/p/w500/mMtUybQ6hL24FXo0F3Z4j2KG7kZ.jpg',
      year: '2016',
      duration: '1h 46m',
      type: 'Movie',
      language: 'ja',
      originalLanguage: 'Japanese',
      genre: 'Romance',
      rating: '8.2',
      country: 'Japan'
    },
    {
      id: 6,
      title: 'Elite',
      poster: 'https://image.tmdb.org/t/p/w500/3NTAbAiao4JLzFQw6YxP1YZppM8.jpg',
      year: '2018',
      duration: '6 Seasons',
      type: 'TV Show',
      language: 'es',
      originalLanguage: 'Spanish',
      genre: 'Drama',
      rating: '7.5',
      country: 'Spain'
    },
    {
      id: 7,
      title: 'Lupin',
      poster: 'https://image.tmdb.org/t/p/w500/sgxzQQpbEXkEoJF5WMVVqjNkP9e.jpg',
      year: '2021',
      duration: '3 Seasons',
      type: 'TV Show',
      language: 'fr',
      originalLanguage: 'French',
      genre: 'Crime',
      rating: '7.5',
      country: 'France'
    },
    {
      id: 8,
      title: 'Cinema Paradiso',
      poster: 'https://image.tmdb.org/t/p/w500/gCI2AeMV4IHSewhJkzsur5MEp6R.jpg',
      year: '1988',
      duration: '2h 35m',
      type: 'Movie',
      language: 'it',
      originalLanguage: 'Italian',
      genre: 'Drama',
      rating: '8.5',
      country: 'Italy'
    },
    {
      id: 9,
      title: 'City of God',
      poster: 'https://image.tmdb.org/t/p/w500/adrvjkwq4UXJdqeNO3ZvFxBQHWw.jpg',
      year: '2002',
      duration: '2h 10m',
      type: 'Movie',
      language: 'pt',
      originalLanguage: 'Portuguese',
      genre: 'Crime',
      rating: '8.6',
      country: 'Brazil'
    },
    {
      id: 10,
      title: 'Chernobyl',
      poster: 'https://image.tmdb.org/t/p/w500/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg',
      year: '2019',
      duration: '5 Episodes',
      type: 'TV Show',
      language: 'en',
      originalLanguage: 'English',
      genre: 'Drama',
      rating: '9.3',
      country: 'UK/USA'
    },
    {
      id: 11,
      title: 'Breaking Bad',
      poster: 'https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg',
      year: '2008',
      duration: '5 Seasons',
      type: 'TV Show',
      language: 'en',
      originalLanguage: 'English',
      genre: 'Crime',
      rating: '9.5',
      country: 'USA'
    },
    {
      id: 12,
      title: 'The Handmaiden',
      poster: 'https://image.tmdb.org/t/p/w500/dWlrOKGEn5ONbMx1xQb3k0HLt0d.jpg',
      year: '2016',
      duration: '2h 25m',
      type: 'Movie',
      language: 'ko',
      originalLanguage: 'Korean',
      genre: 'Thriller',
      rating: '8.1',
      country: 'South Korea'
    }
  ];

  const filteredContent = selectedLanguage === 'All' 
    ? content 
    : content.filter(item => item.language === selectedLanguage);

  const getLanguageInfo = (code: string) => {
    return languages.find(lang => lang.code === code);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header onLogout={handleLogout} />
      
      <div className="pt-20 px-4 md:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-light text-white mb-2">Browse by Languages</h1>
            <div className="w-16 h-1 bg-[#F56D22]"></div>
            <p className="text-gray-400 mt-3">Discover content from around the world</p>
          </div>

          {/* Language Filter */}
          <div className="mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => setSelectedLanguage(language.code)}
                  className={`p-4 rounded-lg border transition-all duration-300 text-left ${
                    selectedLanguage === language.code
                      ? 'bg-[#F56D22] text-white border-[#F56D22] scale-105'
                      : 'bg-gray-900 text-white border-gray-600 hover:border-gray-400 hover:bg-gray-800'
                  }`}
                >
                  <div className="text-2xl mb-2">{language.flag}</div>
                  <div className="font-medium text-sm">{language.name}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {language.code === 'All' 
                      ? `${content.length} titles` 
                      : `${content.filter(item => item.language === language.code).length} titles`
                    }
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredContent.map((item) => (
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
                  
                  {/* Language Badge */}
                  <div className="absolute top-2 left-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <span>{getLanguageInfo(item.language)?.flag}</span>
                    <span>{item.originalLanguage}</span>
                  </div>

                  {/* Netflix-style Hover Overlay */}
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
                  <h3 className="font-medium text-sm mb-1 line-clamp-2">{item.title}</h3>
                  <div className="text-gray-400 text-xs space-y-1">
                    <div>{item.year} • {item.country}</div>
                    <div>{item.duration}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#F56D22]">★ {item.rating}</span>
                      <span className="bg-gray-800 px-2 py-1 rounded text-xs">{item.genre}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredContent.length === 0 && (
            <div className="text-center py-20">
              <div className="text-gray-400 text-6xl mb-4">🌍</div>
              <h2 className="text-white text-2xl font-medium mb-2">No content found</h2>
              <p className="text-gray-400 mb-6">No content available in the selected language</p>
              <button 
                onClick={() => setSelectedLanguage('All')}
                className="bg-[#F56D22] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#E5611F] transition-colors"
              >
                Show All Languages
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 