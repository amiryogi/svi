import { useState } from 'react';
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const AcademicsManager = () => {
    const [programs, setPrograms] = useState([
        { id: 1, name: 'Kindergarten', subtitle: 'Pre-School to UKG', description: 'Play-based learning for early childhood', subjects: ['English', 'Nepali', 'Math', 'Art'], active: true },
        { id: 2, name: 'Primary Level', subtitle: 'Grade 1-5', description: 'Building strong academic foundations', subjects: ['English', 'Nepali', 'Math', 'Science', 'Social Studies'], active: true },
        { id: 3, name: 'Middle School', subtitle: 'Grade 6-8', description: 'Transitioning to advanced concepts', subjects: ['English', 'Nepali', 'Math', 'Science', 'Social Studies', 'Computer'], active: true },
        { id: 4, name: 'Secondary Level', subtitle: 'Grade 9-10', description: 'SEE exam preparation', subjects: ['English', 'Nepali', 'Math', 'Science', 'Social Studies', 'Opt. Math', 'Computer'], active: true },
        { id: 5, name: 'NEB +2 Science', subtitle: 'Grade 11-12', description: 'Science stream with Physics, Chemistry, Biology/Math', subjects: ['Physics', 'Chemistry', 'Math/Biology', 'English', 'Nepali'], active: true },
        { id: 6, name: 'NEB +2 Management', subtitle: 'Grade 11-12', description: 'Management stream with Business Studies', subjects: ['Account', 'Economics', 'Business Studies', 'English', 'Nepali'], active: true },
    ]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProgram, setEditingProgram] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        subtitle: '',
        description: '',
        subjects: '',
        active: true,
    });
    const [expandedId, setExpandedId] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const subjectsArray = formData.subjects.split(',').map(s => s.trim()).filter(Boolean);

        if (editingProgram) {
            setPrograms((prev) =>
                prev.map((p) =>
                    p.id === editingProgram.id ? { ...p, ...formData, subjects: subjectsArray } : p
                )
            );
        } else {
            const newProgram = {
                id: Date.now(),
                ...formData,
                subjects: subjectsArray,
            };
            setPrograms((prev) => [...prev, newProgram]);
        }
        resetForm();
    };

    const handleEdit = (program) => {
        setEditingProgram(program);
        setFormData({
            name: program.name,
            subtitle: program.subtitle,
            description: program.description,
            subjects: program.subjects.join(', '),
            active: program.active,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this program?')) {
            setPrograms((prev) => prev.filter((p) => p.id !== id));
        }
    };

    const resetForm = () => {
        setFormData({ name: '', subtitle: '', description: '', subjects: '', active: true });
        setEditingProgram(null);
        setIsDialogOpen(false);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-semibold">Academic Programs</h2>
                    <p className="text-gray-500 text-sm">Manage your school's academic levels and curriculum</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <Button className="bg-green-600 hover:bg-green-700" onClick={() => resetForm()}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Program
                    </Button>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>{editingProgram ? 'Edit Program' : 'Add New Program'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Program Name *</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g., Primary Level"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subtitle">Subtitle</Label>
                                    <Input
                                        id="subtitle"
                                        name="subtitle"
                                        value={formData.subtitle}
                                        onChange={handleChange}
                                        placeholder="e.g., Grade 1-5"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Brief description of this academic level..."
                                    rows={3}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subjects">Subjects (comma-separated)</Label>
                                <Textarea
                                    id="subjects"
                                    name="subjects"
                                    value={formData.subjects}
                                    onChange={handleChange}
                                    placeholder="English, Nepali, Mathematics, Science..."
                                    rows={2}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="active"
                                    name="active"
                                    checked={formData.active}
                                    onChange={handleChange}
                                    className="rounded border-gray-300"
                                />
                                <Label htmlFor="active">Active (visible on website)</Label>
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={resetForm}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                                    {editingProgram ? 'Update' : 'Create'} Program
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Programs List */}
            <div className="space-y-4">
                {programs.map((program) => (
                    <Card key={program.id} className="border-0 shadow-md">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setExpandedId(expandedId === program.id ? null : program.id)}
                                        className="p-1 hover:bg-gray-100 rounded"
                                    >
                                        {expandedId === program.id ? (
                                            <ChevronUp className="w-5 h-5 text-gray-400" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-400" />
                                        )}
                                    </button>
                                    <div>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            {program.name}
                                            <Badge className={program.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}>
                                                {program.active ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </CardTitle>
                                        <p className="text-sm text-gray-500">{program.subtitle}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => handleEdit(program)}>
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(program.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        {expandedId === program.id && (
                            <CardContent className="pt-0">
                                <p className="text-gray-600 mb-3">{program.description}</p>
                                <div>
                                    <p className="text-sm font-medium text-gray-700 mb-2">Subjects:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {program.subjects.map((subject, idx) => (
                                            <Badge key={idx} variant="secondary">{subject}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AcademicsManager;
