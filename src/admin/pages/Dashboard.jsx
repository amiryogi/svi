import {
    Users,
    FileText,
    Image as ImageIcon,
    MessageSquare,
    ClipboardList,
    TrendingUp,
    Eye,
    Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    // Sample stats - would come from API
    const stats = [
        { icon: ClipboardList, label: 'Admission Inquiries', value: '24', change: '+5 this week', color: 'bg-blue-500', link: '/admin/inquiries' },
        { icon: MessageSquare, label: 'Messages', value: '12', change: '3 unread', color: 'bg-purple-500', link: '/admin/messages' },
        { icon: FileText, label: 'Blog Posts', value: '48', change: '+2 this month', color: 'bg-green-500', link: '/admin/blog' },
        { icon: ImageIcon, label: 'Gallery Items', value: '156', change: '+12 this month', color: 'bg-yellow-500', link: '/admin/gallery' },
        { icon: Users, label: 'Faculty Members', value: '54', change: '2 new', color: 'bg-pink-500', link: '/admin/teachers' },
    ];

    const recentInquiries = [
        { id: 1, name: 'Ramesh Sharma', grade: 'Grade 5', date: '2024-12-28', status: 'New' },
        { id: 2, name: 'Sita Poudel', grade: '+2 Science', date: '2024-12-27', status: 'Contacted' },
        { id: 3, name: 'Krishna Thapa', grade: 'Grade 1', date: '2024-12-26', status: 'New' },
        { id: 4, name: 'Gita Maharjan', grade: 'UKG', date: '2024-12-25', status: 'Pending' },
    ];

    const recentMessages = [
        { id: 1, name: 'Parent Inquiry', subject: 'About admission process', date: '2024-12-28', unread: true },
        { id: 2, name: 'Alumni', subject: 'Request for recommendation', date: '2024-12-27', unread: true },
        { id: 3, name: 'Vendor', subject: 'Sports equipment quote', date: '2024-12-26', unread: false },
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white">
                <h1 className="text-2xl font-bold mb-2">Welcome back, Admin!</h1>
                <p className="text-green-100">Here's what's happening with your school today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Link key={index} to={stat.link}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-0 shadow-md">
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                            <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
                                        </div>
                                        <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}>
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Inquiries */}
                <Card className="border-0 shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-semibold">Recent Inquiries</CardTitle>
                        <Link to="/admin/inquiries" className="text-sm text-green-600 hover:text-green-700">
                            View All →
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentInquiries.map((inquiry) => (
                                <div key={inquiry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900">{inquiry.name}</p>
                                        <p className="text-sm text-gray-500">{inquiry.grade}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${inquiry.status === 'New'
                                                ? 'bg-green-100 text-green-700'
                                                : inquiry.status === 'Contacted'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {inquiry.status}
                                        </span>
                                        <p className="text-xs text-gray-400 mt-1">{inquiry.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Messages */}
                <Card className="border-0 shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-semibold">Recent Messages</CardTitle>
                        <Link to="/admin/messages" className="text-sm text-green-600 hover:text-green-700">
                            View All →
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentMessages.map((message) => (
                                <div key={message.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        {message.unread && (
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        )}
                                        <div>
                                            <p className={`font-medium ${message.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                                                {message.name}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate max-w-[200px]">{message.subject}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-400">{message.date}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-0 shadow-md">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link
                            to="/admin/blog"
                            className="p-4 bg-green-50 rounded-xl text-center hover:bg-green-100 transition-colors"
                        >
                            <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-900">New Blog Post</p>
                        </Link>
                        <Link
                            to="/admin/notices"
                            className="p-4 bg-yellow-50 rounded-xl text-center hover:bg-yellow-100 transition-colors"
                        >
                            <Calendar className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-900">Add Notice</p>
                        </Link>
                        <Link
                            to="/admin/gallery"
                            className="p-4 bg-purple-50 rounded-xl text-center hover:bg-purple-100 transition-colors"
                        >
                            <ImageIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-900">Upload Photos</p>
                        </Link>
                        <Link
                            to="/admin/teachers"
                            className="p-4 bg-blue-50 rounded-xl text-center hover:bg-blue-100 transition-colors"
                        >
                            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-900">Add Teacher</p>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;
