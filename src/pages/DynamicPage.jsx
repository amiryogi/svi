import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { pagesAPI } from '@/api';
import DOMPurify from 'dompurify';

const DynamicPage = () => {
    const { slug } = useParams();
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPage = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await pagesAPI.getBySlug(slug);
                if (response.data.data) {
                    setPage(response.data.data);
                    // Update document title
                    document.title = `${response.data.data.title} | SVI`;
                }
            } catch (err) {
                console.error('Failed to fetch page:', err);
                setError('Page not found');
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchPage();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            </div>
        );
    }

    if (error || !page) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center py-20">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
                <p className="text-gray-600">The page you're looking for doesn't exist or has been removed.</p>
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
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{page.title}</h1>
                        {page.metaDescription && (
                            <p className="text-xl text-green-100">{page.metaDescription}</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Page Content */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div
                            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-green-600 prose-strong:text-gray-900"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(page.content)
                            }}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DynamicPage;
