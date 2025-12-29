import { useState } from 'react';
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
    Trophy
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ACADEMIC_LEVELS, APP_NAME } from '@/utils/constants';

const Academics = () => {
    const [activeTab, setActiveTab] = useState('kindergarten');

    const programDetails = {
        kindergarten: {
            title: 'Kindergarten',
            subtitle: 'Pre-School, LKG & UKG',
            description: 'Our early childhood program focuses on play-based learning that nurtures creativity, social skills, and foundational literacy.',
            image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=400&fit=crop',
            features: [
                { icon: Palette, text: 'Creative Art & Craft Activities' },
                { icon: Music, text: 'Music and Movement' },
                { icon: Users, text: 'Social Skill Development' },
                { icon: BookOpen, text: 'Story Time & Early Literacy' },
            ],
            subjects: ['English', 'Nepali', 'Mathematics', 'EVS', 'Art & Craft', 'Music', 'Physical Education'],
            timing: '10:00 AM - 2:00 PM',
            classSize: '20-25 students',
        },
        primary: {
            title: 'Primary Level',
            subtitle: 'Grade 1 to Grade 5',
            description: 'Building strong academic foundations while encouraging curiosity and independent thinking.',
            image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop',
            features: [
                { icon: BookOpen, text: 'Activity-Based Learning' },
                { icon: Calculator, text: 'Strong Math Foundation' },
                { icon: Trophy, text: 'Inter-House Competitions' },
                { icon: Users, text: 'Group Projects & Collaboration' },
            ],
            subjects: ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Computer', 'Health & Physical Education', 'Moral Education'],
            timing: '9:30 AM - 3:30 PM',
            classSize: '25-30 students',
        },
        middle: {
            title: 'Middle School',
            subtitle: 'Grade 6 to Grade 8',
            description: 'Transitioning students to more advanced concepts while developing critical thinking and research skills.',
            image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop',
            features: [
                { icon: Beaker, text: 'Science Lab Experiments' },
                { icon: Calculator, text: 'Advanced Mathematics' },
                { icon: BookOpen, text: 'Language & Literature' },
                { icon: Trophy, text: 'Academic Competitions' },
            ],
            subjects: ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Optional Subjects', 'Computer Science', 'Health & Physical Education'],
            timing: '9:30 AM - 4:00 PM',
            classSize: '30-35 students',
        },
        secondary: {
            title: 'Secondary Level',
            subtitle: 'Grade 9 & 10 (SEE)',
            description: 'Comprehensive preparation for the SEE examination with focused academic guidance and career counseling.',
            image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=400&fit=crop',
            features: [
                { icon: GraduationCap, text: 'SEE Exam Preparation' },
                { icon: Beaker, text: 'Well-Equipped Labs' },
                { icon: Users, text: 'Career Counseling' },
                { icon: Award, text: 'Scholarship Programs' },
            ],
            subjects: ['Compulsory English', 'Compulsory Nepali', 'Compulsory Mathematics', 'Science', 'Social Studies', 'Optional Mathematics', 'Computer Science', 'Account/Economics'],
            timing: '6:30 AM - 2:30 PM',
            classSize: '35-40 students',
        },
        'plus-two-science': {
            title: 'NEB +2 Science',
            subtitle: 'Grade 11 & 12',
            description: 'Rigorous science program preparing students for medical, engineering, and technical careers.',
            image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=400&fit=crop',
            features: [
                { icon: Beaker, text: 'Advanced Science Labs' },
                { icon: GraduationCap, text: 'Entrance Exam Coaching' },
                { icon: Users, text: 'Expert Faculty' },
                { icon: Award, text: 'NEB Excellence' },
            ],
            subjects: ['English', 'Nepali', 'Physics', 'Chemistry', 'Mathematics/Biology', 'Computer Science'],
            timing: '6:30 AM - 12:30 PM',
            classSize: '40-45 students',
        },
        'plus-two-management': {
            title: 'NEB +2 Management',
            subtitle: 'Grade 11 & 12',
            description: 'Business-focused curriculum preparing students for commerce, economics, and management fields.',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
            features: [
                { icon: Calculator, text: 'Business Studies' },
                { icon: GraduationCap, text: 'Banking & Finance' },
                { icon: Users, text: 'Industry Exposure' },
                { icon: Award, text: 'Practical Projects' },
            ],
            subjects: ['English', 'Nepali', 'Account', 'Economics', 'Business Studies', 'Hotel Management/Marketing'],
            timing: '6:30 AM - 12:30 PM',
            classSize: '40-45 students',
        },
    };

    const currentProgram = programDetails[activeTab];

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
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                        {/* Tab Navigation */}
                        <div className="overflow-x-auto pb-2">
                            <TabsList className="inline-flex w-full lg:w-auto bg-gray-100 p-1 rounded-xl">
                                {ACADEMIC_LEVELS.map((level) => (
                                    <TabsTrigger
                                        key={level.id}
                                        value={level.id}
                                        className="px-4 py-2.5 text-sm font-medium whitespace-nowrap data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-md rounded-lg transition-all"
                                    >
                                        {level.name}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        {/* Tab Content */}
                        {ACADEMIC_LEVELS.map((level) => {
                            const program = programDetails[level.id];
                            return (
                                <TabsContent key={level.id} value={level.id} className="mt-8">
                                    <div className="grid lg:grid-cols-2 gap-8 items-start">
                                        {/* Left Column - Info */}
                                        <div>
                                            <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">
                                                {program.subtitle}
                                            </span>
                                            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
                                                {program.title}
                                            </h2>
                                            <p className="text-gray-600 text-lg mb-8">
                                                {program.description}
                                            </p>

                                            {/* Features */}
                                            <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                                {program.features.map((feature, index) => {
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
                                                <Card className="border-0 shadow-md">
                                                    <CardContent className="p-4 flex items-center gap-3">
                                                        <Clock className="w-5 h-5 text-yellow-600" />
                                                        <div>
                                                            <p className="text-sm text-gray-500">School Hours</p>
                                                            <p className="font-semibold text-gray-900">{program.timing}</p>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                                <Card className="border-0 shadow-md">
                                                    <CardContent className="p-4 flex items-center gap-3">
                                                        <Users className="w-5 h-5 text-blue-600" />
                                                        <div>
                                                            <p className="text-sm text-gray-500">Class Size</p>
                                                            <p className="font-semibold text-gray-900">{program.classSize}</p>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </div>

                                        {/* Right Column - Image & Subjects */}
                                        <div className="space-y-6">
                                            <div className="rounded-2xl overflow-hidden shadow-xl">
                                                <img
                                                    src={program.image}
                                                    alt={program.title}
                                                    className="w-full h-64 object-cover"
                                                />
                                            </div>

                                            {/* Subjects */}
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
                                        </div>
                                    </div>
                                </TabsContent>
                            );
                        })}
                    </Tabs>
                </div>
            </section>

            {/* Extracurricular */}
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
