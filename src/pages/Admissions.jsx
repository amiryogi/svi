import { useState } from 'react';
import {
    ClipboardList,
    FileText,
    Calendar,
    CheckCircle2,
    Phone,
    Mail,
    Download,
    ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ACADEMIC_LEVELS, APP_NAME } from '@/utils/constants';
import { inquiriesAPI } from '@/api';

const Admissions = () => {
    const [formData, setFormData] = useState({
        studentName: '',
        parentName: '',
        email: '',
        phone: '',
        grade: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleGradeChange = (value) => {
        setFormData((prev) => ({ ...prev, grade: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await inquiriesAPI.submit(formData);
            setSuccess(true);
            setFormData({
                studentName: '',
                parentName: '',
                email: '',
                phone: '',
                grade: '',
                message: '',
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const admissionSteps = [
        {
            step: 1,
            title: 'Online Inquiry',
            description: 'Fill out the inquiry form below or visit our school for information.',
            icon: ClipboardList,
        },
        {
            step: 2,
            title: 'Document Submission',
            description: 'Submit required documents including birth certificate, transfer certificate, and previous marksheet.',
            icon: FileText,
        },
        {
            step: 3,
            title: 'Entrance Test',
            description: 'Appear for the entrance examination scheduled by the school.',
            icon: Calendar,
        },
        {
            step: 4,
            title: 'Interview & Admission',
            description: 'Selected candidates will be called for interview followed by admission confirmation.',
            icon: CheckCircle2,
        },
    ];

    const feeStructure = [
        { level: 'Kindergarten', admission: '15,000', monthly: '3,500' },
        { level: 'Primary (1-5)', admission: '20,000', monthly: '4,500' },
        { level: 'Middle (6-8)', admission: '25,000', monthly: '5,500' },
        { level: 'Secondary (9-10)', admission: '30,000', monthly: '6,500' },
        { level: '+2 Science', admission: '35,000', monthly: '7,500' },
        { level: '+2 Management', admission: '30,000', monthly: '7,000' },
    ];

    return (
        <div className="py-12">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-green-600 to-green-800 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/30 rounded-full px-4 py-2 mb-6">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                            <span className="text-yellow-300 text-sm font-medium">Admission Open 2081</span>
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Join {APP_NAME}
                        </h1>
                        <p className="text-xl text-green-100">
                            Begin your journey towards excellence. Apply now for the upcoming academic session.
                        </p>
                    </div>
                </div>
            </section>

            {/* Admission Process */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">How to Apply</span>
                        <h2 className="text-3xl font-bold text-gray-900 mt-2">Admission Process</h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {admissionSteps.map((step) => {
                            const Icon = step.icon;
                            return (
                                <div key={step.step} className="relative">
                                    <Card className="border-0 shadow-lg h-full">
                                        <CardContent className="p-6 text-center">
                                            <div className="w-14 h-14 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                                                <Icon className="w-7 h-7 text-white" />
                                            </div>
                                            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full mb-3">
                                                Step {step.step}
                                            </span>
                                            <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                                            <p className="text-gray-600 text-sm">{step.description}</p>
                                        </CardContent>
                                    </Card>
                                    {step.step < 4 && (
                                        <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                                            <ArrowRight className="w-6 h-6 text-gray-300" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Fee Structure */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Investment in Future</span>
                        <h2 className="text-3xl font-bold text-gray-900 mt-2">Fee Structure</h2>
                        <p className="text-gray-600 mt-2">Fees are in Nepali Rupees (NPR) and subject to change</p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <Card className="border-0 shadow-xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gradient-to-r from-green-600 to-green-700">
                                        <tr>
                                            <th className="text-left text-white font-semibold py-4 px-6">Level</th>
                                            <th className="text-center text-white font-semibold py-4 px-6">Admission Fee</th>
                                            <th className="text-center text-white font-semibold py-4 px-6">Monthly Fee</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {feeStructure.map((item, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="py-4 px-6 font-medium text-gray-900">{item.level}</td>
                                                <td className="py-4 px-6 text-center text-gray-600">Rs. {item.admission}</td>
                                                <td className="py-4 px-6 text-center text-gray-600">Rs. {item.monthly}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                        <p className="text-center text-gray-500 text-sm mt-4">
                            * Additional fees may apply for transportation, computer lab, and special activities.
                        </p>
                    </div>
                </div>
            </section>

            {/* Inquiry Form */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid lg:grid-cols-5 gap-8">
                            {/* Form Info */}
                            <div className="lg:col-span-2">
                                <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Get Started</span>
                                <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
                                    Admission Inquiry
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Fill out this form and our admissions team will get back to you within 24 hours.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                            <Phone className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Call Us</p>
                                            <p className="font-semibold text-gray-900">+977-1-1234567</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                            <Mail className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Email Us</p>
                                            <p className="font-semibold text-gray-900">admission@svischool.edu.np</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download Brochure
                                    </Button>
                                </div>
                            </div>

                            {/* Form */}
                            <div className="lg:col-span-3">
                                <Card className="border-0 shadow-xl">
                                    <CardContent className="p-8">
                                        {success ? (
                                            <div className="text-center py-8">
                                                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                                                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                                                <p className="text-gray-600">
                                                    Your inquiry has been submitted successfully. We will contact you soon.
                                                </p>
                                                <Button
                                                    className="mt-6 bg-green-600 hover:bg-green-700"
                                                    onClick={() => setSuccess(false)}
                                                >
                                                    Submit Another Inquiry
                                                </Button>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                {error && (
                                                    <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
                                                        {error}
                                                    </div>
                                                )}

                                                <div className="grid sm:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="studentName">Student Name *</Label>
                                                        <Input
                                                            id="studentName"
                                                            name="studentName"
                                                            value={formData.studentName}
                                                            onChange={handleChange}
                                                            required
                                                            placeholder="Enter student's full name"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                                                        <Input
                                                            id="parentName"
                                                            name="parentName"
                                                            value={formData.parentName}
                                                            onChange={handleChange}
                                                            required
                                                            placeholder="Enter parent's name"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid sm:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="email">Email *</Label>
                                                        <Input
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            required
                                                            placeholder="example@email.com"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="phone">Phone Number *</Label>
                                                        <Input
                                                            id="phone"
                                                            name="phone"
                                                            type="tel"
                                                            value={formData.phone}
                                                            onChange={handleChange}
                                                            required
                                                            placeholder="+977-98XXXXXXXX"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="grade">Applying for Grade *</Label>
                                                    <Select onValueChange={handleGradeChange} value={formData.grade}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select grade" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {ACADEMIC_LEVELS.flatMap((level) =>
                                                                level.grades.map((grade) => (
                                                                    <SelectItem key={`${level.id}-${grade}`} value={grade}>
                                                                        {level.name} - {grade}
                                                                    </SelectItem>
                                                                ))
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="message">Additional Message</Label>
                                                    <Textarea
                                                        id="message"
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        placeholder="Any specific questions or information..."
                                                        rows={4}
                                                    />
                                                </div>

                                                <Button
                                                    type="submit"
                                                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Submitting...' : 'Submit Inquiry'}
                                                </Button>
                                            </form>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Admissions;
