import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  CreditCard, 
  Settings, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
  Shield
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const PaymentsManagement = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      name: "Stripe",
      type: "Credit Card",
      status: "active",
      fee: 2.9,
      currency: "USD",
      description: "Primary payment processor"
    },
    {
      id: 2,
      name: "PayPal",
      type: "Digital Wallet",
      status: "active",
      fee: 3.4,
      currency: "USD",
      description: "Alternative payment option"
    }
  ]);

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      course: "U.S. Department of Justice Training",
      student: "John Doe",
      amount: 299.99,
      currency: "USD",
      status: "completed",
      method: "Stripe",
      date: "2024-01-15",
      transactionId: "txn_123456789"
    },
    {
      id: 2,
      course: "UQTR Training Catalogue",
      student: "Jane Smith",
      amount: 199.99,
      currency: "USD",
      status: "pending",
      method: "PayPal",
      date: "2024-01-14",
      transactionId: "txn_987654321"
    },
    {
      id: 3,
      course: "Law Enforcement Basics",
      student: "Mike Johnson",
      amount: 149.99,
      currency: "USD",
      status: "failed",
      method: "Stripe",
      date: "2024-01-13",
      transactionId: "txn_456789123"
    }
  ]);

  const [settings, setSettings] = useState({
    autoRefund: true,
    refundPeriod: 30,
    taxEnabled: true,
    taxRate: 8.5,
    currency: "USD",
    minimumAmount: 10.00,
    maximumAmount: 10000.00
  });

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
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'refunded': return <Shield className="h-4 w-4 text-blue-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleRefund = (transactionId) => {
    setTransactions(prev => 
      prev.map(transaction => 
        transaction.id === transactionId 
          ? { ...transaction, status: 'refunded' }
          : transaction
      )
    );
    toast({
      title: "Refund processed",
      description: "Transaction has been refunded successfully.",
    });
  };

  const handleSettingsUpdate = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Settings updated",
      description: "Payment settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage payment methods, transactions, and billing settings
          </p>
        </div>
      </div>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{method.name}</h3>
                  <Badge variant={method.status === 'active' ? 'default' : 'secondary'}>
                    {method.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{method.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{method.fee}% fee</span>
                  </div>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
                <Button variant="outline" size="sm" className="mt-3">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Payment Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-refund">Auto Refund</Label>
                <Switch
                  id="auto-refund"
                  checked={settings.autoRefund}
                  onCheckedChange={(checked) => handleSettingsUpdate('autoRefund', checked)}
                />
              </div>
              
              <div>
                <Label htmlFor="refund-period">Refund Period (days)</Label>
                <Input
                  id="refund-period"
                  type="number"
                  value={settings.refundPeriod}
                  onChange={(e) => handleSettingsUpdate('refundPeriod', parseInt(e.target.value))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="tax-enabled">Tax Enabled</Label>
                <Switch
                  id="tax-enabled"
                  checked={settings.taxEnabled}
                  onCheckedChange={(checked) => handleSettingsUpdate('taxEnabled', checked)}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                <Input
                  id="tax-rate"
                  type="number"
                  step="0.1"
                  value={settings.taxRate}
                  onChange={(e) => handleSettingsUpdate('taxRate', parseFloat(e.target.value))}
                />
              </div>
              
              <div>
                <Label htmlFor="currency">Default Currency</Label>
                <Select value={settings.currency} onValueChange={(value) => handleSettingsUpdate('currency', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="CAD">CAD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="min-amount">Min Amount ($)</Label>
                  <Input
                    id="min-amount"
                    type="number"
                    step="0.01"
                    value={settings.minimumAmount}
                    onChange={(e) => handleSettingsUpdate('minimumAmount', parseFloat(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="max-amount">Max Amount ($)</Label>
                  <Input
                    id="max-amount"
                    type="number"
                    step="0.01"
                    value={settings.maximumAmount}
                    onChange={(e) => handleSettingsUpdate('maximumAmount', parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(transaction.status)}
                      <h3 className="font-semibold">{transaction.course}</h3>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{transaction.student}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span>${transaction.amount} {transaction.currency}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span>{transaction.method}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{transaction.date}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Transaction ID: {transaction.transactionId}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {transaction.status === 'completed' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRefund(transaction.id)}
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Refund
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentsManagement;
