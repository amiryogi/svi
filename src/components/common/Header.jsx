import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NAV_LINKS, APP_NAME } from '@/utils/constants';
import { Button } from '@/components/ui/button';
import { navigationAPI, pagesAPI } from '@/api';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [pages, setPages] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);
    const location = useLocation();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => {
        setIsMenuOpen(false);
        setOpenDropdown(null);
    };

    // Fetch dynamic navigation
    useEffect(() => {
        const fetchNavigation = async () => {
            try {
                const [navResponse, pagesResponse] = await Promise.all([
                    navigationAPI.get(),
                    pagesAPI.getAll()
                ]);

                if (navResponse.data.data?.items?.length > 0) {
                    setMenuItems(navResponse.data.data.items);
                }
                if (pagesResponse.data.data) {
                    setPages(pagesResponse.data.data);
                }
            } catch (error) {
                console.error('Failed to fetch navigation:', error);
                // Will fall back to static NAV_LINKS
            }
        };

        fetchNavigation();
    }, []);

    // Close dropdown when route changes
    useEffect(() => {
        setOpenDropdown(null);
    }, [location.pathname]);

    // Get URL for menu item
    const getItemUrl = (item) => {
        if (item.type === 'link') {
            return item.url || '#';
        }
        // For page type, find the page slug
        const page = pages.find(p => p._id === item.pageId);
        return page ? `/pages/${page.slug}` : '#';
    };

    // Check if item is external link
    const isExternalLink = (item) => {
        if (item.type === 'link' && item.url) {
            return item.url.startsWith('http') || item.url.startsWith('//');
        }
        return false;
    };

    // Render a single menu item (can be recursive for children)
    const renderMenuItem = (item, isMobile = false) => {
        const hasChildren = item.children && item.children.length > 0;
        const url = getItemUrl(item);
        const isExternal = isExternalLink(item);
        const isDropdownOpen = openDropdown === item.id;

        if (hasChildren) {
            // Render dropdown
            return (
                <div key={item.id} className="relative">
                    <button
                        onClick={() => setOpenDropdown(isDropdownOpen ? null : item.id)}
                        className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-700 hover:text-green-600 hover:bg-gray-50 ${isMobile ? 'w-full justify-between py-3' : ''}`}
                    >
                        {item.label}
                        <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                        <div className={`${isMobile ? 'pl-4 mt-1 space-y-1' : 'absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[180px] z-50'}`}>
                            {item.children.map((child) => {
                                const childUrl = getItemUrl(child);
                                const childIsExternal = isExternalLink(child);

                                if (childIsExternal) {
                                    return (
                                        <a
                                            key={child.id}
                                            href={childUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={closeMenu}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600"
                                        >
                                            {child.label}
                                        </a>
                                    );
                                }

                                return (
                                    <NavLink
                                        key={child.id}
                                        to={childUrl}
                                        onClick={closeMenu}
                                        className={({ isActive }) =>
                                            `block px-4 py-2 text-sm font-medium transition-colors ${isActive ? 'text-green-700 bg-green-50' : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'}`
                                        }
                                    >
                                        {child.label}
                                    </NavLink>
                                );
                            })}
                        </div>
                    )}
                </div>
            );
        }

        // Simple link (no children)
        if (isExternal) {
            return (
                <a
                    key={item.id}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-700 hover:text-green-600 hover:bg-gray-50 ${isMobile ? 'block py-3' : ''}`}
                >
                    {item.label}
                </a>
            );
        }

        return (
            <NavLink
                key={item.id}
                to={url}
                onClick={closeMenu}
                className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? 'text-green-700 bg-green-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'} ${isMobile ? 'block py-3' : ''}`
                }
            >
                {item.label}
            </NavLink>
        );
    };

    // Use dynamic menu if available, otherwise fall back to static
    const useStaticNav = menuItems.length === 0;

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
                        {useStaticNav ? (
                            // Static fallback navigation
                            NAV_LINKS.map((link) => (
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
                            ))
                        ) : (
                            // Dynamic navigation
                            menuItems.map((item) => renderMenuItem(item, false))
                        )}
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
                        {useStaticNav ? (
                            NAV_LINKS.map((link) => (
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
                            ))
                        ) : (
                            menuItems.map((item) => renderMenuItem(item, true))
                        )}
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
