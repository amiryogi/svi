import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ChevronRight, Search, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BLOG_CATEGORIES } from '@/utils/constants';
import { formatDate, truncateText } from '@/utils/helpers';
import { blogAPI } from '@/api';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch blogs on mount
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await blogAPI.getAll();
                if (response.data.data) {
                    setBlogs(response.data.data);
                }
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const filteredBlogs = blogs.filter((blog) => {
        const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;
        const matchesSearch = blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredBlogs = blogs.filter((blog) => blog.featured);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            </div>
        );
    }

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
                                <Link key={blog._id} to={`/blog/${blog.slug}`}>
                                    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
                                        <div className="relative h-64">
                                            <img
                                                src={blog.image?.url || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop'}
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
                                                        {formatDate(blog.createdAt)}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <User className="w-4 h-4" />
                                                        {blog.author?.name || 'Admin'}
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
                            <Link key={blog._id} to={`/blog/${blog.slug}`}>
                                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
                                    <div className="relative h-48">
                                        <img
                                            src={blog.image?.url || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop'}
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
                                                {formatDate(blog.createdAt)}
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
