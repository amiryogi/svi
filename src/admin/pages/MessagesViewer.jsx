import { useState } from 'react';
import { Search, Eye, Mail, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
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

const MessagesViewer = () => {
    const [messages, setMessages] = useState([
        { id: 1, name: 'Hari Sharma', email: 'hari@email.com', phone: '+977-9801234567', subject: 'About admission process', message: 'I would like to know more about the admission process for Grade 5. What documents are required?', date: '2024-12-28', read: false },
        { id: 2, name: 'Former Alumni', email: 'alumni@email.com', phone: '', subject: 'Request for recommendation', message: 'I am a former student (Batch 2015) and need a recommendation letter for my further studies.', date: '2024-12-27', read: false },
        { id: 3, name: 'ABC Sports Equipment', email: 'vendor@sports.com', phone: '+977-1-5555555', subject: 'Sports equipment quote', message: 'We are pleased to offer our latest sports equipment for your school. Please find attached our catalog.', date: '2024-12-26', read: true },
        { id: 4, name: 'Parent Concern', email: 'parent@email.com', phone: '+977-9807654321', subject: 'School bus timing', message: 'I would like to discuss the school bus timing for my child. The current schedule is not convenient.', date: '2024-12-25', read: true },
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [filter, setFilter] = useState('All');

    const handleMarkRead = (id) => {
        setMessages((prev) =>
            prev.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
        );
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            setMessages((prev) => prev.filter((msg) => msg.id !== id));
            setSelectedMessage(null);
        }
    };

    const handleViewMessage = (message) => {
        setSelectedMessage(message);
        if (!message.read) {
            handleMarkRead(message.id);
        }
    };

    const filteredMessages = messages.filter((msg) => {
        const matchesSearch = msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            msg.subject.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'All' ||
            (filter === 'Unread' && !msg.read) ||
            (filter === 'Read' && msg.read);
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        placeholder="Search messages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex gap-2">
                    {['All', 'Unread', 'Read'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === f
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <Card className="border-0 shadow-sm">
                    <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-green-600">{messages.filter(m => !m.read).length}</p>
                        <p className="text-sm text-gray-500">Unread</p>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                    <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-blue-600">{messages.filter(m => m.read).length}</p>
                        <p className="text-sm text-gray-500">Read</p>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                    <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-gray-600">{messages.length}</p>
                        <p className="text-sm text-gray-500">Total</p>
                    </CardContent>
                </Card>
            </div>

            {/* Table */}
            <Card className="border-0 shadow-md">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-8"></TableHead>
                                <TableHead>From</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredMessages.map((message) => (
                                <TableRow key={message.id} className={!message.read ? 'bg-green-50/50' : ''}>
                                    <TableCell>
                                        {!message.read && <span className="w-2 h-2 bg-green-500 rounded-full block"></span>}
                                    </TableCell>
                                    <TableCell>
                                        <p className={`${!message.read ? 'font-semibold' : 'font-medium'}`}>{message.name}</p>
                                        <p className="text-sm text-gray-500">{message.email}</p>
                                    </TableCell>
                                    <TableCell>
                                        <p className={`${!message.read ? 'font-semibold' : ''}`}>{message.subject}</p>
                                        <p className="text-sm text-gray-500">{truncateText(message.message, 50)}</p>
                                    </TableCell>
                                    <TableCell className="text-gray-500">{formatDate(message.date)}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="sm" onClick={() => handleViewMessage(message)}>
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            {!message.read && (
                                                <Button variant="ghost" size="sm" onClick={() => handleMarkRead(message.id)}>
                                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                                </Button>
                                            )}
                                            <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(message.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredMessages.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                        No messages found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Detail Dialog */}
            <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Message Details</DialogTitle>
                    </DialogHeader>
                    {selectedMessage && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">From</p>
                                    <p className="font-medium">{selectedMessage.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Date</p>
                                    <p className="font-medium">{formatDate(selectedMessage.date)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <a href={`mailto:${selectedMessage.email}`} className="font-medium text-green-600 hover:underline">
                                        {selectedMessage.email}
                                    </a>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    {selectedMessage.phone ? (
                                        <a href={`tel:${selectedMessage.phone}`} className="font-medium text-green-600 hover:underline">
                                            {selectedMessage.phone}
                                        </a>
                                    ) : (
                                        <p className="text-gray-400">Not provided</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Subject</p>
                                <p className="font-medium">{selectedMessage.subject}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Message</p>
                                <p className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">{selectedMessage.message}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button asChild className="flex-1 bg-green-600 hover:bg-green-700">
                                    <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}>
                                        <Mail className="w-4 h-4 mr-2" />
                                        Reply via Email
                                    </a>
                                </Button>
                                <Button variant="outline" onClick={() => handleDelete(selectedMessage.id)} className="text-red-600">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MessagesViewer;
