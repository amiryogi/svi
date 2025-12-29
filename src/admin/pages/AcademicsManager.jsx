import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { academicsAPI } from '@/api';
import { toast } from 'sonner';

const AcademicsManager = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProgram, setEditingProgram] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        subtitle: '',
        description: '',
        subjects: '',
        timing: '',
        classSize: '',
        active: true,
    });
    const [expandedId, setExpandedId] = useState(null);

    // Fetch programs on mount
    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
            setLoading(true);
            const response = await academicsAPI.getAll();
            if (response.data.data) {
                setPrograms(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch programs:', error);
            toast.error('Failed to load programs');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const subjectsArray = formData.subjects.split(',').map(s => s.trim()).filter(Boolean);

            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('subtitle', formData.subtitle || '');
            formDataToSend.append('description', formData.description || '');
            formDataToSend.append('subjects', JSON.stringify(subjectsArray));
            formDataToSend.append('timing', formData.timing || '');
            formDataToSend.append('classSize', formData.classSize || '');
            formDataToSend.append('active', formData.active);

            if (editingProgram) {
                await academicsAPI.update(editingProgram._id, formDataToSend);
                toast.success('Program updated successfully!');
            } else {
                await academicsAPI.create(formDataToSend);
                toast.success('Program created successfully!');
            }

            await fetchPrograms();
            resetForm();
        } catch (error) {
            console.error('Save failed:', error);
            toast.error(error.response?.data?.message || 'Failed to save program');
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (program) => {
        setEditingProgram(program);
        setFormData({
            name: program.name,
            subtitle: program.subtitle || '',
            description: program.description || '',
            subjects: Array.isArray(program.subjects) ? program.subjects.join(', ') : '',
            timing: program.timing || '',
            classSize: program.classSize || '',
            active: program.active !== false,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this program?')) {
            return;
        }

        try {
            await academicsAPI.delete(id);
            toast.success('Program deleted successfully!');
            await fetchPrograms();
        } catch (error) {
            console.error('Delete failed:', error);
            toast.error('Failed to delete program');
        }
    };

    const resetForm = () => {
        setFormData({ name: '', subtitle: '', description: '', subjects: '', timing: '', classSize: '', active: true });
        setEditingProgram(null);
        setIsDialogOpen(false);
    };

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
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-semibold">Academic Programs</h2>
                    <p className="text-gray-500 text-sm">Manage your school's academic levels and curriculum</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <Button className="bg-green-600 hover:bg-green-700" onClick={() => { resetForm(); setIsDialogOpen(true); }}>
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
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="timing">School Hours</Label>
                                    <Input
                                        id="timing"
                                        name="timing"
                                        value={formData.timing}
                                        onChange={handleChange}
                                        placeholder="e.g., 9:30 AM - 3:30 PM"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="classSize">Class Size</Label>
                                    <Input
                                        id="classSize"
                                        name="classSize"
                                        value={formData.classSize}
                                        onChange={handleChange}
                                        placeholder="e.g., 25-30 students"
                                    />
                                </div>
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
                                <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={saving}>
                                    {saving ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>{editingProgram ? 'Update' : 'Create'} Program</>
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Programs List */}
            <div className="space-y-4">
                {programs.length === 0 ? (
                    <Card className="border-0 shadow-md">
                        <CardContent className="p-8 text-center text-gray-500">
                            No programs found. Click "Add Program" to create one.
                        </CardContent>
                    </Card>
                ) : (
                    programs.map((program) => (
                        <Card key={program._id} className="border-0 shadow-md">
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setExpandedId(expandedId === program._id ? null : program._id)}
                                            className="p-1 hover:bg-gray-100 rounded"
                                        >
                                            {expandedId === program._id ? (
                                                <ChevronUp className="w-5 h-5 text-gray-400" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-gray-400" />
                                            )}
                                        </button>
                                        <div>
                                            <CardTitle className="text-lg flex items-center gap-2">
                                                {program.name}
                                                <Badge className={program.active !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}>
                                                    {program.active !== false ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </CardTitle>
                                            <p className="text-sm text-gray-500">{program.subtitle}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="sm" onClick={() => handleEdit(program)}>
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(program._id)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            {expandedId === program._id && (
                                <CardContent className="pt-0">
                                    <p className="text-gray-600 mb-3">{program.description}</p>
                                    {program.timing && (
                                        <p className="text-sm text-gray-500 mb-1"><strong>Hours:</strong> {program.timing}</p>
                                    )}
                                    {program.classSize && (
                                        <p className="text-sm text-gray-500 mb-3"><strong>Class Size:</strong> {program.classSize}</p>
                                    )}
                                    {program.subjects && program.subjects.length > 0 && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 mb-2">Subjects:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {program.subjects.map((subject, idx) => (
                                                    <Badge key={idx} variant="secondary">{subject}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            )}
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default AcademicsManager;
