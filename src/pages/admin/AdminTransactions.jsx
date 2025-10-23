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
  Shield,
  AlertTriangle,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AdminTransactions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedTransactions, setSelectedTransactions] = useState([]);

  // Mock transaction data with more admin details
  const transactions = [
    {
      id: 'TXN-001',
      course: 'U.S. Department of Justice- National Community Outreach & Prevention',
      student: 'John Doe',
      studentEmail: 'john.doe@email.com',
      studentId: 'STU-001',
      amount: 299.99,
      currency: 'USD',
      status: 'completed',
      method: 'Credit Card',
      date: '2024-01-15',
      time: '14:30',
      transactionId: 'txn_123456789',
      invoiceUrl: '/invoices/TXN-001.pdf',
      paymentGateway: 'Stripe',
      gatewayTransactionId: 'pi_1234567890',
      processingFee: 8.70,
      netAmount: 291.29,
      refunded: false,
      refundAmount: 0,
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: 'TXN-002',
      course: 'UQTR Training Catalogue',
      student: 'Jane Smith',
      studentEmail: 'jane.smith@email.com',
      studentId: 'STU-002',
      amount: 199.99,
      currency: 'USD',
      status: 'pending',
      method: 'PayPal',
      date: '2024-01-14',
      time: '09:15',
      transactionId: 'txn_987654321',
      invoiceUrl: '/invoices/TXN-002.pdf',
      paymentGateway: 'PayPal',
      gatewayTransactionId: 'PAYID-123456789',
      processingFee: 6.80,
      netAmount: 193.19,
      refunded: false,
      refundAmount: 0,
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    },
    {
      id: 'TXN-003',
      course: 'Community Policing Fundamentals',
      student: 'Mike Johnson',
      studentEmail: 'mike.johnson@email.com',
      studentId: 'STU-003',
      amount: 149.99,
      currency: 'USD',
      status: 'failed',
      method: 'Credit Card',
      date: '2024-01-13',
      time: '16:45',
      transactionId: 'txn_456789123',
      invoiceUrl: null,
      paymentGateway: 'Stripe',
      gatewayTransactionId: 'pi_4567891230',
      processingFee: 0,
      netAmount: 0,
      refunded: false,
      refundAmount: 0,
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
      failureReason: 'Insufficient funds'
    },
    {
      id: 'TXN-004',
      course: 'Advanced Law Enforcement Techniques',
      student: 'Sarah Wilson',
      studentEmail: 'sarah.wilson@email.com',
      studentId: 'STU-004',
      amount: 0,
      currency: 'USD',
      status: 'completed',
      method: 'Free',
      date: '2024-01-12',
      time: '11:20',
      transactionId: 'txn_789123456',
      invoiceUrl: null,
      paymentGateway: 'None',
      gatewayTransactionId: null,
      processingFee: 0,
      netAmount: 0,
      refunded: false,
      refundAmount: 0,
      ipAddress: '192.168.1.103',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: 'TXN-005',
      course: 'Community Outreach Specialization',
      student: 'David Brown',
      studentEmail: 'david.brown@email.com',
      studentId: 'STU-005',
      amount: 149.99,
      currency: 'USD',
      status: 'refunded',
      method: 'Credit Card',
      date: '2024-01-11',
      time: '13:10',
      transactionId: 'txn_321654987',
      invoiceUrl: '/invoices/TXN-005.pdf',
      paymentGateway: 'Stripe',
      gatewayTransactionId: 'pi_3216549870',
      processingFee: 4.35,
      netAmount: 145.64,
      refunded: true,
      refundAmount: 149.99,
      refundDate: '2024-01-20',
      ipAddress: '192.168.1.104',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
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

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.studentEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleRefund = (transactionId) => {
    toast({
      title: "Refund initiated",
      description: `Refund process started for transaction ${transactionId}`,
    });
  };

  const handleViewDetails = (transactionId) => {
    toast({
      title: "Transaction details",
      description: `Opening detailed view for transaction ${transactionId}`,
    });
  };

  const handleBulkAction = (action) => {
    if (selectedTransactions.length === 0) {
      toast({
        title: "No transactions selected",
        description: "Please select transactions to perform bulk actions",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: `${action} initiated`,
      description: `Processing ${action.toLowerCase()} for ${selectedTransactions.length} transactions`,
    });
  };

  const toggleTransactionSelection = (transactionId) => {
    setSelectedTransactions(prev => 
      prev.includes(transactionId) 
        ? prev.filter(id => id !== transactionId)
        : [...prev, transactionId]
    );
  };

  const selectAllTransactions = () => {
    setSelectedTransactions(filteredTransactions.map(t => t.id));
  };

  const deselectAllTransactions = () => {
    setSelectedTransactions([]);
  };

  const totalRevenue = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.netAmount, 0);

  const totalProcessingFees = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.processingFee, 0);

  const pendingAmount = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  const refundedAmount = transactions
    .filter(t => t.status === 'refunded')
    .reduce((sum, t) => sum + t.refundAmount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transaction Management</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive transaction monitoring and management for administrators
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Admin Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-green-500">After processing fees</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Fees</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalProcessingFees.toFixed(2)}</div>
            <p className="text-xs text-red-500">Gateway charges</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingAmount.toFixed(2)}</div>
            <p className="text-xs text-yellow-500">{transactions.filter(t => t.status === 'pending').length} transactions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refunded</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${refundedAmount.toFixed(2)}</div>
            <p className="text-xs text-blue-500">{transactions.filter(t => t.status === 'refunded').length} transactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Advanced Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-9" 
                placeholder="Search transactions, students, emails..." 
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
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedTransactions.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {selectedTransactions.length} transaction(s) selected
                </span>
                <Button variant="outline" size="sm" onClick={deselectAllTransactions}>
                  Clear Selection
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleBulkAction('Export')}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Selected
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleBulkAction('Refund')}>
                  <Shield className="h-4 w-4 mr-2" />
                  Bulk Refund
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Transaction Management
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={selectAllTransactions}>
                Select All
              </Button>
              <Button variant="outline" size="sm" onClick={deselectAllTransactions}>
                Deselect All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedTransactions.includes(transaction.id)}
                      onChange={() => toggleTransactionSelection(transaction.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(transaction.status)}
                        <h3 className="font-semibold">{transaction.course}</h3>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                        {transaction.refunded && (
                          <Badge variant="outline" className="text-blue-600">
                            Refunded
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <div>
                            <div className="font-medium">{transaction.student}</div>
                            <div className="text-xs text-gray-500">{transaction.studentEmail}</div>
                            <div className="text-xs text-gray-500">ID: {transaction.studentId}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          <div>
                            <div className="font-semibold">
                              {transaction.amount > 0 ? `$${transaction.amount}` : 'FREE'} {transaction.currency}
                            </div>
                            {transaction.processingFee > 0 && (
                              <div className="text-xs text-red-500">
                                Fee: ${transaction.processingFee} | Net: ${transaction.netAmount}
                              </div>
                            )}
                            {transaction.refunded && (
                              <div className="text-xs text-blue-500">
                                Refunded: ${transaction.refundAmount}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <div>
                            <div>{transaction.method}</div>
                            <div className="text-xs text-gray-500">{transaction.paymentGateway}</div>
                            {transaction.gatewayTransactionId && (
                              <div className="text-xs text-gray-500">{transaction.gatewayTransactionId}</div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-500 mb-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span>{transaction.date} at {transaction.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-3 w-3" />
                          <span>IP: {transaction.ipAddress}</span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Transaction ID: {transaction.transactionId} | Invoice: {transaction.id}
                        {transaction.failureReason && (
                          <span className="text-red-500 ml-2">| Failure: {transaction.failureReason}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {transaction.invoiceUrl && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(transaction.id)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Invoice
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(transaction.id)}
                    >
                      <Receipt className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                    {transaction.status === 'completed' && !transaction.refunded && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRefund(transaction.id)}
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Refund
                      </Button>
                    )}
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
    </div>
  );
};

export default AdminTransactions;
