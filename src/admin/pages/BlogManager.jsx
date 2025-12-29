import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
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

const BlogManager = () => {
    const [blogs, setBlogs] = useState([
        { id: 1, title: 'Annual Sports Day 2024', excerpt: 'Students participated in various events...', category: 'Events', date: '2024-12-20', published: true, image: 'https://images.unsplash.com/photo-1461896836934- voices-13a7-7c2a?w=100' },
        { id: 2, title: 'SEE Results - 95% Pass', excerpt: 'Outstanding results achieved...', category: 'Achievements', date: '2024-12-15', published: true, image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100' },
        { id: 3, title: 'Science Exhibition', excerpt: 'Young scientists displayed projects...', category: 'Academic', date: '2024-12-10', published: false, image: null },
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'News',
        youtubeUrl: '',
        published: true,
    });

    const categories = BLOG_CATEGORIES.filter(c => c !== 'All');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingBlog) {
            setBlogs((prev) =>
                prev.map((b) =>
                    b.id === editingBlog.id
                        ? { ...b, ...formData, date: new Date().toISOString().split('T')[0] }
                        : b
                )
            );
        } else {
            const newBlog = {
                id: Date.now(),
                ...formData,
                date: new Date().toISOString().split('T')[0],
                image: null,
            };
            setBlogs((prev) => [newBlog, ...prev]);
        }
        resetForm();
    };

    const handleEdit = (blog) => {
        setEditingBlog(blog);
        setFormData({
            title: blog.title,
            excerpt: blog.excerpt,
            content: blog.content || '',
            category: blog.category,
            youtubeUrl: blog.youtubeUrl || '',
            published: blog.published,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            setBlogs((prev) => prev.filter((b) => b.id !== id));
        }
    };

    const resetForm = () => {
        setFormData({ title: '', excerpt: '', content: '', category: 'News', youtubeUrl: '', published: true });
        setEditingBlog(null);
        setIsDialogOpen(false);
    };

    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                                    <Label htmlFor="youtubeUrl">YouTube URL (optional)</Label>
                                    <Input
                                        id="youtubeUrl"
                                        name="youtubeUrl"
                                        value={formData.youtubeUrl}
                                        onChange={handleChange}
                                        placeholder="https://youtube.com/watch?v=..."
                                    />
                                </div>
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
                                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                                    <ImageIcon className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
                                    <Input type="file" accept="image/*" className="hidden" id="image-upload" />
                                    <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => document.getElementById('image-upload')?.click()}>
                                        Choose File
                                    </Button>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="published"
                                    name="published"
                                    checked={formData.published}
                                    onChange={handleChange}
                                    className="rounded border-gray-300"
                                />
                                <Label htmlFor="published">Published</Label>
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={resetForm}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                                    {editingBlog ? 'Update' : 'Create'} Post
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
                                <TableRow key={blog.id}>
                                    <TableCell>
                                        {blog.image ? (
                                            <img src={blog.image} alt="" className="w-12 h-12 rounded object-cover" />
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
                                    <TableCell className="text-gray-500">{formatDate(blog.date)}</TableCell>
                                    <TableCell>
                                        <Badge className={blog.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                                            {blog.published ? 'Published' : 'Draft'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="sm" onClick={() => handleEdit(blog)}>
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(blog.id)}>
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
