import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ChevronRight, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BLOG_CATEGORIES } from '@/utils/constants';
import { formatDate, truncateText } from '@/utils/helpers';

const Blog = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Sample blog data - would come from API
    const blogs = [
        {
            id: 1,
            slug: 'annual-sports-day-2024',
            title: 'Annual Sports Day 2024 Celebrated with Great Enthusiasm',
            excerpt: 'Students from all grades participated in various sporting events showcasing their athletic abilities and team spirit.',
            image: 'https://images.unsplash.com/photo-1461896836934- voices-13a7-7c2a?w=600&h=400&fit=crop',
            category: 'Events',
            author: 'Admin',
            date: '2024-12-20',
            featured: true,
        },
        {
            id: 2,
            slug: 'see-results-2024',
            title: 'Outstanding SEE Results - 95% Students Pass with Distinction',
            excerpt: 'Our Grade 10 students have achieved remarkable results in the SEE examination, with many securing top positions.',
            image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
            category: 'Achievements',
            author: 'Principal',
            date: '2024-12-15',
            featured: true,
        },
        {
            id: 3,
            slug: 'science-exhibition-2024',
            title: 'Inter-House Science Exhibition Showcases Student Innovation',
            excerpt: 'Young scientists displayed creative projects on renewable energy, robotics, and environmental conservation.',
            image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop',
            category: 'Academic',
            author: 'Science Department',
            date: '2024-12-10',
            featured: false,
        },
        {
            id: 4,
            slug: 'admission-open-2081',
            title: 'Admission Open for Academic Year 2081 BS',
            excerpt: 'Applications are now being accepted for Kindergarten to Grade 12 including NEB +2 Science and Management.',
            image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop',
            category: 'Announcements',
            author: 'Admin',
            date: '2024-12-05',
            featured: false,
        },
        {
            id: 5,
            slug: 'teachers-day-celebration',
            title: 'Teachers Day Celebrated with Gratitude and Joy',
            excerpt: 'Students organized special programs to express their appreciation for their beloved teachers.',
            image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&h=400&fit=crop',
            category: 'Events',
            author: 'Student Council',
            date: '2024-09-05',
            featured: false,
        },
        {
            id: 6,
            slug: 'winter-break-notice',
            title: 'Winter Break Notice - School Reopens on Magh 1',
            excerpt: 'The school will remain closed for winter vacation from Poush 15 to Poush 30.',
            image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&h=400&fit=crop',
            category: 'News',
            author: 'Administration',
            date: '2024-12-01',
            featured: false,
        },
    ];

    const filteredBlogs = blogs.filter((blog) => {
        const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;
        const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredBlogs = blogs.filter((blog) => blog.featured);

    return (
        <div className="py-12">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-green-600 to-green-800 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            News & Blog
                        </h1>
                        <p className="text-xl text-green-100">
                            Stay updated with the latest news, events, and achievements from our school community.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Posts */}
            {featuredBlogs.length > 0 && (
                <section className="py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Stories</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {featuredBlogs.map((blog) => (
                                <Link key={blog.id} to={`/blog/${blog.slug}`}>
                                    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
                                        <div className="relative h-64">
                                            <img
                                                src={blog.image}
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                            <div className="absolute top-4 left-4">
                                                <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500">
                                                    {blog.category}
                                                </Badge>
                                            </div>
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors">
                                                    {blog.title}
                                                </h3>
                                                <div className="flex items-center gap-4 text-white/80 text-sm">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {formatDate(blog.date)}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <User className="w-4 h-4" />
                                                        {blog.author}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Blog List */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {BLOG_CATEGORIES.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === category
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Blog Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBlogs.map((blog) => (
                            <Link key={blog.id} to={`/blog/${blog.slug}`}>
                                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
                                    <div className="relative h-48">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <Badge variant="secondary" className="bg-white/90">
                                                {blog.category}
                                            </Badge>
                                        </div>
                                    </div>
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-4 text-gray-500 text-sm mb-3">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {formatDate(blog.date)}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-2">
                                            {truncateText(blog.excerpt, 100)}
                                        </p>
                                        <div className="mt-4 flex items-center text-green-600 font-medium text-sm group/link">
                                            Read More
                                            <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    {filteredBlogs.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Blog;
