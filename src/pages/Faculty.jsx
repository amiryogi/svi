import { useState, useEffect } from 'react';
import { Search, Mail, Phone, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/utils/helpers';
import { teachersAPI } from '@/api';

const Faculty = () => {
    const [facultyMembers, setFacultyMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeDepartment, setActiveDepartment] = useState('All');

    const departments = ['All', 'Management', 'Science', 'Mathematics', 'Languages', 'Primary', 'Kindergarten', 'Administration'];

    // Fetch faculty on mount
    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const response = await teachersAPI.getAll();
                if (response.data.data) {
                    setFacultyMembers(response.data.data);
                }
            } catch (error) {
                console.error('Failed to fetch faculty:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFaculty();
    }, []);

    const filteredFaculty = facultyMembers.filter((member) => {
        const matchesDepartment = activeDepartment === 'All' || member.department === activeDepartment;
        const matchesSearch = member.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.position?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesDepartment && matchesSearch;
    });

    // Separate leadership from other faculty
    const leadership = filteredFaculty.filter((m) =>
        m.position?.includes('Principal') || m.position?.includes('Head') || m.position?.includes('Coordinator')
    );
    const teachers = filteredFaculty.filter((m) =>
        !m.position?.includes('Principal') && !m.position?.includes('Head') && !m.position?.includes('Coordinator')
    );

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
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Faculty</h1>
                        <p className="text-xl text-green-100">
                            Meet our dedicated team of educators committed to shaping the future of our students.
                        </p>
                    </div>
                </div>
            </section>

            {/* Faculty List */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4 mb-10">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                placeholder="Search faculty..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {departments.map((dept) => (
                                <button
                                    key={dept}
                                    onClick={() => setActiveDepartment(dept)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeDepartment === dept
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {dept}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Leadership */}
                    {leadership.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">School Leadership</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {leadership.map((member) => (
                                    <Card key={member._id} className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                                        <div className="h-2 bg-gradient-to-r from-green-500 to-green-600" />
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <Avatar className="w-20 h-20 border-4 border-green-100">
                                                    <AvatarImage src={member.image?.url} alt={member.name} />
                                                    <AvatarFallback className="bg-green-100 text-green-700 text-xl">
                                                        {getInitials(member.name)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-gray-900">{member.name}</h3>
                                                    <p className="text-green-600 font-medium">{member.position}</p>
                                                    <p className="text-gray-500 text-sm">{member.qualification}</p>
                                                    <p className="text-gray-400 text-xs mt-1">{member.department}</p>
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                                                {member.email && (
                                                    <a
                                                        href={`mailto:${member.email}`}
                                                        className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors text-sm"
                                                    >
                                                        <Mail className="w-4 h-4" />
                                                        {member.email}
                                                    </a>
                                                )}
                                                {member.phone && (
                                                    <a
                                                        href={`tel:${member.phone}`}
                                                        className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors text-sm"
                                                    >
                                                        <Phone className="w-4 h-4" />
                                                        {member.phone}
                                                    </a>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Teachers */}
                    {teachers.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Teaching Staff</h2>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {teachers.map((member) => (
                                    <Card key={member._id} className="border-0 shadow-md hover:shadow-lg transition-shadow text-center">
                                        <CardContent className="p-6">
                                            <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-gray-100">
                                                <AvatarImage src={member.image?.url} alt={member.name} />
                                                <AvatarFallback className="bg-green-100 text-green-700 text-2xl">
                                                    {getInitials(member.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <h3 className="font-bold text-gray-900">{member.name}</h3>
                                            <p className="text-green-600 text-sm font-medium">{member.position}</p>
                                            <p className="text-gray-500 text-xs mt-1">{member.qualification}</p>
                                            <span className="inline-block mt-3 bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                                                {member.department}
                                            </span>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {filteredFaculty.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No faculty members found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Faculty;
