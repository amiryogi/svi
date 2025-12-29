import { Link } from 'react-router-dom';
import {
    Facebook,
    Instagram,
    Youtube,
    Twitter,
    MapPin,
    Phone,
    Mail,
    Clock,
    ArrowRight
} from 'lucide-react';
import { NAV_LINKS, APP_NAME, SOCIAL_LINKS, CONTACT_INFO } from '@/utils/constants';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = NAV_LINKS.slice(0, 4);
    const moreLinks = NAV_LINKS.slice(4);

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* School Info */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">S</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">{APP_NAME}</h3>
                                <p className="text-xs text-green-400 font-medium">Excellence in Education</p>
                            </div>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Providing quality education from Kindergarten to Grade 12, including NEB +2 Science and Management programs. We nurture future leaders with excellence and integrity.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-3">
                            <a
                                href={SOCIAL_LINKS.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors duration-300"
                                aria-label="Facebook"
                            >
                                <Facebook size={18} />
                            </a>
                            <a
                                href={SOCIAL_LINKS.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition-colors duration-300"
                                aria-label="Instagram"
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href={SOCIAL_LINKS.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-colors duration-300"
                                aria-label="YouTube"
                            >
                                <Youtube size={18} />
                            </a>
                            <a
                                href={SOCIAL_LINKS.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-sky-500 flex items-center justify-center transition-colors duration-300"
                                aria-label="Twitter/X"
                            >
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors duration-200"
                                    >
                                        <ArrowRight size={14} />
                                        <span>{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* More Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Explore</h4>
                        <ul className="space-y-3">
                            {moreLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors duration-200"
                                    >
                                        <ArrowRight size={14} />
                                        <span>{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    to="/admin/login"
                                    className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                                >
                                    <ArrowRight size={14} />
                                    <span>Admin Login</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-400">{CONTACT_INFO.address}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-green-400 flex-shrink-0" />
                                <a
                                    href={`tel:${CONTACT_INFO.phone}`}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    {CONTACT_INFO.phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-green-400 flex-shrink-0" />
                                <a
                                    href={`mailto:${CONTACT_INFO.email}`}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    {CONTACT_INFO.email}
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Clock size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                                <div className="text-gray-400">
                                    <p>Sun - Fri: 6:30 AM - 4:00 PM</p>
                                    <p>Saturday: Closed</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-500 text-sm text-center md:text-left">
                            © {currentYear} {APP_NAME}. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 text-sm">
                            <Link to="/privacy" className="text-gray-500 hover:text-gray-300 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-gray-500 hover:text-gray-300 transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
