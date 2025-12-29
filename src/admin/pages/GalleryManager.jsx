import { useState } from 'react';
import { Plus, Trash2, Search, Image as ImageIcon, Video, Upload } from 'lucide-react';
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
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog';
import { GALLERY_CATEGORIES } from '@/utils/constants';

const GalleryManager = () => {
    const [items, setItems] = useState([
        { id: 1, type: 'image', title: 'Campus View', category: 'Academics', url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300' },
        { id: 2, type: 'image', title: 'Sports Day', category: 'Sports', url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300' },
        { id: 3, type: 'video', title: 'Annual Day', category: 'Events', url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300', youtubeId: 'dQw4w9WgXcQ' },
        { id: 4, type: 'image', title: 'Science Lab', category: 'Academics', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300' },
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Events',
        type: 'image',
        youtubeUrl: '',
    });

    const categories = GALLERY_CATEGORIES;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            id: Date.now(),
            ...formData,
            url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300',
        };
        setItems((prev) => [newItem, ...prev]);
        resetForm();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            setItems((prev) => prev.filter((item) => item.id !== id));
        }
    };

    const resetForm = () => {
        setFormData({ title: '', category: 'Events', type: 'image', youtubeUrl: '' });
        setIsDialogOpen(false);
    };

    const filteredItems = items.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            placeholder="Search gallery..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700" onClick={() => resetForm()}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Item
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Add Gallery Item</DialogTitle>
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
                                    placeholder="Item title"
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
                                        {categories.filter(c => c !== 'All').map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="type">Type</Label>
                                    <select
                                        id="type"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                                    >
                                        <option value="image">Image</option>
                                        <option value="video">Video (YouTube)</option>
                                    </select>
                                </div>
                            </div>
                            {formData.type === 'video' && (
                                <div className="space-y-2">
                                    <Label htmlFor="youtubeUrl">YouTube URL *</Label>
                                    <Input
                                        id="youtubeUrl"
                                        name="youtubeUrl"
                                        value={formData.youtubeUrl}
                                        onChange={handleChange}
                                        placeholder="https://youtube.com/watch?v=..."
                                        required={formData.type === 'video'}
                                    />
                                </div>
                            )}
                            {formData.type === 'image' && (
                                <div className="space-y-2">
                                    <Label>Upload Image</Label>
                                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                                        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
                                        <Input type="file" accept="image/*" className="hidden" id="gallery-upload" />
                                        <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => document.getElementById('gallery-upload')?.click()}>
                                            Choose File
                                        </Button>
                                    </div>
                                </div>
                            )}
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={resetForm}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                                    Add Item
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden border-0 shadow-md group">
                        <div className="relative aspect-square">
                            <img
                                src={item.url}
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />
                            {item.type === 'video' && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                    <Video className="w-10 h-10 text-white" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <CardContent className="p-3">
                            <p className="font-medium text-sm truncate">{item.title}</p>
                            <Badge variant="secondary" className="text-xs mt-1">{item.category}</Badge>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredItems.length === 0 && (
                <div className="text-center py-12">
                    <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No gallery items found.</p>
                </div>
            )}
        </div>
    );
};

export default GalleryManager;
