import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { APP_NAME } from '@/utils/constants';
import { toast } from 'sonner';

const Login = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated, loading: authLoading } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Redirect if already authenticated
    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/admin" replace />;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // DEBUG: Log login attempt details
        console.group('Login Attempt Debug');
        console.log('API URL:', import.meta.env.VITE_API_URL);
        console.log('Email:', formData.email);
        console.log('Password Length:', formData.password.length);
        console.log('Timestamp:', new Date().toISOString());
        console.groupEnd();

        try {
            const result = await login(formData);

            console.log('Login Result:', result);

            if (result.success) {
                toast.success('Successfully logged in!', {
                    description: 'Welcome back to the dashboard.',
                });
                navigate('/admin');
            } else {
                const errorMsg = result.error || 'Invalid credentials';
                setError(errorMsg);
                toast.error('Login Failed', {
                    description: errorMsg,
                });
                console.error('Login Error:', errorMsg);
            }
        } catch (err) {
            console.error('Unexpected Login Error:', err);
            toast.error('System Error', {
                description: 'An unexpected error occurred. Check console for details.',
            });
            setError('System error occurred');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 to-green-800 p-4">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-400/20 rounded-full blur-3xl" />
            </div>

            <Card className="w-full max-w-md relative z-10 border-0 shadow-2xl">
                <CardHeader className="text-center pb-0">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                        <span className="text-white font-bold text-2xl">S</span>
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">{APP_NAME}</CardTitle>
                    <CardDescription>Admin Dashboard Login</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="admin@school.edu.np"
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your password"
                                    className="pl-10 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <a href="/" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                            ← Back to Website
                        </a>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
