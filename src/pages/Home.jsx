import { Link } from 'react-router-dom';
import {
    GraduationCap,
    Users,
    Award,
    BookOpen,
    ArrowRight,
    Play,
    Calendar,
    ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { APP_NAME, APP_TAGLINE } from '@/utils/constants';

const Home = () => {
    // Sample data - would come from API
    const stats = [
        { icon: GraduationCap, value: '2000+', label: 'Students', color: 'from-green-500 to-green-600' },
        { icon: Users, value: '100+', label: 'Teachers', color: 'from-yellow-500 to-yellow-600' },
        { icon: Award, value: '25+', label: 'Years of Excellence', color: 'from-blue-500 to-blue-600' },
        { icon: BookOpen, value: '12', label: 'Grade Levels', color: 'from-purple-500 to-purple-600' },
    ];

    const programs = [
        {
            title: 'Kindergarten',
            grades: 'Pre-School to UKG',
            description: 'Building strong foundations through play-based learning and creative exploration.',
            image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=300&fit=crop',
        },
        {
            title: 'Primary & Middle',
            grades: 'Grade 1 to 8',
            description: 'Comprehensive curriculum developing critical thinking and core academic skills.',
            image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
        },
        {
            title: 'Secondary',
            grades: 'Grade 9 to 10',
            description: 'Preparing students for SEE examination with focused academic guidance.',
            image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop',
        },
        {
            title: 'NEB +2',
            grades: 'Science & Management',
            description: 'Higher secondary education with specialization in Science or Management streams.',
            image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
        },
    ];

    const notices = [
        { id: 1, title: 'Admission Open for 2081 BS', date: '2024-12-25', type: 'Admission' },
        { id: 2, title: 'Annual Sports Day Announcement', date: '2024-12-20', type: 'Event' },
        { id: 3, title: 'Parent-Teacher Meeting Schedule', date: '2024-12-18', type: 'Meeting' },
        { id: 4, title: 'Winter Break Notice', date: '2024-12-15', type: 'Holiday' },
    ];

    return (
        <div className="overflow-hidden">
            {/* Hero Section with Video */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                        poster="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&h=1080&fit=crop"
                    >
                        <source
                            src="https://cdn.pixabay.com/video/2020/05/25/40088-424930977_large.mp4"
                            type="video/mp4"
                        />
                    </video>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 py-20">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-6">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-green-300 text-sm font-medium">Admission Open 2081</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            Welcome to{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-400">
                                {APP_NAME}
                            </span>
                        </h1>

                        <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                            {APP_TAGLINE}. Providing quality education from Kindergarten to Grade 12, including NEB +2 Science and Management programs.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/admissions">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-2xl shadow-green-500/30 transition-all duration-300 group"
                                >
                                    Apply Now
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link to="/about">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                                >
                                    <Play className="mr-2 h-5 w-5" />
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
                        <div className="w-1.5 h-3 bg-white rounded-full animate-bounce" />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-16 -mt-20 z-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-shadow duration-300"
                                >
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                                    <p className="text-gray-600">{stat.label}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Programs Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Our Programs</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                            Academic Excellence at Every Level
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            From early childhood education to higher secondary studies, we offer comprehensive programs designed to nurture every student's potential.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {programs.map((program, index) => (
                            <Card key={index} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={program.image}
                                        alt={program.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-4 left-4">
                                        <span className="bg-yellow-400 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-full">
                                            {program.grades}
                                        </span>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{program.description}</p>
                                    <Link
                                        to="/academics"
                                        className="inline-flex items-center text-green-600 font-medium text-sm hover:text-green-700 group/link"
                                    >
                                        Learn More
                                        <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Notices Section */}
            <section className="py-20 bg-gradient-to-br from-green-50 to-yellow-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Left Column - CTA */}
                        <div className="lg:w-1/3">
                            <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Stay Updated</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                                Latest News & Notices
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Stay informed about school events, announcements, and important updates.
                            </p>
                            <Link to="/blog">
                                <Button className="bg-green-600 hover:bg-green-700 text-white">
                                    View All News
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        {/* Right Column - Notices */}
                        <div className="lg:w-2/3">
                            <div className="grid gap-4">
                                {notices.map((notice) => (
                                    <Link
                                        key={notice.id}
                                        to={`/blog/${notice.id}`}
                                        className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 group"
                                    >
                                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                                            <Calendar className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <span className="text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                                                {notice.type}
                                            </span>
                                            <h4 className="text-gray-900 font-semibold mt-1 group-hover:text-green-600 transition-colors truncate">
                                                {notice.title}
                                            </h4>
                                            <p className="text-sm text-gray-500">{notice.date}</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-400 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-300 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Ready to Join Our School Family?
                        </h2>
                        <p className="text-green-100 text-lg mb-8">
                            Give your child the gift of quality education. Apply now for the upcoming academic session and secure their bright future.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/admissions">
                                <Button
                                    size="lg"
                                    className="bg-white text-green-700 hover:bg-gray-100 shadow-xl"
                                >
                                    Apply for Admission
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-white/50 text-white hover:bg-white/10"
                                >
                                    Contact Us
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
