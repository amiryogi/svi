import { useState } from 'react';
import { Search, Eye, CheckCircle, Clock, Trash2 } from 'lucide-react';
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
import { formatDate } from '@/utils/helpers';

const InquiriesViewer = () => {
    const [inquiries, setInquiries] = useState([
        { id: 1, studentName: 'Ramesh Sharma', parentName: 'Hari Sharma', email: 'hari@email.com', phone: '+977-9801234567', grade: 'Grade 5', message: 'Interested in admission for my son.', date: '2024-12-28', status: 'New' },
        { id: 2, studentName: 'Sita Poudel', parentName: 'Ram Poudel', email: 'ram@email.com', phone: '+977-9802345678', grade: '+2 Science', message: 'Looking for +2 admission after SEE.', date: '2024-12-27', status: 'Contacted' },
        { id: 3, studentName: 'Krishna Thapa', parentName: 'Shiva Thapa', email: 'shiva@email.com', phone: '+977-9803456789', grade: 'Grade 1', message: 'Want to enroll my child for Grade 1.', date: '2024-12-26', status: 'New' },
        { id: 4, studentName: 'Gita Maharjan', parentName: 'Laxmi Maharjan', email: 'laxmi@email.com', phone: '+977-9804567890', grade: 'UKG', message: 'Requesting information about kindergarten program.', date: '2024-12-25', status: 'Pending' },
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [statusFilter, setStatusFilter] = useState('All');

    const statuses = ['All', 'New', 'Contacted', 'Pending', 'Closed'];

    const handleStatusChange = (id, newStatus) => {
        setInquiries((prev) =>
            prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
        );
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this inquiry?')) {
            setInquiries((prev) => prev.filter((inq) => inq.id !== id));
            setSelectedInquiry(null);
        }
    };

    const filteredInquiries = inquiries.filter((inq) => {
        const matchesSearch = inq.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            inq.parentName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'New': return 'bg-green-100 text-green-700';
            case 'Contacted': return 'bg-blue-100 text-blue-700';
            case 'Pending': return 'bg-yellow-100 text-yellow-700';
            case 'Closed': return 'bg-gray-100 text-gray-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        placeholder="Search inquiries..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex gap-2">
                    {statuses.map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${statusFilter === status
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border-0 shadow-sm">
                    <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-green-600">{inquiries.filter(i => i.status === 'New').length}</p>
                        <p className="text-sm text-gray-500">New</p>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                    <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-blue-600">{inquiries.filter(i => i.status === 'Contacted').length}</p>
                        <p className="text-sm text-gray-500">Contacted</p>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                    <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-yellow-600">{inquiries.filter(i => i.status === 'Pending').length}</p>
                        <p className="text-sm text-gray-500">Pending</p>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                    <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-gray-600">{inquiries.length}</p>
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
                                <TableHead>Student</TableHead>
                                <TableHead>Parent/Guardian</TableHead>
                                <TableHead>Grade</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredInquiries.map((inquiry) => (
                                <TableRow key={inquiry.id}>
                                    <TableCell className="font-medium">{inquiry.studentName}</TableCell>
                                    <TableCell>{inquiry.parentName}</TableCell>
                                    <TableCell>{inquiry.grade}</TableCell>
                                    <TableCell>
                                        <div className="text-sm">
                                            <p>{inquiry.email}</p>
                                            <p className="text-gray-500">{inquiry.phone}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-500">{formatDate(inquiry.date)}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(inquiry.status)}>{inquiry.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="sm" onClick={() => setSelectedInquiry(inquiry)}>
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(inquiry.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredInquiries.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                        No inquiries found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Detail Dialog */}
            <Dialog open={!!selectedInquiry} onOpenChange={() => setSelectedInquiry(null)}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Inquiry Details</DialogTitle>
                    </DialogHeader>
                    {selectedInquiry && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Student Name</p>
                                    <p className="font-medium">{selectedInquiry.studentName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Parent Name</p>
                                    <p className="font-medium">{selectedInquiry.parentName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Applying for</p>
                                    <p className="font-medium">{selectedInquiry.grade}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Date</p>
                                    <p className="font-medium">{formatDate(selectedInquiry.date)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <a href={`mailto:${selectedInquiry.email}`} className="font-medium text-green-600 hover:underline">
                                        {selectedInquiry.email}
                                    </a>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <a href={`tel:${selectedInquiry.phone}`} className="font-medium text-green-600 hover:underline">
                                        {selectedInquiry.phone}
                                    </a>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Message</p>
                                <p className="bg-gray-50 p-3 rounded-lg">{selectedInquiry.message}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-2">Update Status</p>
                                <div className="flex gap-2">
                                    {['New', 'Contacted', 'Pending', 'Closed'].map((status) => (
                                        <Button
                                            key={status}
                                            variant={selectedInquiry.status === status ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => {
                                                handleStatusChange(selectedInquiry.id, status);
                                                setSelectedInquiry({ ...selectedInquiry, status });
                                            }}
                                            className={selectedInquiry.status === status ? 'bg-green-600' : ''}
                                        >
                                            {status}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default InquiriesViewer;
