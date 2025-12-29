import { useState, useEffect } from 'react';
import {
    BookOpen,
    Users,
    Clock,
    Award,
    ChevronRight,
    GraduationCap,
    Beaker,
    Calculator,
    Palette,
    Music,
    Trophy,
    Loader2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { academicsAPI } from '@/api';

const Academics = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('');

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await academicsAPI.getAll();
                if (response.data.data) {
                    const fetchedPrograms = response.data.data.filter(p => p.active !== false);
                    setPrograms(fetchedPrograms);
                    if (fetchedPrograms.length > 0) {
                        setActiveTab(fetchedPrograms[0]._id);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch programs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPrograms();
    }, []);

    // Helper to get icon based on subject or keyword
    const getFeatureIcon = (text) => {
        const lower = text.toLowerCase();
        if (lower.includes('science') || lower.includes('lab')) return Beaker;
        if (lower.includes('math') || lower.includes('business')) return Calculator;
        if (lower.includes('art') || lower.includes('craft')) return Palette;
        if (lower.includes('music') || lower.includes('dance')) return Music;
        if (lower.includes('sport') || lower.includes('game')) return Trophy;
        if (lower.includes('exam') || lower.includes('career')) return GraduationCap;
        return BookOpen;
    };

    // Helper to get features list (if not in DB, generate from description/subjects)
    const getFeatures = (program) => {
        // If we had stored features in DB we would use them. 
        // For now, we'll generate some generic ones or extract from description if possible.
        // This is a placeholder logic to match the previous design's rich UI.
        const defaultFeatures = [
            { icon: BookOpen, text: 'Comprehensive Curriculum' },
            { icon: Users, text: 'Experienced Faculty' },
            { icon: Clock, text: 'Regular Assessment' },
            { icon: Award, text: 'Holistic Development' },
        ];
        return defaultFeatures;
    };

    const getProgramImage = (programName) => {
        const lower = programName.toLowerCase();
        if (lower.includes('kindergarten') || lower.includes('pre-school'))
            return 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=400&fit=crop';
        if (lower.includes('primary'))
            return 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop';
        if (lower.includes('middle'))
            return 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop';
        if (lower.includes('secondary') || lower.includes('see'))
            return 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=400&fit=crop';
        if (lower.includes('science'))
            return 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=400&fit=crop';
        if (lower.includes('management') || lower.includes('business'))
            return 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop';
        
        return 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop';
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            </div>
        );
    }

    return (
        <div className="py-12">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-green-600 to-green-800 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-300 rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Academic Programs
                        </h1>
                        <p className="text-xl text-green-100">
                            From Kindergarten to Grade 12, we offer comprehensive education that prepares students for success in life.
                        </p>
                    </div>
                </div>
            </section>

            {/* Programs Content */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {programs.length > 0 ? (
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                            {/* Tab Navigation */}
                            <div className="overflow-x-auto pb-2">
                                <TabsList className="inline-flex w-full lg:w-auto bg-gray-100 p-1 rounded-xl">
                                    {programs.map((program) => (
                                        <TabsTrigger
                                            key={program._id}
                                            value={program._id}
                                            className="px-4 py-2.5 text-sm font-medium whitespace-nowrap data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-md rounded-lg transition-all"
                                        >
                                            {program.name}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </div>

                            {/* Tab Content */}
                            {programs.map((program) => (
                                <TabsContent key={program._id} value={program._id} className="mt-8">
                                    <div className="grid lg:grid-cols-2 gap-8 items-start">
                                        {/* Left Column - Info */}
                                        <div>
                                            {program.subtitle && (
                                                <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">
                                                    {program.subtitle}
                                                </span>
                                            )}
                                            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
                                                {program.name}
                                            </h2>
                                            <p className="text-gray-600 text-lg mb-8">
                                                {program.description}
                                            </p>

                                            {/* Features (Generated based on content) */}
                                            <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                                {getFeatures(program).map((feature, index) => {
                                                    const Icon = feature.icon;
                                                    return (
                                                        <div key={index} className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                                <Icon className="w-5 h-5 text-green-600" />
                                                            </div>
                                                            <span className="text-gray-700 font-medium">{feature.text}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Info Cards */}
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                {program.timing && (
                                                    <Card className="border-0 shadow-md">
                                                        <CardContent className="p-4 flex items-center gap-3">
                                                            <Clock className="w-5 h-5 text-yellow-600" />
                                                            <div>
                                                                <p className="text-sm text-gray-500">School Hours</p>
                                                                <p className="font-semibold text-gray-900">{program.timing}</p>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                )}
                                                {program.classSize && (
                                                    <Card className="border-0 shadow-md">
                                                        <CardContent className="p-4 flex items-center gap-3">
                                                            <Users className="w-5 h-5 text-blue-600" />
                                                            <div>
                                                                <p className="text-sm text-gray-500">Class Size</p>
                                                                <p className="font-semibold text-gray-900">{program.classSize}</p>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                )}
                                            </div>
                                        </div>

                                        {/* Right Column - Image & Subjects */}
                                        <div className="space-y-6">
                                            <div className="rounded-2xl overflow-hidden shadow-xl">
                                                <img
                                                    src={getProgramImage(program.name)}
                                                    alt={program.name}
                                                    className="w-full h-64 object-cover"
                                                />
                                            </div>

                                            {/* Subjects */}
                                            {program.subjects && program.subjects.length > 0 && (
                                                <Card className="border-0 shadow-lg">
                                                    <CardContent className="p-6">
                                                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                            <BookOpen className="w-5 h-5 text-green-600" />
                                                            Subjects Offered
                                                        </h3>
                                                        <div className="flex flex-wrap gap-2">
                                                            {program.subjects.map((subject, index) => (
                                                                <span
                                                                    key={index}
                                                                    className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium"
                                                                >
                                                                    {subject}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            )}
                                        </div>
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No academic programs currently available.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Extracurricular (Static for now as it doesn't have a backend model yet) */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Beyond Academics</span>
                        <h2 className="text-3xl font-bold text-gray-900 mt-2">Extracurricular Activities</h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { icon: Trophy, title: 'Sports', items: ['Football', 'Cricket', 'Basketball', 'Athletics'] },
                            { icon: Music, title: 'Arts', items: ['Dance', 'Music', 'Drama', 'Painting'] },
                            { icon: Users, title: 'Clubs', items: ['Science Club', 'Debate Club', 'Eco Club', 'Red Cross'] },
                            { icon: Award, title: 'Events', items: ['Annual Day', 'Sports Day', 'Science Fair', 'Cultural Programs'] },
                        ].map((activity, index) => {
                            const Icon = activity.icon;
                            return (
                                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-3">{activity.title}</h3>
                                        <ul className="space-y-2">
                                            {activity.items.map((item, idx) => (
                                                <li key={idx} className="flex items-center gap-2 text-gray-600 text-sm">
                                                    <ChevronRight className="w-4 h-4 text-green-500" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Academics;
