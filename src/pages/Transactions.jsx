import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Receipt, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  DollarSign,
  Calendar,
  CreditCard,
  User,
  BookOpen,
  ArrowUpDown,
  Star,
  MessageCircle,
  RefreshCw,
  FileText,
  AlertCircle,
  TrendingUp,
  Award,
  Gift
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Mock user-specific transaction data
  const userTransactions = [
    {
      id: 'TXN-001',
      course: 'U.S. Department of Justice- National Community Outreach & Prevention',
      courseId: 'COURSE-001',
      amount: 299.99,
      currency: 'USD',
      status: 'completed',
      method: 'Credit Card',
      date: '2024-01-15',
      time: '14:30',
      transactionId: 'txn_123456789',
      invoiceUrl: '/invoices/TXN-001.pdf',
      courseProgress: 85,
      certificateEarned: true,
      rating: 5,
      review: 'Excellent course with practical insights',
      refundEligible: false,
      refundDeadline: '2024-02-15'
    },
    {
      id: 'TXN-002',
      course: 'UQTR Training Catalogue',
      courseId: 'COURSE-002',
      amount: 199.99,
      currency: 'USD',
      status: 'completed',
      method: 'PayPal',
      date: '2024-01-10',
      time: '09:15',
      transactionId: 'txn_987654321',
      invoiceUrl: '/invoices/TXN-002.pdf',
      courseProgress: 100,
      certificateEarned: true,
      rating: 4,
      review: 'Very informative and well-structured',
      refundEligible: false,
      refundDeadline: '2024-02-10'
    },
    {
      id: 'TXN-003',
      course: 'Community Policing Fundamentals',
      courseId: 'COURSE-003',
      amount: 149.99,
      currency: 'USD',
      status: 'completed',
      method: 'Credit Card',
      date: '2024-01-05',
      time: '16:45',
      transactionId: 'txn_456789123',
      invoiceUrl: '/invoices/TXN-003.pdf',
      courseProgress: 60,
      certificateEarned: false,
      rating: null,
      review: null,
      refundEligible: true,
      refundDeadline: '2024-02-05'
    },
    {
      id: 'TXN-004',
      course: 'Advanced Law Enforcement Techniques',
      courseId: 'COURSE-004',
      amount: 0,
      currency: 'USD',
      status: 'completed',
      method: 'Free',
      date: '2024-01-01',
      time: '11:20',
      transactionId: 'txn_789123456',
      invoiceUrl: null,
      courseProgress: 100,
      certificateEarned: true,
      rating: 5,
      review: 'Outstanding free course!',
      refundEligible: false,
      refundDeadline: null
    },
    {
      id: 'TXN-005',
      course: 'Community Outreach Specialization',
      courseId: 'COURSE-005',
      amount: 149.99,
      currency: 'USD',
      status: 'refunded',
      method: 'Credit Card',
      date: '2023-12-20',
      time: '13:10',
      transactionId: 'txn_321654987',
      invoiceUrl: '/invoices/TXN-005.pdf',
      courseProgress: 0,
      certificateEarned: false,
      rating: null,
      review: null,
      refundEligible: false,
      refundDeadline: null,
      refundDate: '2023-12-25',
      refundAmount: 149.99
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'refunded': return <ArrowUpDown className="h-4 w-4 text-blue-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredTransactions = userTransactions.filter(transaction => {
    const matchesSearch = transaction.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.transactionId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date) - new Date(a.date);
      case 'amount':
        return b.amount - a.amount;
      case 'course':
        return a.course.localeCompare(b.course);
      default:
        return 0;
    }
  });

  const handleViewInvoice = (transactionId) => {
    toast({
      title: "Invoice opened",
      description: `Opening invoice for transaction ${transactionId}`,
    });
  };

  const handleDownloadInvoice = (transactionId) => {
    toast({
      title: "Invoice downloaded",
      description: `Downloading invoice for transaction ${transactionId}`,
    });
  };

  const handleRequestRefund = (transactionId) => {
    toast({
      title: "Refund requested",
      description: `Refund request submitted for transaction ${transactionId}`,
    });
  };

  const handleRateCourse = (courseId, rating) => {
    toast({
      title: "Rating submitted",
      description: `Thank you for rating this course ${rating} stars!`,
    });
  };

  const handleWriteReview = (courseId) => {
    toast({
      title: "Review form opened",
      description: "Please share your experience with this course",
    });
  };

  const handleDownloadCertificate = (courseId) => {
    toast({
      title: "Certificate downloaded",
      description: "Your course completion certificate has been downloaded",
    });
  };

  const handleContinueCourse = (courseId) => {
    toast({
      title: "Resuming course",
      description: "Taking you back to where you left off",
    });
  };

  const totalSpent = userTransactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalRefunded = userTransactions
    .filter(t => t.status === 'refunded')
    .reduce((sum, t) => sum + (t.refundAmount || 0), 0);

  const completedCourses = userTransactions.filter(t => t.status === 'completed' && t.courseProgress === 100).length;
  const certificatesEarned = userTransactions.filter(t => t.certificateEarned).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Transactions</h1>
          <p className="text-muted-foreground mt-2">
            Track your course purchases, progress, and learning journey
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export History
          </Button>
        </div>
      </div>

      {/* User Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
            <p className="text-xs text-green-500">Investment in learning</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCourses}</div>
            <p className="text-xs text-blue-500">Out of {userTransactions.length} purchased</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificatesEarned}</div>
            <p className="text-xs text-purple-500">Achievements unlocked</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refunds</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRefunded.toFixed(2)}</div>
            <p className="text-xs text-blue-500">Total refunded</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-9" 
                placeholder="Search courses or transaction IDs..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All dates" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All dates</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This week</SelectItem>
                <SelectItem value="month">This month</SelectItem>
                <SelectItem value="year">This year</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date (Newest)</SelectItem>
                <SelectItem value="amount">Amount (Highest)</SelectItem>
                <SelectItem value="course">Course Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(transaction.status)}
                      <h3 className="font-semibold">{transaction.course}</h3>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                      {transaction.certificateEarned && (
                        <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                          <Award className="h-3 w-3 mr-1" />
                          Certificate
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-semibold">
                          {transaction.amount > 0 ? `$${transaction.amount}` : 'FREE'} {transaction.currency}
                        </span>
                        {transaction.refunded && (
                          <span className="text-xs text-blue-500">
                            (Refunded: ${transaction.refundAmount})
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span>{transaction.method}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{transaction.date} at {transaction.time}</span>
                      </div>
                    </div>

                    {/* Course Progress */}
                    {transaction.status === 'completed' && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Course Progress</span>
                          <span className="font-medium">{transaction.courseProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${transaction.courseProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Rating and Review */}
                    {transaction.status === 'completed' && transaction.courseProgress === 100 && (
                      <div className="mb-3">
                        {transaction.rating ? (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Your rating:</span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < transaction.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            {transaction.review && (
                              <span className="text-sm text-gray-500 italic">"{transaction.review}"</span>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Rate this course:</span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className="h-4 w-4 text-gray-300 hover:text-yellow-400 cursor-pointer"
                                  onClick={() => handleRateCourse(transaction.courseId, i + 1)}
                                />
                              ))}
                            </div>
                            <Button variant="outline" size="sm" onClick={() => handleWriteReview(transaction.courseId)}>
                              <MessageCircle className="h-3 w-3 mr-1" />
                              Review
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="text-xs text-gray-500">
                      Transaction ID: {transaction.transactionId} | Invoice: {transaction.id}
                      {transaction.refundEligible && (
                        <span className="text-green-600 ml-2">| Refund eligible until {transaction.refundDeadline}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {transaction.invoiceUrl && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewInvoice(transaction.id)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Invoice
                      </Button>
                    )}
                    
                    {transaction.status === 'completed' && transaction.courseProgress < 100 && (
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleContinueCourse(transaction.courseId)}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Continue
                      </Button>
                    )}
                    
                    {transaction.certificateEarned && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadCertificate(transaction.courseId)}
                      >
                        <Award className="h-4 w-4 mr-2" />
                        Certificate
                      </Button>
                    )}
                    
                    {transaction.refundEligible && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRequestRefund(transaction.id)}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Request Refund
                      </Button>
                    )}
                    
                    <Button variant="outline" size="sm">
                      <Receipt className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No transactions found</h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or filters
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <BookOpen className="h-6 w-6" />
              <span>Browse Courses</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <Award className="h-6 w-6" />
              <span>View Certificates</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              <span>Learning Progress</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;