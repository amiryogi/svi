import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Plus, Pencil, Trash2, Eye, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/utils/helpers';
import { pagesAPI, uploadAPI } from '@/api';
import { toast } from 'sonner';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const PageManager = () => {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPage, setEditingPage] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        metaDescription: '',
        isActive: true,
    });
    const quillRef = useRef(null);

    // Custom image upload handler
    const imageHandler = useCallback(() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.click();

        input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image must be less than 5MB');
                return;
            }

            try {
                toast.loading('Uploading image...');
                
                const formData = new FormData();
                formData.append('image', file);
                
                const response = await uploadAPI.image(formData);
                
                toast.dismiss();
                
                if (response.data.success) {
                    const imageUrl = response.data.data.url;
                    const quill = quillRef.current?.getEditor();
                    if (quill) {
                        const range = quill.getSelection(true);
                        quill.insertEmbed(range.index, 'image', imageUrl);
                        quill.setSelection(range.index + 1);
                    }
                    toast.success('Image uploaded!');
                }
            } catch (error) {
                toast.dismiss();
                console.error('Image upload failed:', error);
                toast.error('Failed to upload image');
            }
        };
    }, []);

    // Quill editor modules with custom image handler
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'align': [] }],
                ['link', 'image'],
                ['blockquote', 'code-block'],
                [{ 'color': [] }, { 'background': [] }],
                ['clean']
            ],
            handlers: {
                image: imageHandler
            }
        },
    }), [imageHandler]);

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        try {
            setLoading(true);
            const response = await pagesAPI.getAll();
            if (response.data.data) {
                setPages(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch pages:', error);
            toast.error('Failed to load pages');
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

    const handleContentChange = (content) => {
        setFormData((prev) => ({ ...prev, content }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            if (editingPage) {
                await pagesAPI.update(editingPage._id, formData);
                toast.success('Page updated successfully!');
            } else {
                await pagesAPI.create(formData);
                toast.success('Page created successfully!');
            }

            await fetchPages();
            resetForm();
        } catch (error) {
            console.error('Save failed:', error);
            toast.error(error.response?.data?.message || 'Failed to save page');
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (page) => {
        setEditingPage(page);
        setFormData({
            title: page.title,
            content: page.content,
            metaDescription: page.metaDescription || '',
            isActive: page.isActive !== false,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this page?')) {
            return;
        }

        try {
            await pagesAPI.delete(id);
            toast.success('Page deleted successfully!');
            await fetchPages();
        } catch (error) {
            console.error('Delete failed:', error);
            toast.error('Failed to delete page');
        }
    };

    const resetForm = () => {
        setFormData({ title: '', content: '', metaDescription: '', isActive: true });
        setEditingPage(null);
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
                    <h2 className="text-xl font-semibold">Page Manager</h2>
                    <p className="text-gray-500 text-sm">Create and manage dynamic pages for your website</p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700" onClick={() => { resetForm(); setIsDialogOpen(true); }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Page
                </Button>
            </div>

            {/* Pages Table */}
            <Card className="border-0 shadow-md">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Last Updated</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pages.map((page) => (
                                <TableRow key={page._id}>
                                    <TableCell className="font-medium">{page.title}</TableCell>
                                    <TableCell className="text-gray-500">/pages/{page.slug}</TableCell>
                                    <TableCell>
                                        <Badge className={page.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}>
                                            {page.isActive ? 'Active' : 'Draft'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-500">{formatDate(page.updatedAt)}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="sm" asChild>
                                                <a href={`/pages/${page.slug}`} target="_blank" rel="noopener noreferrer">
                                                    <Eye className="w-4 h-4" />
                                                </a>
                                            </Button>
                                            <Button variant="ghost" size="sm" onClick={() => handleEdit(page)}>
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(page._id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {pages.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                        No pages created yet. Click "Create Page" to get started.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Create/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingPage ? 'Edit Page' : 'Create New Page'}</DialogTitle>
                        <DialogDescription>
                            Fill in the details below. Images are automatically uploaded to cloud storage.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Page Title *</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., About Our School"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="metaDescription">Meta Description (SEO)</Label>
                                <Input
                                    id="metaDescription"
                                    name="metaDescription"
                                    value={formData.metaDescription}
                                    onChange={handleChange}
                                    placeholder="Brief description for search engines..."
                                    maxLength={160}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Page Content *</Label>
                            <div className="border rounded-lg overflow-hidden">
                                <ReactQuill
                                    ref={quillRef}
                                    theme="snow"
                                    value={formData.content}
                                    onChange={handleContentChange}
                                    modules={modules}
                                    className="min-h-[300px]"
                                    placeholder="Write your page content here..."
                                />
                            </div>
                            <p className="text-xs text-gray-500">
                                Tip: Click the image icon to upload images to cloud storage.
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="isActive"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleChange}
                                className="rounded border-gray-300"
                            />
                            <Label htmlFor="isActive">Publish (visible on website)</Label>
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
                                    <>{editingPage ? 'Update' : 'Create'} Page</>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PageManager;
