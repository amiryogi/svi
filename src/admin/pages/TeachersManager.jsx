import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, Mail, Phone } from 'lucide-react';
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

const TeachersManager = () => {
    const [teachers, setTeachers] = useState([
        { id: 1, name: 'Ram Prasad Sharma', position: 'Principal', department: 'Management', email: 'principal@school.edu.np', phone: '+977-1-1234567', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100' },
        { id: 2, name: 'Sita Devi Poudel', position: 'Vice Principal', department: 'Languages', email: 'vp@school.edu.np', phone: '', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100' },
        { id: 3, name: 'Krishna Adhikari', position: 'Science Teacher', department: 'Science', email: 'krishna@school.edu.np', phone: '', image: null },
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        department: 'Management',
        email: '',
        phone: '',
        qualification: '',
    });

    const departments = ['Management', 'Science', 'Mathematics', 'Languages', 'Primary', 'Kindergarten', 'Administration'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingTeacher) {
            setTeachers((prev) =>
                prev.map((t) =>
                    t.id === editingTeacher.id ? { ...t, ...formData } : t
                )
            );
        } else {
            const newTeacher = {
                id: Date.now(),
                ...formData,
                image: null,
            };
            setTeachers((prev) => [newTeacher, ...prev]);
        }
        resetForm();
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
        setIsDialogOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this teacher?')) {
            setTeachers((prev) => prev.filter((t) => t.id !== id));
        }
    };

    const resetForm = () => {
        setFormData({ name: '', position: '', department: 'Management', email: '', phone: '', qualification: '' });
        setEditingTeacher(null);
        setIsDialogOpen(false);
    };

    const filteredTeachers = teachers.filter((teacher) =>
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.position.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                            <div className="space-y-2">
                                <Label>Photo</Label>
                                <Input type="file" accept="image/*" />
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={resetForm}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                                    {editingTeacher ? 'Update' : 'Add'} Teacher
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
                                <TableRow key={teacher.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-10 h-10">
                                                <AvatarImage src={teacher.image} />
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
                                            <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(teacher.id)}>
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
