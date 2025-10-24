import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  BookOpen,
  ArrowUpDown,
  Star,
  MessageCircle,
  RefreshCw,
  FileText,
  AlertCircle,
  TrendingUp,
  Award,
  Gift,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [expandedTransaction, setExpandedTransaction] = useState(null);

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
      course: 'Training Catalogue',
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
      case 'completed': return { bg: 'bg-emerald-100', text: 'text-emerald-800', icon: 'text-emerald-600' };
      case 'pending': return { bg: 'bg-amber-100', text: 'text-amber-800', icon: 'text-amber-600' };
      case 'failed': return { bg: 'bg-red-100', text: 'text-red-800', icon: 'text-red-600' };
      case 'refunded': return { bg: 'bg-blue-100', text: 'text-blue-800', icon: 'text-blue-600' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-800', icon: 'text-gray-600' };
    }
  };

  const getStatusIcon = (status) => {
    const colors = getStatusColor(status);
    switch (status) {
      case 'completed': return <CheckCircle className={`h-5 w-5 ${colors.icon}`} />;
      case 'pending': return <Clock className={`h-5 w-5 ${colors.icon}`} />;
      case 'failed': return <XCircle className={`h-5 w-5 ${colors.icon}`} />;
      case 'refunded': return <ArrowUpDown className={`h-5 w-5 ${colors.icon}`} />;
      default: return <Clock className={`h-5 w-5 ${colors.icon}`} />;
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
    <div className="space-y-8 animate-fade-in bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen p-2 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">My Transactions</h1>
          <p className="text-slate-600 text-lg">
            Track your course purchases, investments, and learning achievements
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-600">Total Spent</CardTitle>
            <div className="p-2 bg-emerald-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">${totalSpent.toFixed(2)}</div>
            <p className="text-xs text-emerald-600 font-medium mt-2">📚 Investment in learning</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-600">Completed</CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Award className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{completedCourses}</div>
            <p className="text-xs text-blue-600 font-medium mt-2">✓ Out of {userTransactions.length} purchased</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-600">Certificates</CardTitle>
            <div className="p-2 bg-purple-100 rounded-lg">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{certificatesEarned}</div>
            <p className="text-xs text-purple-600 font-medium mt-2">🏆 Achievements unlocked</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-600">Refunds</CardTitle>
            <div className="p-2 bg-indigo-100 rounded-lg">
              <ArrowUpDown className="h-5 w-5 text-indigo-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">${totalRefunded.toFixed(2)}</div>
            <p className="text-xs text-indigo-600 font-medium mt-2">↩️ Total refunded</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters Section */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="pb-4 border-b border-slate-200">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5 text-blue-600" />
            <span>Search & Filter</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                className="pl-10 border-slate-300 focus:border-blue-500 focus:ring-blue-500" 
                placeholder="Search courses or transaction IDs..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px] border-slate-300">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="completed">✓ Completed</SelectItem>
                <SelectItem value="pending">⏳ Pending</SelectItem>
                <SelectItem value="failed">✗ Failed</SelectItem>
                <SelectItem value="refunded">↩️ Refunded</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px] border-slate-300">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">📅 Newest First</SelectItem>
                <SelectItem value="amount">💰 Highest Amount</SelectItem>
                <SelectItem value="course">📖 Course Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card className="border-0 shadow-md bg-white overflow-hidden">
        <CardHeader className="pb-4 border-b border-slate-200">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Receipt className="h-5 w-5 text-blue-600" />
            <span>Transaction History</span>
            <Badge variant="secondary" className="ml-auto">{filteredTransactions.length} transactions</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {filteredTransactions.length > 0 ? (
            <div className="divide-y divide-slate-200">
              {filteredTransactions.map((transaction) => {
                const colors = getStatusColor(transaction.status);
                const isExpanded = expandedTransaction === transaction.id;
                
                return (
                  <div 
                    key={transaction.id} 
                    className="hover:bg-slate-50 transition-colors"
                  >
                    {/* Main Transaction Item */}
                    <div 
                      className="p-4 cursor-pointer"
                      onClick={() => setExpandedTransaction(isExpanded ? null : transaction.id)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          {/* Status Icon */}
                          <div className={`p-3 rounded-lg ${colors.bg} flex-shrink-0`}>
                            {getStatusIcon(transaction.status)}
                          </div>

                          {/* Course Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                              <h3 className="font-semibold text-slate-900 text-sm md:text-base line-clamp-2">{transaction.course}</h3>
                              <Badge className={`${colors.bg} ${colors.text} border-0 flex-shrink-0`}>
                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                              </Badge>
                              {transaction.certificateEarned && (
                                <Badge variant="outline" className="text-yellow-600 border-yellow-300 flex-shrink-0">
                                  <Award className="h-3 w-3 mr-1" />
                                  Certificate
                                </Badge>
                              )}
                            </div>

                            {/* Quick Info */}
                            <div className="flex flex-wrap gap-4 text-xs md:text-sm text-slate-600">
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4 text-slate-400" />
                                <span className="font-semibold">
                                  {transaction.amount > 0 ? `$${transaction.amount.toFixed(2)}` : 'FREE'}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CreditCard className="h-4 w-4 text-slate-400" />
                                <span>{transaction.method}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4 text-slate-400" />
                                <span>{new Date(transaction.date).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Expand Icon */}
                        <ChevronRight 
                          className={`h-5 w-5 text-slate-400 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                        />
                      </div>

                      {/* Course Progress Bar (visible on main view) */}
                      {transaction.status === 'completed' && (
                        <div className="mt-3 ml-16 pr-6">
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="text-slate-600">Progress</span>
                            <span className="font-semibold text-slate-900">{transaction.courseProgress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${transaction.courseProgress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="border-t border-slate-200 bg-slate-50 p-6 space-y-6">
                        {/* Transaction Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Transaction Details</p>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-slate-600">Transaction ID:</span>
                                <span className="font-mono font-semibold text-slate-900">{transaction.transactionId}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Invoice ID:</span>
                                <span className="font-mono font-semibold text-slate-900">{transaction.id}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Date & Time:</span>
                                <span className="font-semibold text-slate-900">{transaction.date} at {transaction.time}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Payment Info</p>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-slate-600">Amount:</span>
                                <span className="font-semibold text-slate-900">${transaction.amount.toFixed(2)} {transaction.currency}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Method:</span>
                                <span className="font-semibold text-slate-900">{transaction.method}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Status:</span>
                                <Badge className={`${colors.bg} ${colors.text} border-0`}>
                                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Course Progress Section */}
                        {transaction.status === 'completed' && (
                          <div className="pt-4 border-t border-slate-300">
                            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">Learning Progress</p>
                            <div className="flex items-center gap-4">
                              <div className="flex-1">
                                <div className="w-full bg-slate-300 rounded-full h-3 overflow-hidden">
                                  <div 
                                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-300"
                                    style={{ width: `${transaction.courseProgress}%` }}
                                  />
                                </div>
                              </div>
                              <span className="text-lg font-bold text-slate-900 w-12 text-right">{transaction.courseProgress}%</span>
                            </div>
                          </div>
                        )}

                        {/* Rating and Review */}
                        {transaction.status === 'completed' && transaction.courseProgress === 100 && (
                          <div className="pt-4 border-t border-slate-300">
                            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">Course Feedback</p>
                            {transaction.rating ? (
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-slate-700">Your Rating:</span>
                                  <div className="flex items-center gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                      <Star 
                                        key={i} 
                                        className={`h-4 w-4 ${i < transaction.rating ? 'text-amber-400 fill-current' : 'text-slate-300'}`} 
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm font-bold text-slate-900">({transaction.rating}/5)</span>
                                </div>
                                {transaction.review && (
                                  <p className="text-sm text-slate-700 italic border-l-2 border-amber-400 pl-3">"{transaction.review}"</p>
                                )}
                              </div>
                            ) : (
                              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                <span className="text-sm font-medium text-slate-700">Rate this course:</span>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className="h-4 w-4 text-slate-300 hover:text-amber-400 cursor-pointer transition-colors"
                                      onClick={() => handleRateCourse(transaction.courseId, i + 1)}
                                    />
                                  ))}
                                </div>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleWriteReview(transaction.courseId)}
                                  className="ml-auto sm:ml-0"
                                >
                                  <MessageCircle className="h-3 w-3 mr-2" />
                                  Write Review
                                </Button>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Refund Information */}
                        {transaction.refundEligible && (
                          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                            <div className="flex items-center gap-2 text-sm">
                              <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                              <span className="text-amber-900">
                                <strong>Refund eligible</strong> until {transaction.refundDeadline}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Refunded Status */}
                        {transaction.status === 'refunded' && (
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-blue-900">Refund Processed</p>
                                <p className="text-xs text-blue-700">
                                  ${transaction.refundAmount} refunded on {transaction.refundDate}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-300">
                          {transaction.invoiceUrl && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewInvoice(transaction.id)}
                              className="gap-2"
                            >
                              <Eye className="h-4 w-4" />
                              View Invoice
                            </Button>
                          )}
                          
                          {transaction.status === 'completed' && transaction.courseProgress < 100 && (
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => handleContinueCourse(transaction.courseId)}
                              className="gap-2"
                            >
                              <BookOpen className="h-4 w-4" />
                              Continue Course
                            </Button>
                          )}
                          
                          {transaction.certificateEarned && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDownloadCertificate(transaction.courseId)}
                              className="gap-2"
                            >
                              <Award className="h-4 w-4" />
                              Download Certificate
                            </Button>
                          )}
                          
                          {transaction.refundEligible && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleRequestRefund(transaction.id)}
                              className="gap-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                            >
                              <RefreshCw className="h-4 w-4" />
                              Request Refund
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Receipt className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No transactions found</h3>
              <p className="text-slate-600 mb-6">
                Try adjusting your search criteria or filters
              </p>
              <Button variant="outline">Browse Courses</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="pb-4 border-b border-slate-200">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Gift className="h-5 w-5 text-blue-600" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center gap-3 hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <BookOpen className="h-6 w-6 text-blue-600" />
              <span className="font-medium">Browse Courses</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center gap-3 hover:bg-purple-50 hover:border-purple-300 transition-colors"
            >
              <Award className="h-6 w-6 text-purple-600" />
              <span className="font-medium">View Certificates</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center gap-3 hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
            >
              <TrendingUp className="h-6 w-6 text-emerald-600" />
              <span className="font-medium">Learning Progress</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;