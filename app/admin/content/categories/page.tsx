'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  contentCount: number;
  color: string;
  isActive: boolean;
  createdAt: string;
  type: 'genre' | 'collection' | 'language';
}

export default function CategoriesManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Mock categories data
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Action',
      slug: 'action',
      description: 'High-energy movies and shows with intense sequences',
      contentCount: 156,
      color: '#EF4444',
      isActive: true,
      createdAt: '2024-01-15',
      type: 'genre'
    },
    {
      id: '2',
      name: 'Comedy',
      slug: 'comedy',
      description: 'Light-hearted entertainment that makes you laugh',
      contentCount: 124,
      color: '#F59E0B',
      isActive: true,
      createdAt: '2024-01-14',
      type: 'genre'
    },
    {
      id: '3',
      name: 'Drama',
      slug: 'drama',
      description: 'Emotional storytelling with compelling characters',
      contentCount: 198,
      color: '#8B5CF6',
      isActive: true,
      createdAt: '2024-01-13',
      type: 'genre'
    },
    {
      id: '4',
      name: 'Sci-Fi',
      slug: 'sci-fi',
      description: 'Science fiction and futuristic content',
      contentCount: 76,
      color: '#06B6D4',
      isActive: true,
      createdAt: '2024-01-12',
      type: 'genre'
    },
    {
      id: '5',
      name: 'Netflix Originals',
      slug: 'netflix-originals',
      description: 'Exclusive content from Netflix platform',
      contentCount: 89,
      color: '#10B981',
      isActive: true,
      createdAt: '2024-01-11',
      type: 'collection'
    },
    {
      id: '6',
      name: 'Trending Now',
      slug: 'trending-now',
      description: 'Currently popular content',
      contentCount: 45,
      color: '#F56D22',
      isActive: true,
      createdAt: '2024-01-10',
      type: 'collection'
    },
    {
      id: '7',
      name: 'Somali',
      slug: 'somali',
      description: 'Content in Somali language',
      contentCount: 67,
      color: '#EC4899',
      isActive: true,
      createdAt: '2024-01-09',
      type: 'language'
    },
    {
      id: '8',
      name: 'Arabic',
      slug: 'arabic',
      description: 'Content in Arabic language',
      contentCount: 34,
      color: '#6366F1',
      isActive: true,
      createdAt: '2024-01-08',
      type: 'language'
    }
  ]);

  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    description: '',
    color: '#F56D22',
    type: 'genre' as 'genre' | 'collection' | 'language'
  });

  const types = ['All', 'Genre', 'Collection', 'Language'];

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || category.type === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCategories.length === filteredCategories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(filteredCategories.map(cat => cat.id));
    }
  };

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.slug) {
      const category: Category = {
        id: Date.now().toString(),
        name: newCategory.name,
        slug: newCategory.slug,
        description: newCategory.description,
        contentCount: 0,
        color: newCategory.color,
        isActive: true,
        createdAt: new Date().toISOString().split('T')[0],
        type: newCategory.type
      };
      setCategories([...categories, category]);
      setNewCategory({ name: '', slug: '', description: '', color: '#F56D22', type: 'genre' });
      setShowAddForm(false);
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setNewCategory({
      name: category.name,
      slug: category.slug,
      description: category.description,
      color: category.color,
      type: category.type
    });
    setShowAddForm(true);
  };

  const handleUpdateCategory = () => {
    if (editingCategory && newCategory.name && newCategory.slug) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, ...newCategory }
          : cat
      ));
      setEditingCategory(null);
      setNewCategory({ name: '', slug: '', description: '', color: '#F56D22', type: 'genre' });
      setShowAddForm(false);
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter(cat => cat.id !== categoryId));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'genre':
        return '🎭';
      case 'collection':
        return '📚';
      case 'language':
        return '🌐';
      default:
        return '📁';
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          title="Categories & Genres"
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
                    placeholder="Search categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F56D22] focus:border-transparent w-full sm:w-80"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F56D22] focus:border-transparent"
                >
                  {types.map(type => (
                    <option key={type} value={type.toLowerCase()}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowAddForm(true)}
                  className="bg-[#F56D22] text-white px-4 py-2 rounded-lg hover:bg-[#E55A1C] transition-colors"
                >
                  Add Category
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Import Categories
                </button>
              </div>
              {selectedCategories.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{selectedCategories.length} selected</span>
                  <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                    Delete
                  </button>
                  <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                    Activate
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Add/Edit Category Form */}
          {showAddForm && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h3>
                <button 
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingCategory(null);
                    setNewCategory({ name: '', slug: '', description: '', color: '#F56D22', type: 'genre' });
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory(prev => ({ 
                      ...prev, 
                      name: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
                    }))}
                    placeholder="e.g., Horror"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F56D22] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                  <input
                    type="text"
                    value={newCategory.slug}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="e.g., horror"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F56D22] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={newCategory.type}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, type: e.target.value as 'genre' | 'collection' | 'language' }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F56D22] focus:border-transparent"
                  >
                    <option value="genre">Genre</option>
                    <option value="collection">Collection</option>
                    <option value="language">Language</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <input
                    type="color"
                    value={newCategory.color}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, color: e.target.value }))}
                    className="w-full h-12 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F56D22] focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  placeholder="Brief description of this category..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F56D22] focus:border-transparent"
                />
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingCategory(null);
                    setNewCategory({ name: '', slug: '', description: '', color: '#F56D22', type: 'genre' });
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
                  className="bg-[#F56D22] text-white px-4 py-2 rounded-lg hover:bg-[#E55A1C] transition-colors"
                >
                  {editingCategory ? 'Update Category' : 'Add Category'}
                </button>
              </div>
            </div>
          )}

          {/* Categories Grid */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">All Categories ({filteredCategories.length})</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSelectAll}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                >
                  {selectedCategories.length === filteredCategories.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories.map((category) => (
                <div key={category.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleSelectCategory(category.id)}
                        className="rounded border-gray-300 text-[#F56D22] focus:ring-[#F56D22]"
                      />
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      ></div>
                    </div>
                    <span className="text-xl">{getTypeIcon(category.type)}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">{category.name}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="bg-gray-200 px-2 py-1 rounded capitalize">{category.type}</span>
                      <span>{category.contentCount} items</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>/{category.slug}</span>
                      <span className={`px-2 py-1 rounded ${category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {category.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <button 
                      onClick={() => handleEditCategory(category)}
                      className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteCategory(category.id)}
                      className="flex items-center text-red-600 hover:text-red-800 text-sm"
                    >
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
        </div>
      </div>
    </div>
  );
}
