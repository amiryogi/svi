import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Calendar,
    ArrowLeft,
    Download,
    Share2,
    Facebook,
    Twitter,
    Loader2,
    FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate, getSocialShareUrl } from '@/utils/helpers';
import { noticesAPI } from '@/api';

const NoticeDetail = () => {
    const { id } = useParams();
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                setLoading(true);
                const response = await noticesAPI.getById(id);
                if (response.data.data) {
                    setNotice(response.data.data);
                } else {
                    setNotFound(true);
                }
            } catch (error) {
                console.error('Failed to fetch notice:', error);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        fetchNotice();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-green-600" />
            </div>
        );
    }

    if (notFound || !notice) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Notice Not Found</h1>
                <Link to="/" className="text-green-600 hover:underline">
                    ← Back to Home
                </Link>
            </div>
        );
    }

    const shareUrl = window.location.href;

    return (
        <div className="py-12">
            {/* Hero Section */}
            <section className="relative py-16 bg-gradient-to-br from-green-600 to-green-800 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <Link
                        to="/"
                        className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-yellow-400 text-yellow-900">
                            {notice.type || 'Notice'}
                        </Badge>
                        {notice.priority === 'high' && (
                            <Badge className="bg-red-500 text-white">Important</Badge>
                        )}
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl mb-4">
                        {notice.title}
                    </h1>
                    
                    <div className="flex items-center gap-4 text-white/80">
                        <span className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            {formatDate(notice.createdAt || notice.date)}
                        </span>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <Card className="border-0 shadow-xl">
                            <CardContent className="p-8">
                                {/* Notice Content */}
                                <div 
                                    className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600"
                                    dangerouslySetInnerHTML={{ __html: notice.content || notice.description || 'No content available.' }}
                                />

                                {/* Attachment */}
                                {notice.attachment?.url && (
                                    <div className="mt-8 pt-6 border-t border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                            <FileText className="w-5 h-5" />
                                            Attachment
                                        </h3>
                                        <a
                                            href={notice.attachment.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download Attachment
                                        </a>
                                    </div>
                                )}

                                {/* Share Buttons */}
                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <Share2 className="w-5 h-5" />
                                        Share this notice
                                    </h3>
                                    <div className="flex gap-3">
                                        <a
                                            href={getSocialShareUrl('facebook', shareUrl, notice.title)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            <Facebook className="w-4 h-4" />
                                            Facebook
                                        </a>
                                        <a
                                            href={getSocialShareUrl('twitter', shareUrl, notice.title)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                                        >
                                            <Twitter className="w-4 h-4" />
                                            Twitter
                                        </a>
                                        <a
                                            href={getSocialShareUrl('whatsapp', shareUrl, notice.title)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                        >
                                            <Share2 className="w-4 h-4" />
                                            WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Back Button */}
                        <div className="mt-8 text-center">
                            <Link to="/">
                                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NoticeDetail;
