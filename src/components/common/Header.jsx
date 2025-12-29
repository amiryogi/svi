import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NAV_LINKS, APP_NAME } from '@/utils/constants';
import { Button } from '@/components/ui/button';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
                        <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-xl">S</span>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-bold text-gray-900">{APP_NAME}</h1>
                            <p className="text-xs text-green-600 font-medium">Excellence in Education</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {NAV_LINKS.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                        ? 'text-green-700 bg-green-50'
                                        : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>

                    {/* CTA Button - Desktop */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Link to="/admissions">
                            <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg shadow-green-200 hover:shadow-green-300 transition-all duration-300">
                                Apply Now
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <nav className="container mx-auto px-4 py-4 bg-white border-t border-gray-100">
                    <div className="flex flex-col gap-1">
                        {NAV_LINKS.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${isActive
                                        ? 'text-green-700 bg-green-50'
                                        : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        <div className="pt-4 mt-2 border-t border-gray-100">
                            <Link to="/admissions" onClick={closeMenu}>
                                <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
                                    Apply Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
