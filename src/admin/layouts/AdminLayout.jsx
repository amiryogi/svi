import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
    LayoutDashboard,
    Video,
    Bell,
    BookOpen,
    FileText,
    Image as ImageIcon,
    Users,
    MessageSquare,
    ClipboardList,
    LogOut,
    Menu,
    X,
    ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/context/AuthContext';
import { APP_NAME } from '@/utils/constants';
import { getInitials } from '@/utils/helpers';
import { Link, NavLink } from 'react-router-dom';

const AdminLayout = () => {
    const { user, isAuthenticated, loading, logout } = useAuth();
    const location = useLocation();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: Video, label: 'Hero Video', path: '/admin/hero' },
        { icon: Bell, label: 'Notices', path: '/admin/notices' },
        { icon: BookOpen, label: 'Academics', path: '/admin/academics' },
        { icon: FileText, label: 'Blog Posts', path: '/admin/blog' },
        { icon: ImageIcon, label: 'Gallery', path: '/admin/gallery' },
        { icon: Users, label: 'Teachers', path: '/admin/teachers' },
        { icon: ClipboardList, label: 'Inquiries', path: '/admin/inquiries' },
        { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    const handleLogout = () => {
        logout();
    };

    const SidebarContent = ({ onNavClick }) => (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-4 border-b border-gray-200">
                <Link to="/admin" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">S</span>
                    </div>
                    {!sidebarCollapsed && (
                        <div>
                            <h1 className="font-bold text-gray-900">{APP_NAME}</h1>
                            <p className="text-xs text-gray-500">Admin Panel</p>
                        </div>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <ScrollArea className="flex-1 py-4">
                <nav className="px-3 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={onNavClick}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                        ? 'bg-green-100 text-green-700'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-green-600' : ''}`} />
                                {!sidebarCollapsed && <span>{item.label}</span>}
                            </NavLink>
                        );
                    })}
                </nav>
            </ScrollArea>

            {/* User Section */}
            <div className="p-4 border-t border-gray-200">
                <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
                    <Avatar className="w-9 h-9">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback className="bg-green-100 text-green-700 text-sm">
                            {getInitials(user?.name || 'Admin')}
                        </AvatarFallback>
                    </Avatar>
                    {!sidebarCollapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'Admin'}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                    )}
                </div>
                <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className={`w-full mt-3 text-red-600 hover:text-red-700 hover:bg-red-50 ${sidebarCollapsed ? 'px-2' : ''
                        }`}
                >
                    <LogOut className="w-5 h-5" />
                    {!sidebarCollapsed && <span className="ml-2">Logout</span>}
                </Button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Desktop Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 hidden lg:block z-30 ${sidebarCollapsed ? 'w-20' : 'w-64'
                    }`}
            >
                <SidebarContent />
                <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 shadow-sm"
                >
                    <ChevronLeft className={`w-4 h-4 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
                </button>
            </aside>

            {/* Mobile Sidebar */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetContent side="left" className="w-64 p-0">
                    <SidebarContent onNavClick={() => setMobileOpen(false)} />
                </SheetContent>
            </Sheet>

            {/* Main Content */}
            <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
                {/* Top Header */}
                <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 lg:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-lg font-semibold text-gray-900">
                            {navItems.find((item) => item.path === location.pathname)?.label || 'Dashboard'}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <a
                            href="/"
                            target="_blank"
                            className="text-sm text-gray-500 hover:text-green-600 transition-colors"
                        >
                            View Website →
                        </a>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 lg:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
