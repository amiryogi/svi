import { useState, useEffect, useRef } from 'react';
import { Plus, Pencil, Trash2, Search, Mail, Phone, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { getInitials } from '@/utils/helpers';
import { teachersAPI } from '@/api';
import { toast } from 'sonner';

const TeachersManager = () => {
    const fileInputRef = useRef(null);
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        department: 'Management',
        email: '',
        phone: '',
        qualification: '',
    });

    const departments = ['Management', 'Science', 'Mathematics', 'Languages', 'Primary', 'Kindergarten', 'Administration'];

    // Fetch teachers on mount
    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            setLoading(true);
            const response = await teachersAPI.getAll();
            if (response.data.data) {
                setTeachers(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch teachers:', error);
            toast.error('Failed to load teachers');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast.error('Please select an image file');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image must be less than 5MB');
                return;
            }
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('position', formData.position);
            formDataToSend.append('department', formData.department);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('phone', formData.phone || '');
            formDataToSend.append('qualification', formData.qualification || '');

            if (selectedFile) {
                formDataToSend.append('image', selectedFile);
            }

            if (editingTeacher) {
                await teachersAPI.update(editingTeacher._id, formDataToSend);
                toast.success('Teacher updated successfully!');
            } else {
                await teachersAPI.create(formDataToSend);
                toast.success('Teacher added successfully!');
            }

            await fetchTeachers();
            resetForm();
        } catch (error) {
            console.error('Save failed:', error);
            toast.error(error.response?.data?.message || 'Failed to save teacher');
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (teacher) => {
        setEditingTeacher(teacher);
        setFormData({
            name: teacher.name,
            position: teacher.position,
            department: teacher.department,
            email: teacher.email,
            phone: teacher.phone || '',
            qualification: teacher.qualification || '',
        });
        setImagePreview(teacher.image?.url || null);
        setIsDialogOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this teacher?')) {
            return;
        }

        try {
            await teachersAPI.delete(id);
            toast.success('Teacher deleted successfully!');
            await fetchTeachers();
        } catch (error) {
            console.error('Delete failed:', error);
            toast.error(error.response?.data?.message || 'Failed to delete teacher');
        }
    };

    const resetForm = () => {
        setFormData({ name: '', position: '', department: 'Management', email: '', phone: '', qualification: '' });
        setEditingTeacher(null);
        setSelectedFile(null);
        setImagePreview(null);
        setIsDialogOpen(false);
    };

    const filteredTeachers = teachers.filter((teacher) =>
        teacher.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.position?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        placeholder="Search teachers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700" onClick={() => resetForm()}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Teacher
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>{editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Photo Upload */}
                            <div className="flex justify-center">
                                <div 
                                    className="relative cursor-pointer group"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Avatar className="w-24 h-24 border-4 border-dashed border-gray-300 group-hover:border-green-500 transition-colors">
                                        {imagePreview ? (
                                            <AvatarImage src={imagePreview} />
                                        ) : (
                                            <AvatarFallback className="bg-gray-100">
                                                <Upload className="w-8 h-8 text-gray-400" />
                                            </AvatarFallback>
                                        )}
                                    </Avatar>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    <p className="text-xs text-gray-500 text-center mt-1">Click to upload photo</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="position">Position *</Label>
                                    <Input
                                        id="position"
                                        name="position"
                                        value={formData.position}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g., Math Teacher"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="department">Department</Label>
                                    <select
                                        id="department"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                                    >
                                        {departments.map((dept) => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="qualification">Qualification</Label>
                                    <Input
                                        id="qualification"
                                        name="qualification"
                                        value={formData.qualification}
                                        onChange={handleChange}
                                        placeholder="e.g., M.Sc. Physics"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={resetForm}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={saving}>
                                    {saving ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>{editingTeacher ? 'Update' : 'Add'} Teacher</>
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Table */}
            <Card className="border-0 shadow-md">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Teacher</TableHead>
                                <TableHead>Position</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredTeachers.map((teacher) => (
                                <TableRow key={teacher._id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-10 h-10">
                                                <AvatarImage src={teacher.image?.url} />
                                                <AvatarFallback className="bg-green-100 text-green-700">
                                                    {getInitials(teacher.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{teacher.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{teacher.position}</TableCell>
                                    <TableCell className="text-gray-500">{teacher.department}</TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <a href={`mailto:${teacher.email}`} className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600">
                                                <Mail className="w-3 h-3" /> {teacher.email}
                                            </a>
                                            {teacher.phone && (
                                                <a href={`tel:${teacher.phone}`} className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600">
                                                    <Phone className="w-3 h-3" /> {teacher.phone}
                                                </a>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="sm" onClick={() => handleEdit(teacher)}>
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(teacher._id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredTeachers.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                        No teachers found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default TeachersManager;
