import { useState, useEffect, useRef } from 'react';
import { Plus, Pencil, Trash2, Search, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
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
import { formatDate, truncateText } from '@/utils/helpers';
import { BLOG_CATEGORIES } from '@/utils/constants';
import { blogAPI } from '@/api';
import { toast } from 'sonner';

const BlogManager = () => {
    const fileInputRef = useRef(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'News',
        youtubeUrl: '',
        status: 'published',
        featured: false,
    });

    const categories = BLOG_CATEGORIES.filter(c => c !== 'All');

    // Fetch blogs on mount
    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await blogAPI.getAll();
            if (response.data.data) {
                setBlogs(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch blogs:', error);
            toast.error('Failed to load blogs');
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

    const handleImageChange = (e) => {
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
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('content', formData.content || formData.excerpt);
            formDataToSend.append('excerpt', formData.excerpt);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('youtubeUrl', formData.youtubeUrl || '');
            formDataToSend.append('status', formData.status);
            formDataToSend.append('featured', formData.featured);

            if (selectedImage) {
                formDataToSend.append('image', selectedImage);
            }

            let response;
            if (editingBlog) {
                response = await blogAPI.update(editingBlog._id, formDataToSend);
                toast.success('Blog updated successfully!');
            } else {
                response = await blogAPI.create(formDataToSend);
                toast.success('Blog created successfully!');
            }

            // Refresh the list
            await fetchBlogs();
            resetForm();
        } catch (error) {
            console.error('Save failed:', error);
            toast.error(error.response?.data?.message || 'Failed to save blog');
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (blog) => {
        setEditingBlog(blog);
        setFormData({
            title: blog.title || '',
            excerpt: blog.excerpt || '',
            content: blog.content || '',
            category: blog.category || 'News',
            youtubeUrl: blog.youtubeUrl || '',
            status: blog.status || 'published',
            featured: blog.featured || false,
        });
        setImagePreview(blog.image?.url || null);
        setIsDialogOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this blog post?')) {
            return;
        }

        try {
            await blogAPI.delete(id);
            toast.success('Blog deleted successfully!');
            await fetchBlogs();
        } catch (error) {
            console.error('Delete failed:', error);
            toast.error(error.response?.data?.message || 'Failed to delete blog');
        }
    };

    const resetForm = () => {
        setFormData({ title: '', excerpt: '', content: '', category: 'News', youtubeUrl: '', status: 'published', featured: false });
        setEditingBlog(null);
        setSelectedImage(null);
        setImagePreview(null);
        setIsDialogOpen(false);
    };

    const filteredBlogs = blogs.filter((blog) =>
        blog.title?.toLowerCase().includes(searchQuery.toLowerCase())
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
                        placeholder="Search blog posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700" onClick={() => resetForm()}>
                            <Plus className="w-4 h-4 mr-2" />
                            New Post
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingBlog ? 'Edit Post' : 'Create New Post'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    placeholder="Blog post title"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                                    >
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="youtubeUrl">YouTube URL (optional)</Label>
                                <Input
                                    id="youtubeUrl"
                                    name="youtubeUrl"
                                    value={formData.youtubeUrl}
                                    onChange={handleChange}
                                    placeholder="https://youtube.com/watch?v=..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="excerpt">Excerpt *</Label>
                                <Textarea
                                    id="excerpt"
                                    name="excerpt"
                                    value={formData.excerpt}
                                    onChange={handleChange}
                                    required
                                    placeholder="Short description for preview..."
                                    rows={2}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="content">Content *</Label>
                                <Textarea
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    placeholder="Full blog content (supports HTML)..."
                                    rows={8}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Featured Image</Label>
                                <div 
                                    className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-green-400 transition-colors"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="max-h-32 mx-auto rounded" />
                                    ) : (
                                        <>
                                            <ImageIcon className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
                                        </>
                                    )}
                                    <input 
                                        ref={fileInputRef}
                                        type="file" 
                                        accept="image/*" 
                                        className="hidden" 
                                        onChange={handleImageChange}
                                    />
                                    <Button type="button" variant="outline" size="sm" className="mt-2">
                                        {imagePreview ? 'Change Image' : 'Choose File'}
                                    </Button>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    name="featured"
                                    checked={formData.featured}
                                    onChange={handleChange}
                                    className="rounded border-gray-300"
                                />
                                <Label htmlFor="featured">Featured Post</Label>
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
                                        <>{editingBlog ? 'Update' : 'Create'} Post</>
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
                                <TableHead className="w-16">Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredBlogs.map((blog) => (
                                <TableRow key={blog._id}>
                                    <TableCell>
                                        {blog.image?.url ? (
                                            <img src={blog.image.url} alt="" className="w-12 h-12 rounded object-cover" />
                                        ) : (
                                            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                                                <ImageIcon className="w-6 h-6 text-gray-400" />
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <p className="font-medium">{blog.title}</p>
                                        <p className="text-sm text-gray-500">{truncateText(blog.excerpt, 50)}</p>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{blog.category}</Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-500">{formatDate(blog.createdAt)}</TableCell>
                                    <TableCell>
                                        <Badge className={blog.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                                            {blog.status === 'published' ? 'Published' : 'Draft'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="sm" onClick={() => handleEdit(blog)}>
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(blog._id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredBlogs.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                        No blog posts found.
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

export default BlogManager;
