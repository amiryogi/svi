import { useState } from 'react';
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_CATEGORIES } from '@/utils/constants';

const Gallery = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedImage, setSelectedImage] = useState(null);

    // Sample gallery data - would come from API
    const galleryItems = [
        { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop', title: 'Campus View', category: 'Academics' },
        { id: 2, type: 'image', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&h=400&fit=crop', title: 'Classroom Learning', category: 'Academics' },
        { id: 3, type: 'image', url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=400&fit=crop', title: 'Basketball Match', category: 'Sports' },
        { id: 4, type: 'video', url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop', youtubeId: 'dQw4w9WgXcQ', title: 'Annual Day Performance', category: 'Events' },
        { id: 5, type: 'image', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop', title: 'Science Lab', category: 'Academics' },
        { id: 6, type: 'image', url: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=600&h=400&fit=crop', title: 'Dashain Celebration', category: 'Celebrations' },
        { id: 7, type: 'image', url: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&h=400&fit=crop', title: 'Library', category: 'Academics' },
        { id: 8, type: 'image', url: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=600&h=400&fit=crop', title: 'Football Tournament', category: 'Sports' },
        { id: 9, type: 'image', url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop', title: 'Graduation Day', category: 'Events' },
        { id: 10, type: 'image', url: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop', title: 'Computer Lab', category: 'Academics' },
        { id: 11, type: 'image', url: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&h=400&fit=crop', title: 'Quiz Competition', category: 'Competitions' },
        { id: 12, type: 'image', url: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=600&h=400&fit=crop', title: 'Field Trip', category: 'Field Trips' },
    ];

    const filteredItems = activeCategory === 'All'
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeCategory);

    const openLightbox = (item) => setSelectedImage(item);
    const closeLightbox = () => setSelectedImage(null);

    const navigateImage = (direction) => {
        const currentIndex = filteredItems.findIndex((item) => item.id === selectedImage.id);
        let newIndex;
        if (direction === 'next') {
            newIndex = currentIndex === filteredItems.length - 1 ? 0 : currentIndex + 1;
        } else {
            newIndex = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1;
        }
        setSelectedImage(filteredItems[newIndex]);
    };

    return (
        <div className="py-12">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-green-600 to-green-800 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Gallery</h1>
                        <p className="text-xl text-green-100">
                            Explore moments and memories from our school events, activities, and daily life.
                        </p>
                    </div>
                </div>
            </section>

            {/* Gallery Content */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                        {GALLERY_CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                                        ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className="relative group cursor-pointer overflow-hidden rounded-xl aspect-square"
                                onClick={() => openLightbox(item)}
                            >
                                <img
                                    src={item.url}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {item.type === 'video' && (
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                                            <Play className="w-8 h-8 text-green-600 ml-1" fill="currentColor" />
                                        </div>
                                    )}
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="text-white font-medium">{item.title}</p>
                                    <p className="text-white/70 text-sm">{item.category}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredItems.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No items found in this category.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                    onClick={closeLightbox}
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                        onClick={closeLightbox}
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Navigation Buttons */}
                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigateImage('prev');
                        }}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigateImage('next');
                        }}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Content */}
                    <div
                        className="max-w-5xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {selectedImage.type === 'video' ? (
                            <div className="aspect-video rounded-xl overflow-hidden">
                                <iframe
                                    src={`https://www.youtube.com/embed/${selectedImage.youtubeId}?autoplay=1`}
                                    title={selectedImage.title}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        ) : (
                            <img
                                src={selectedImage.url.replace('w=600', 'w=1200').replace('h=400', 'h=800')}
                                alt={selectedImage.title}
                                className="max-h-[80vh] mx-auto rounded-xl"
                            />
                        )}
                        <div className="text-center mt-4">
                            <p className="text-white text-lg font-medium">{selectedImage.title}</p>
                            <p className="text-white/60">{selectedImage.category}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
