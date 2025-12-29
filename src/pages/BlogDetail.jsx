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
    ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate, getSocialShareUrl, isYouTubeUrl, getYouTubeId } from '@/utils/helpers';

const BlogDetail = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);

    // Sample blog data - would come from API
    useEffect(() => {
        // Simulating API call
        const blogData = {
            id: 1,
            slug: 'annual-sports-day-2024',
            title: 'Annual Sports Day 2024 Celebrated with Great Enthusiasm',
            content: `
        <p>The Annual Sports Day 2024 was celebrated with great enthusiasm and sportsmanship at our school campus. Students from all grades participated in various sporting events showcasing their athletic abilities and team spirit.</p>
        
        <h2>Event Highlights</h2>
        <p>The day began with a grand opening ceremony featuring the school march past by all four houses - Red, Blue, Yellow, and Green. The chief guest, Mr. Ram Bahadur Thapa, a renowned sports personality, graced the occasion.</p>
        
        <h3>Track Events</h3>
        <p>The track events included 100m, 200m, and 400m races for different age categories. The relay races were the highlight of the day, with intense competition between the houses.</p>
        
        <h3>Field Events</h3>
        <p>Field events such as long jump, high jump, shot put, and discus throw witnessed remarkable performances from our young athletes.</p>
        
        <h2>Winners and Achievements</h2>
        <p>Green House emerged as the overall champion, followed closely by Blue House. Individual champions were awarded medals and certificates by the chief guest.</p>
        
        <blockquote>"This Sports Day has been a testament to our students' dedication and the school's commitment to holistic education." - Principal</blockquote>
        
        <p>The event concluded with a colorful closing ceremony and prize distribution. We congratulate all participants and winners for making this event a grand success.</p>
      `,
            image: 'https://images.unsplash.com/photo-1461896836934- voices-13a7-7c2a?w=1200&h=600&fit=crop',
            category: 'Events',
            author: 'Admin',
            authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
            date: '2024-12-20',
            youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            socialLinks: {
                facebook: 'https://facebook.com/svischool',
                instagram: 'https://instagram.com/svischool',
            },
        };
        setBlog(blogData);
    }, [slug]);

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
        );
    }

    const shareUrl = window.location.href;

    const relatedPosts = [
        {
            id: 2,
            slug: 'science-exhibition-2024',
            title: 'Inter-House Science Exhibition',
            image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&h=200&fit=crop',
            date: '2024-12-10',
        },
        {
            id: 3,
            slug: 'teachers-day-celebration',
            title: 'Teachers Day Celebration',
            image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&h=200&fit=crop',
            date: '2024-09-05',
        },
    ];

    return (
        <div className="py-12">
            {/* Hero Image */}
            <section className="relative h-[50vh] min-h-[400px]">
                <img
                    src={blog.image}
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
                                <img
                                    src={blog.authorImage}
                                    alt={blog.author}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="text-white font-medium">{blog.author}</p>
                                    <p className="text-sm">{formatDate(blog.date)}</p>
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
                                <Card className="border-0 shadow-lg">
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Posts</h3>
                                        <div className="space-y-4">
                                            {relatedPosts.map((post) => (
                                                <Link
                                                    key={post.id}
                                                    to={`/blog/${post.slug}`}
                                                    className="flex gap-4 group"
                                                >
                                                    <img
                                                        src={post.image}
                                                        alt={post.title}
                                                        className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                                                    />
                                                    <div>
                                                        <h4 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2 text-sm">
                                                            {post.title}
                                                        </h4>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {formatDate(post.date)}
                                                        </p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Follow Us */}
                                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-600 to-green-700 text-white">
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                                        <p className="text-green-100 text-sm mb-4">
                                            Stay connected with us on social media for the latest updates.
                                        </p>
                                        <div className="flex gap-3">
                                            <a
                                                href={blog.socialLinks?.facebook}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                                            >
                                                <Facebook className="w-5 h-5" />
                                            </a>
                                            <a
                                                href={blog.socialLinks?.instagram}
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
