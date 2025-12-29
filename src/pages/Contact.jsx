import { useState } from 'react';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
    CheckCircle2,
    Facebook,
    Instagram,
    Youtube
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CONTACT_INFO, SOCIAL_LINKS } from '@/utils/constants';
import { messagesAPI } from '@/api';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await messagesAPI.submit(formData);
            setSuccess(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const contactDetails = [
        {
            icon: MapPin,
            title: 'Address',
            content: CONTACT_INFO.address,
            link: null,
        },
        {
            icon: Phone,
            title: 'Phone',
            content: CONTACT_INFO.phone,
            link: `tel:${CONTACT_INFO.phone}`,
        },
        {
            icon: Mail,
            title: 'Email',
            content: CONTACT_INFO.email,
            link: `mailto:${CONTACT_INFO.email}`,
        },
        {
            icon: Clock,
            title: 'Office Hours',
            content: 'Sun - Fri: 6:30 AM - 4:00 PM',
            link: null,
        },
    ];

    return (
        <div className="py-12">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-green-600 to-green-800 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
                        <p className="text-xl text-green-100">
                            Have questions? We'd love to hear from you. Get in touch with our team.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Contact Info */}
                        <div className="lg:col-span-1 space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Get in Touch</h2>
                                <p className="text-gray-600">
                                    Feel free to reach out to us. We're here to help and answer any questions you may have.
                                </p>
                            </div>

                            {/* Contact Cards */}
                            <div className="space-y-4">
                                {contactDetails.map((detail, index) => {
                                    const Icon = detail.icon;
                                    const content = (
                                        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                                            <CardContent className="p-4 flex items-start gap-4">
                                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <Icon className="w-6 h-6 text-green-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{detail.title}</h3>
                                                    <p className="text-gray-600">{detail.content}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );

                                    return detail.link ? (
                                        <a key={index} href={detail.link} className="block">
                                            {content}
                                        </a>
                                    ) : (
                                        <div key={index}>{content}</div>
                                    );
                                })}
                            </div>

                            {/* Social Links */}
                            <div className="pt-4">
                                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                                <div className="flex gap-3">
                                    <a
                                        href={SOCIAL_LINKS.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                                    >
                                        <Facebook className="w-6 h-6" />
                                    </a>
                                    <a
                                        href={SOCIAL_LINKS.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors"
                                    >
                                        <Instagram className="w-6 h-6" />
                                    </a>
                                    <a
                                        href={SOCIAL_LINKS.youtube}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"
                                    >
                                        <Youtube className="w-6 h-6" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <Card className="border-0 shadow-xl">
                                <CardContent className="p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

                                    {success ? (
                                        <div className="text-center py-12">
                                            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                                                <CheckCircle2 className="w-10 h-10 text-green-600" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                            <p className="text-gray-600 mb-6">
                                                Thank you for reaching out. We'll get back to you as soon as possible.
                                            </p>
                                            <Button
                                                className="bg-green-600 hover:bg-green-700"
                                                onClick={() => setSuccess(false)}
                                            >
                                                Send Another Message
                                            </Button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            {error && (
                                                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
                                                    {error}
                                                </div>
                                            )}

                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name">Full Name *</Label>
                                                    <Input
                                                        id="name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="Your full name"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email *</Label>
                                                    <Input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="example@email.com"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="phone">Phone Number</Label>
                                                    <Input
                                                        id="phone"
                                                        name="phone"
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        placeholder="+977-98XXXXXXXX"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="subject">Subject *</Label>
                                                    <Input
                                                        id="subject"
                                                        name="subject"
                                                        value={formData.subject}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="What is this about?"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="message">Message *</Label>
                                                <Textarea
                                                    id="message"
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Write your message here..."
                                                    rows={6}
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    'Sending...'
                                                ) : (
                                                    <>
                                                        Send Message
                                                        <Send className="ml-2 w-4 h-4" />
                                                    </>
                                                )}
                                            </Button>
                                        </form>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Find Us</h2>
                        <p className="text-gray-600">Visit our campus to see our facilities and meet our team.</p>
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-xl h-[400px]">
                        <iframe
                            src={CONTACT_INFO.mapUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="School Location"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
