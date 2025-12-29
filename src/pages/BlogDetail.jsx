import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Calendar,
    User,
    ArrowLeft,
    Facebook,
    Twitter,
    Share2,
    Youtube,
    Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate, getSocialShareUrl, isYouTubeUrl, getYouTubeId } from '@/utils/helpers';
import { blogAPI } from '@/api';

const BlogDetail = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                const response = await blogAPI.getBySlug(slug);
                if (response.data.data) {
                    setBlog(response.data.data);
                    // Fetch related posts
                    const allResponse = await blogAPI.getAll({ limit: 3 });
                    if (allResponse.data.data) {
                        // Filter out current blog and take first 2
                        const related = allResponse.data.data
                            .filter(b => b.slug !== slug)
                            .slice(0, 2);
                        setRelatedPosts(related);
                    }
                } else {
                    setNotFound(true);
                }
            } catch (error) {
                console.error('Failed to fetch blog:', error);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-green-600" />
            </div>
        );
    }

    if (notFound || !blog) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
                <Link to="/blog" className="text-green-600 hover:underline">
                    ← Back to Blog
                </Link>
            </div>
        );
    }

    const shareUrl = window.location.href;

    return (
        <div className="py-12">
            {/* Hero Image */}
            <section className="relative h-[50vh] min-h-[400px]">
                <img
                    src={blog.image?.url || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=600&fit=crop'}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="container mx-auto">
                        <Link
                            to="/blog"
                            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Blog
                        </Link>
                        <Badge className="bg-yellow-400 text-yellow-900 mb-4">
                            {blog.category}
                        </Badge>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl">
                            {blog.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 mt-6 text-white/80">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                                    {blog.author?.name?.charAt(0) || 'A'}
                                </div>
                                <div>
                                    <p className="text-white font-medium">{blog.author?.name || 'Admin'}</p>
                                    <p className="text-sm">{formatDate(blog.createdAt)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* YouTube Video */}
                            {blog.youtubeUrl && isYouTubeUrl(blog.youtubeUrl) && (
                                <div className="mb-8">
                                    <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${getYouTubeId(blog.youtubeUrl)}`}
                                            title="YouTube video"
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Article Content */}
                            <article
                                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-green-600 prose-blockquote:border-l-green-500 prose-blockquote:bg-green-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg"
                                dangerouslySetInnerHTML={{ __html: blog.content }}
                            />

                            {/* Social Share */}
                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Share2 className="w-5 h-5" />
                                    Share this article
                                </h3>
                                <div className="flex gap-3">
                                    <a
                                        href={getSocialShareUrl('facebook', shareUrl, blog.title)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <Facebook className="w-4 h-4" />
                                        Facebook
                                    </a>
                                    <a
                                        href={getSocialShareUrl('twitter', shareUrl, blog.title)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                                    >
                                        <Twitter className="w-4 h-4" />
                                        Twitter
                                    </a>
                                    <a
                                        href={getSocialShareUrl('whatsapp', shareUrl, blog.title)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                    >
                                        <Share2 className="w-4 h-4" />
                                        WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-8">
                                {/* Related Posts */}
                                {relatedPosts.length > 0 && (
                                    <Card className="border-0 shadow-lg">
                                        <CardContent className="p-6">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Posts</h3>
                                            <div className="space-y-4">
                                                {relatedPosts.map((post) => (
                                                    <Link
                                                        key={post._id}
                                                        to={`/blog/${post.slug}`}
                                                        className="flex gap-4 group"
                                                    >
                                                        <img
                                                            src={post.image?.url || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop'}
                                                            alt={post.title}
                                                            className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                                                        />
                                                        <div>
                                                            <h4 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2 text-sm">
                                                                {post.title}
                                                            </h4>
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                {formatDate(post.createdAt)}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Follow Us */}
                                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-600 to-green-700 text-white">
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                                        <p className="text-green-100 text-sm mb-4">
                                            Stay connected with us on social media for the latest updates.
                                        </p>
                                        <div className="flex gap-3">
                                            <a
                                                href="https://facebook.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                                            >
                                                <Facebook className="w-5 h-5" />
                                            </a>
                                            <a
                                                href="https://youtube.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                                            >
                                                <Youtube className="w-5 h-5" />
                                            </a>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogDetail;
