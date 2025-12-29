import { useState, useEffect } from 'react';
import { Plus, GripVertical, Trash2, ChevronDown, ChevronRight, ExternalLink, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { pagesAPI, navigationAPI } from '@/api';
import { toast } from 'sonner';

// Simple UUID generator fallback
const generateId = () => {
    return 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now().toString(36);
};

const MenuManager = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [parentId, setParentId] = useState(null); // For adding submenu items
    const [formData, setFormData] = useState({
        type: 'page',
        label: '',
        url: '',
        pageId: '',
    });
    const [expandedItems, setExpandedItems] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [navResponse, pagesResponse] = await Promise.all([
                navigationAPI.get(),
                pagesAPI.getAll()
            ]);

            if (navResponse.data.data?.items) {
                setMenuItems(navResponse.data.data.items);
            }
            if (pagesResponse.data.data) {
                setPages(pagesResponse.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
            toast.error('Failed to load menu data');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await navigationAPI.update({ items: menuItems });
            toast.success('Menu saved successfully!');
        } catch (error) {
            console.error('Save failed:', error);
            toast.error('Failed to save menu');
        } finally {
            setSaving(false);
        }
    };

    const handleAddItem = (e) => {
        e.preventDefault();

        const newItem = {
            id: generateId(),
            label: formData.label,
            type: formData.type,
            url: formData.type === 'link' ? formData.url : undefined,
            pageId: formData.type === 'page' ? formData.pageId : undefined,
            children: []
        };

        if (parentId) {
            // Add as submenu
            setMenuItems(addChildToItem(menuItems, parentId, newItem));
        } else {
            // Add to root
            setMenuItems([...menuItems, newItem]);
        }

        resetForm();
    };

    const addChildToItem = (items, targetId, newChild) => {
        return items.map(item => {
            if (item.id === targetId) {
                return { ...item, children: [...(item.children || []), newChild] };
            }
            if (item.children && item.children.length > 0) {
                return { ...item, children: addChildToItem(item.children, targetId, newChild) };
            }
            return item;
        });
    };

    const handleDeleteItem = (itemId) => {
        if (!window.confirm('Are you sure you want to remove this menu item?')) {
            return;
        }
        setMenuItems(removeItem(menuItems, itemId));
    };

    const removeItem = (items, targetId) => {
        return items
            .filter(item => item.id !== targetId)
            .map(item => ({
                ...item,
                children: item.children ? removeItem(item.children, targetId) : []
            }));
    };

    const moveItem = (items, itemId, direction) => {
        const findAndMove = (arr) => {
            const idx = arr.findIndex(item => item.id === itemId);
            if (idx !== -1) {
                const newIdx = direction === 'up' ? idx - 1 : idx + 1;
                if (newIdx >= 0 && newIdx < arr.length) {
                    const newArr = [...arr];
                    [newArr[idx], newArr[newIdx]] = [newArr[newIdx], newArr[idx]];
                    return newArr;
                }
                return arr;
            }
            return arr.map(item => ({
                ...item,
                children: item.children ? findAndMove(item.children) : []
            }));
        };
        return findAndMove(items);
    };

    const handleMoveUp = (itemId) => {
        setMenuItems(moveItem(menuItems, itemId, 'up'));
    };

    const handleMoveDown = (itemId) => {
        setMenuItems(moveItem(menuItems, itemId, 'down'));
    };

    const toggleExpand = (itemId) => {
        setExpandedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
    };

    const resetForm = () => {
        setFormData({ type: 'page', label: '', url: '', pageId: '' });
        setParentId(null);
        setIsDialogOpen(false);
    };

    const openAddDialog = (forParentId = null) => {
        setFormData({ type: 'page', label: '', url: '', pageId: '' });
        setParentId(forParentId); // Set AFTER resetting form data
        setIsDialogOpen(true);
    };

    const renderMenuItem = (item, depth = 0) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedItems[item.id];
        const page = item.type === 'page' ? pages.find(p => p._id === item.pageId) : null;

        return (
            <div key={item.id} className="border-b border-gray-100 last:border-0">
                <div
                    className="flex items-center gap-2 py-3 px-4 hover:bg-gray-50"
                    style={{ paddingLeft: `${depth * 24 + 16}px` }}
                >
                    <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />

                    {hasChildren ? (
                        <button onClick={() => toggleExpand(item.id)} className="p-1">
                            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                    ) : (
                        <div className="w-6" />
                    )}

                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            {item.type === 'link' ? (
                                <ExternalLink className="w-4 h-4 text-blue-500" />
                            ) : (
                                <FileText className="w-4 h-4 text-green-500" />
                            )}
                            <span className="font-medium">{item.label}</span>
                            {item.type === 'link' && (
                                <span className="text-xs text-gray-400">{item.url}</span>
                            )}
                            {page && (
                                <span className="text-xs text-gray-400">/pages/{page.slug}</span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" onClick={() => handleMoveUp(item.id)}>↑</Button>
                        <Button variant="ghost" size="sm" onClick={() => handleMoveDown(item.id)}>↓</Button>
                        <Button variant="ghost" size="sm" onClick={() => openAddDialog(item.id)}>
                            <Plus className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDeleteItem(item.id)}>
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {hasChildren && isExpanded && (
                    <div>
                        {item.children.map(child => renderMenuItem(child, depth + 1))}
                    </div>
                )}
            </div>
        );
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
                    <h2 className="text-xl font-semibold">Menu Manager</h2>
                    <p className="text-gray-500 text-sm">Organize your website navigation. Changes are saved when you click "Save Menu".</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => openAddDialog()}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Menu Item
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700" onClick={handleSave} disabled={saving}>
                        {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                        Save Menu
                    </Button>
                </div>
            </div>

            {/* Menu Tree */}
            <Card className="border-0 shadow-md">
                <CardHeader className="border-b">
                    <CardTitle className="text-base">Navigation Structure</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {menuItems.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            No menu items yet. Click "Add Menu Item" to start building your navigation.
                        </div>
                    ) : (
                        <div>
                            {menuItems.map(item => renderMenuItem(item))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Add Item Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {parentId ? 'Add Submenu Item' : 'Add Menu Item'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddItem} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Item Type</Label>
                            <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="page">Link to Page</SelectItem>
                                    <SelectItem value="link">External/Custom Link</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="label">Menu Label *</Label>
                            <Input
                                id="label"
                                value={formData.label}
                                onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
                                required
                                placeholder="e.g., About Us"
                            />
                        </div>

                        {formData.type === 'page' && (
                            <div className="space-y-2">
                                <Label>Select Page *</Label>
                                <Select value={formData.pageId} onValueChange={(value) => setFormData(prev => ({ ...prev, pageId: value }))}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose a page..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {pages.map(page => (
                                            <SelectItem key={page._id} value={page._id}>{page.title}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {formData.type === 'link' && (
                            <div className="space-y-2">
                                <Label htmlFor="url">URL *</Label>
                                <Input
                                    id="url"
                                    value={formData.url}
                                    onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                                    required
                                    placeholder="https://example.com or /about"
                                />
                            </div>
                        )}

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                            <Button type="submit" className="bg-green-600 hover:bg-green-700">Add Item</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MenuManager;
