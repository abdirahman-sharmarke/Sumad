'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';
import Image from 'next/image';

interface FeaturedContent {
  id: string;
  title: string;
  type: 'movie' | 'tvshow' | 'banner';
  position: number;
  isActive: boolean;
  startDate: string;
  endDate: string | null;
  priority: 'high' | 'medium' | 'low';
  placement: 'hero' | 'carousel' | 'trending' | 'new-releases';
  poster: string;
  description: string;
  views: string;
  clickRate: string;
  dateAdded: string;
}

export default function FeaturedContentManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlacement, setSelectedPlacement] = useState('all');
  const [selectedContent, setSelectedContent] = useState<string[]>([]);


  // Mock featured content data
  const [featuredContent, setFeaturedContent] = useState<FeaturedContent[]>([
    {
      id: '1',
      title: 'Stranger Things S4',
      type: 'tvshow',
      position: 1,
      isActive: true,
      startDate: '2024-01-20',
      endDate: '2024-02-20',
      priority: 'high',
      placement: 'hero',
      poster: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
      description: 'The supernatural thriller returns with more mind-bending mysteries.',
      views: '2.5M',
      clickRate: '8.5%',
      dateAdded: '2024-01-20'
    },
    {
      id: '2',
      title: 'Top Gun: Maverick',
      type: 'movie',
      position: 2,
      isActive: true,
      startDate: '2024-01-19',
      endDate: null,
      priority: 'high',
      placement: 'hero',
      poster: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
      description: 'Maverick returns to train a new generation of Top Gun pilots.',
      views: '3.1M',
      clickRate: '12.3%',
      dateAdded: '2024-01-19'
    },
    {
      id: '3',
      title: 'The Bear S3',
      type: 'tvshow',
      position: 1,
      isActive: true,
      startDate: '2024-01-18',
      endDate: '2024-03-18',
      priority: 'medium',
      placement: 'trending',
      poster: 'https://image.tmdb.org/t/p/w500/sHFlbKS3WLqVcv9bCQauemzSn93.jpg',
      description: 'The critically acclaimed comedy-drama continues.',
      views: '1.8M',
      clickRate: '9.7%',
      dateAdded: '2024-01-18'
    },
    {
      id: '4',
      title: 'House of the Dragon',
      type: 'tvshow',
      position: 2,
      isActive: true,
      startDate: '2024-01-17',
      endDate: null,
      priority: 'medium',
      placement: 'trending',
      poster: 'https://image.tmdb.org/t/p/w500/7QMsOTMUswlwxJP0rTTZfmz2tX2.jpg',
      description: 'The Game of Thrones prequel continues its epic saga.',
      views: '2.2M',
      clickRate: '10.1%',
      dateAdded: '2024-01-17'
    },
    {
      id: '5',
      title: 'Wednesday',
      type: 'tvshow',
      position: 1,
      isActive: true,
      startDate: '2024-01-16',
      endDate: '2024-02-16',
      priority: 'high',
      placement: 'new-releases',
      poster: 'https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg',
      description: 'Addams Family spinoff featuring Wednesday at Nevermore Academy.',
      views: '1.9M',
      clickRate: '11.2%',
      dateAdded: '2024-01-16'
    },
    {
      id: '6',
      title: 'The Batman',
      type: 'movie',
      position: 3,
      isActive: false,
      startDate: '2024-01-15',
      endDate: '2024-01-25',
      priority: 'low',
      placement: 'carousel',
      poster: 'https://image.tmdb.org/t/p/w500/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg',
      description: 'Robert Pattinson takes on the role of the Dark Knight.',
      views: '1.2M',
      clickRate: '6.8%',
      dateAdded: '2024-01-15'
    }
  ]);

  const placements = ['All', 'Hero', 'Carousel', 'Trending', 'New Releases'];


  const filteredContent = featuredContent.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlacement = selectedPlacement === 'all' || content.placement === selectedPlacement.toLowerCase().replace(' ', '-');
    return matchesSearch && matchesPlacement;
  });

  const handleSelectContent = (contentId: string) => {
    setSelectedContent(prev => 
      prev.includes(contentId) 
        ? prev.filter(id => id !== contentId)
        : [...prev, contentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedContent.length === filteredContent.length) {
      setSelectedContent([]);
    } else {
      setSelectedContent(filteredContent.map(content => content.id));
    }
  };

  const moveContent = (id: string, direction: 'up' | 'down') => {
    const content = featuredContent.find(c => c.id === id);
    if (!content) return;

    const samePlacementContent = featuredContent.filter(c => c.placement === content.placement);
    const currentIndex = samePlacementContent.findIndex(c => c.id === id);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex >= 0 && targetIndex < samePlacementContent.length) {
      const updatedContent = [...featuredContent];
      const currentContent = updatedContent.find(c => c.id === id);
      const targetContent = updatedContent.find(c => c.id === samePlacementContent[targetIndex].id);
      
      if (currentContent && targetContent) {
        const tempPosition = currentContent.position;
        currentContent.position = targetContent.position;
        targetContent.position = tempPosition;
      }
      
      setFeaturedContent(updatedContent);
    }
  };

  const toggleContentStatus = (id: string) => {
    setFeaturedContent(featuredContent.map(content => 
      content.id === id ? { ...content, isActive: !content.isActive } : content
    ));
  };

  const deleteContent = (id: string) => {
    setFeaturedContent(featuredContent.filter(content => content.id !== id));
  };

  const getPlacementColor = (placement: string) => {
    switch (placement) {
      case 'hero': return 'bg-red-100 text-red-800';
      case 'trending': return 'bg-orange-100 text-orange-800';
      case 'new-releases': return 'bg-blue-100 text-blue-800';
      case 'carousel': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          title="Featured Content"
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          showMenuButton={true}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Featured</p>
                  <p className="text-2xl font-bold text-gray-900">{featuredContent.filter(c => c.isActive).length}</p>
                </div>
                <div className="text-2xl">🌟</div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Hero Section</p>
                  <p className="text-2xl font-bold text-gray-900">{featuredContent.filter(c => c.placement === 'hero').length}</p>
                </div>
                <div className="text-2xl">🎬</div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Click Rate</p>
                  <p className="text-2xl font-bold text-gray-900">9.7%</p>
                </div>
                <div className="text-2xl">📊</div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">12.7M</p>
                </div>
                <div className="text-2xl">👀</div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search featured content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F56D22] focus:border-transparent w-full sm:w-80"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <select
                  value={selectedPlacement}
                  onChange={(e) => setSelectedPlacement(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F56D22] focus:border-transparent"
                >
                  {placements.map(placement => (
                    <option key={placement} value={placement.toLowerCase().replace(' ', '-')}>{placement}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  className="bg-[#F56D22] text-white px-4 py-2 rounded-lg hover:bg-[#E55A1C] transition-colors"
                >
                  Add Featured
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Analytics
                </button>
              </div>
              {selectedContent.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{selectedContent.length} selected</span>
                  <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                    Remove
                  </button>
                  <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                    Activate
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Featured Content List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Featured Content ({filteredContent.length})</h3>
                <button
                  onClick={handleSelectAll}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                >
                  {selectedContent.length === filteredContent.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {filteredContent.map((content) => (
                  <div key={content.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={selectedContent.includes(content.id)}
                          onChange={() => handleSelectContent(content.id)}
                          className="rounded border-gray-300 text-[#F56D22] focus:ring-[#F56D22]"
                        />
                        
                        <div className="w-16 h-24 rounded-lg overflow-hidden">
                          <Image
                            src={content.poster}
                            alt={content.title}
                            width={64}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{content.title}</h4>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPlacementColor(content.placement)}`}>
                              {content.placement.replace('-', ' ')}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(content.priority)}`}>
                              {content.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{content.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Position: {content.position}</span>
                            <span>Views: {content.views}</span>
                            <span>Click Rate: {content.clickRate}</span>
                            <span>Added: {content.dateAdded}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {/* Position Controls */}
                        <div className="flex flex-col space-y-1">
                          <button
                            onClick={() => moveContent(content.id, 'up')}
                            className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </button>
                          <button
                            onClick={() => moveContent(content.id, 'down')}
                            className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                        
                        {/* Status Toggle */}
                        <button
                          onClick={() => toggleContentStatus(content.id)}
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            content.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {content.isActive ? 'Active' : 'Inactive'}
                        </button>
                        
                        {/* Action Buttons */}
                        <button className="text-blue-600 hover:text-blue-800 p-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => deleteContent(content.id)}
                          className="text-red-600 hover:text-red-800 p-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
