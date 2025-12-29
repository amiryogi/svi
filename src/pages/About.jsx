import {
    Target,
    Eye,
    Heart,
    BookOpen,
    Users,
    Award,
    Building,
    GraduationCap
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { APP_NAME } from '@/utils/constants';

const About = () => {
    const coreValues = [
        { icon: BookOpen, title: 'Academic Excellence', description: 'Commitment to highest standards of education and continuous learning.' },
        { icon: Heart, title: 'Integrity', description: 'Fostering honesty, ethics, and moral values in all endeavors.' },
        { icon: Users, title: 'Inclusivity', description: 'Creating a welcoming environment for students from all backgrounds.' },
        { icon: Award, title: 'Innovation', description: 'Embracing modern teaching methods and technology in education.' },
    ];

    const milestones = [
        { year: '1999', title: 'Foundation', description: 'School established with a vision for quality education' },
        { year: '2005', title: 'Expansion', description: 'Added secondary level education (Grade 9-10)' },
        { year: '2010', title: '+2 Program', description: 'Launched NEB affiliated +2 Science and Management' },
        { year: '2015', title: 'Infrastructure', description: 'New building with modern facilities inaugurated' },
        { year: '2020', title: 'Digital Era', description: 'Smart classrooms and e-learning initiatives launched' },
        { year: 'Present', title: 'Growing Strong', description: '2000+ students excelling in academics and beyond' },
    ];

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
                            About {APP_NAME}
                        </h1>
                        <p className="text-xl text-green-100">
                            Nurturing young minds with quality education, moral values, and holistic development since 1999.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Mission */}
                        <Card className="border-0 shadow-xl overflow-hidden group">
                            <div className="h-2 bg-gradient-to-r from-green-500 to-green-600" />
                            <CardContent className="p-8">
                                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Target className="w-8 h-8 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    To provide quality education that nurtures the intellectual, physical, social, and emotional development of every student. We aim to create a learning environment that encourages curiosity, creativity, and critical thinking while instilling strong moral values and a sense of responsibility towards society.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Vision */}
                        <Card className="border-0 shadow-xl overflow-hidden group">
                            <div className="h-2 bg-gradient-to-r from-yellow-400 to-yellow-500" />
                            <CardContent className="p-8">
                                <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Eye className="w-8 h-8 text-yellow-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    To be a leading educational institution that produces responsible citizens equipped with knowledge, skills, and values to excel in an ever-changing world. We envision our students as future leaders who contribute positively to their communities and the nation.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Principal's Message */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-8 items-center">
                            {/* Principal's Photo */}
                            <div className="md:col-span-1">
                                <div className="relative">
                                    <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                                        <img
                                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=600&fit=crop"
                                            alt="Principal"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl shadow-lg">
                                        <p className="font-bold">Ram Prasad Sharma</p>
                                        <p className="text-sm text-green-100">Principal</p>
                                    </div>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="md:col-span-2">
                                <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">
                                    Principal's Message
                                </span>
                                <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-6">
                                    Welcome to Our School
                                </h2>
                                <div className="space-y-4 text-gray-600 leading-relaxed">
                                    <p>
                                        Dear Students, Parents, and Visitors,
                                    </p>
                                    <p>
                                        It is my great pleasure to welcome you to {APP_NAME}. For over two decades, we have been committed to providing an educational experience that goes beyond textbooks and examinations.
                                    </p>
                                    <p>
                                        Our dedicated team of educators works tirelessly to create an environment where every child can discover their potential, develop their talents, and grow into confident, responsible individuals.
                                    </p>
                                    <p>
                                        We believe in a holistic approach to education that balances academic rigor with extracurricular activities, moral education, and life skills development. Our state-of-the-art facilities, innovative teaching methods, and supportive community create the perfect setting for learning and growth.
                                    </p>
                                    <p className="font-medium text-gray-900">
                                        Together, let us shape the future of our children and our nation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">What We Stand For</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Our Core Values</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {coreValues.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow group text-center">
                                    <CardContent className="p-8">
                                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            <Icon className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                        <p className="text-gray-600">{value.description}</p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* History Timeline */}
            <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-950 text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-green-400 font-semibold text-sm uppercase tracking-wider">Our Journey</span>
                        <h2 className="text-3xl md:text-4xl font-bold mt-2">School History</h2>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-green-600/30" />

                            {/* Timeline Items */}
                            {milestones.map((milestone, index) => (
                                <div
                                    key={index}
                                    className={`relative flex items-center gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                        }`}
                                >
                                    {/* Content */}
                                    <div className={`flex-1 ml-20 md:ml-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                                        <span className="text-yellow-400 font-bold text-lg">{milestone.year}</span>
                                        <h3 className="text-xl font-bold mt-1">{milestone.title}</h3>
                                        <p className="text-gray-400 mt-2">{milestone.description}</p>
                                    </div>

                                    {/* Dot */}
                                    <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-green-500 rounded-full border-4 border-gray-900" />

                                    {/* Empty space for alternating layout */}
                                    <div className="hidden md:block flex-1" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Facilities */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Our Campus</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Modern Facilities</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: Building, title: 'Smart Classrooms', desc: 'AC rooms with projectors and digital boards' },
                            { icon: BookOpen, title: 'Library', desc: 'Extensive collection of books and e-resources' },
                            { icon: GraduationCap, title: 'Science Labs', desc: 'Well-equipped Physics, Chemistry, and Biology labs' },
                        ].map((facility, index) => {
                            const Icon = facility.icon;
                            return (
                                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                                    <CardContent className="p-6 flex items-start gap-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">{facility.title}</h3>
                                            <p className="text-gray-600 text-sm">{facility.desc}</p>
                                        </div>
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

export default About;
