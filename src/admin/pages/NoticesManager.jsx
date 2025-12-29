import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { formatDate } from '@/utils/helpers';

const NoticesManager = () => {
    const [notices, setNotices] = useState([
        { id: 1, title: 'Admission Open for 2081 BS', content: 'Applications are now being accepted...', date: '2024-12-25', type: 'Admission', active: true },
        { id: 2, title: 'Winter Break Notice', content: 'School will remain closed...', date: '2024-12-15', type: 'Holiday', active: true },
        { id: 3, title: 'Parent-Teacher Meeting', content: 'PTM scheduled for next week...', date: '2024-12-10', type: 'Meeting', active: false },
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingNotice, setEditingNotice] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        type: 'General',
        active: true,
    });

    const noticeTypes = ['General', 'Admission', 'Holiday', 'Meeting', 'Event', 'Exam'];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingNotice) {
            setNotices((prev) =>
                prev.map((n) =>
                    n.id === editingNotice.id
                        ? { ...n, ...formData, date: new Date().toISOString().split('T')[0] }
                        : n
                )
            );
        } else {
            const newNotice = {
                id: Date.now(),
                ...formData,
                date: new Date().toISOString().split('T')[0],
            };
            setNotices((prev) => [newNotice, ...prev]);
        }
        resetForm();
    };

    const handleEdit = (notice) => {
        setEditingNotice(notice);
        setFormData({
            title: notice.title,
            content: notice.content,
            type: notice.type,
            active: notice.active,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this notice?')) {
            setNotices((prev) => prev.filter((n) => n.id !== id));
        }
    };

    const resetForm = () => {
        setFormData({ title: '', content: '', type: 'General', active: true });
        setEditingNotice(null);
        setIsDialogOpen(false);
    };

    const filteredNotices = notices.filter((notice) =>
        notice.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        placeholder="Search notices..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700" onClick={() => resetForm()}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Notice
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>{editingNotice ? 'Edit Notice' : 'Add New Notice'}</DialogTitle>
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
                                    placeholder="Notice title"
                                />
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
                                    {noticeTypes.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="content">Content *</Label>
                                <Textarea
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    required
                                    placeholder="Notice content..."
                                    rows={4}
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
                                    {editingNotice ? 'Update' : 'Create'} Notice
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
                                <TableHead>Title</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredNotices.map((notice) => (
                                <TableRow key={notice.id}>
                                    <TableCell className="font-medium">{notice.title}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{notice.type}</Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-500">{formatDate(notice.date)}</TableCell>
                                    <TableCell>
                                        <Badge className={notice.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}>
                                            {notice.active ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="sm" onClick={() => handleEdit(notice)}>
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(notice.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredNotices.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                        No notices found.
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

export default NoticesManager;
