import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  CreditCard, 
  DollarSign, 
  Tag, 
  Clock, 
  Users, 
  Award, 
  Shield, 
  CheckCircle, 
  XCircle,
  Lock,
  Star,
  Calendar,
  FileText,
  Gift,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const PurchaseCourseModal = ({ 
  isOpen, 
  onClose, 
  course, 
  onPurchaseComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(1); // 1: Course Details, 2: Payment, 3: Confirmation
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [billingInfo, setBillingInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [newsletterSignup, setNewsletterSignup] = useState(false);

  const handleClose = () => {
    setCurrentStep(1);
    setIsProcessing(false);
    setAgreedToTerms(false);
    setNewsletterSignup(false);
    onClose();
  };

  const handlePurchase = async () => {
    if (!agreedToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions to proceed.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(3);
      
      toast({
        title: "Purchase Successful!",
        description: `You have successfully enrolled in "${course.title}"`,
      });
    }, 2000);
  };

  const handleCompletePurchase = () => {
    onPurchaseComplete(course);
    handleClose();
  };

  const formatCardNumber = (value) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value) => {
    return value.replace(/\D/g, '').replace(/(.{2})/, '$1/').trim();
  };

  const calculateSavings = () => {
    if (course.originalPrice && course.originalPrice > course.price) {
      return course.originalPrice - course.price;
    }
    return 0;
  };

  const renderCourseDetails = () => (
    <div className="space-y-6">
      {/* Course Header */}
      <div className="flex items-start gap-4">
        <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={course.image} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{course.description}</p>
          
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {course.level}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {course.catalog}
            </Badge>
            <Badge className="bg-green-100 text-green-800 text-xs">
              {course.status}
            </Badge>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{course.students} students</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Pricing Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
        <h4 className="font-semibold text-gray-900 mb-3">Course Pricing</h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-lg font-bold text-gray-900">
                {course.isPaid ? `$${course.price}` : 'FREE'}
              </span>
              {course.currency && course.isPaid && (
                <span className="text-sm text-gray-500">{course.currency}</span>
              )}
            </div>
            {course.discount && course.discount > 0 && course.isPaid && (
              <Badge className="bg-red-100 text-red-800">
                <Tag className="h-3 w-3 mr-1" />
                {course.discount}% OFF
              </Badge>
            )}
          </div>
          
          {course.originalPrice && course.originalPrice > course.price && course.isPaid && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400 line-through">${course.originalPrice}</span>
              <span className="text-green-600 font-medium">
                Save ${calculateSavings().toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Course Features */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">What's Included</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Lifetime access</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Award className="h-4 w-4 text-green-600" />
            <span>Certificate of completion</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FileText className="h-4 w-4 text-green-600" />
            <span>Downloadable resources</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4 text-green-600" />
            <span>Community access</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4 text-green-600" />
            <span>Self-paced learning</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="h-4 w-4 text-green-600" />
            <span>30-day money-back guarantee</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button 
          onClick={() => setCurrentStep(2)}
          className="flex-1"
          disabled={!course.isPaid}
        >
          {course.isPaid ? (
            <>
              <CreditCard className="h-4 w-4 mr-2" />
              Purchase Course
            </>
          ) : (
            <>
              <Gift className="h-4 w-4 mr-2" />
              Enroll for Free
            </>
          )}
        </Button>
        <Button variant="outline" onClick={handleClose}>
          Cancel
        </Button>
      </div>
    </div>
  );

  const renderPaymentForm = () => (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-3 block">Payment Method</Label>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={paymentMethod === 'card' ? 'default' : 'outline'}
            onClick={() => setPaymentMethod('card')}
            className="flex items-center gap-2"
          >
            <CreditCard className="h-4 w-4" />
            Credit Card
          </Button>
          <Button
            variant={paymentMethod === 'paypal' ? 'default' : 'outline'}
            onClick={() => setPaymentMethod('paypal')}
            className="flex items-center gap-2"
          >
            <div className="w-4 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
              P
            </div>
            PayPal
          </Button>
        </div>
      </div>

      {paymentMethod === 'card' && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.number}
              onChange={(e) => setCardDetails(prev => ({ 
                ...prev, 
                number: formatCardNumber(e.target.value) 
              }))}
              maxLength={19}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails(prev => ({ 
                  ...prev, 
                  expiry: formatExpiry(e.target.value) 
                }))}
                maxLength={5}
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails(prev => ({ 
                  ...prev, 
                  cvv: e.target.value.replace(/\D/g, '').slice(0, 4) 
                }))}
                maxLength={4}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="cardName">Cardholder Name</Label>
            <Input
              id="cardName"
              placeholder="John Doe"
              value={cardDetails.name}
              onChange={(e) => setCardDetails(prev => ({ 
                ...prev, 
                name: e.target.value 
              }))}
            />
          </div>
        </div>
      )}

      {/* Billing Information */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Billing Information</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={billingInfo.firstName}
              onChange={(e) => setBillingInfo(prev => ({ 
                ...prev, 
                firstName: e.target.value 
              }))}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={billingInfo.lastName}
              onChange={(e) => setBillingInfo(prev => ({ 
                ...prev, 
                lastName: e.target.value 
              }))}
            />
          </div>
        </div>
        
        <div className="mt-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={billingInfo.email}
            onChange={(e) => setBillingInfo(prev => ({ 
              ...prev, 
              email: e.target.value 
            }))}
          />
        </div>
        
        <div className="mt-4">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={billingInfo.address}
            onChange={(e) => setBillingInfo(prev => ({ 
              ...prev, 
              address: e.target.value 
            }))}
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={billingInfo.city}
              onChange={(e) => setBillingInfo(prev => ({ 
                ...prev, 
                city: e.target.value 
              }))}
            />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={billingInfo.state}
              onChange={(e) => setBillingInfo(prev => ({ 
                ...prev, 
                state: e.target.value 
              }))}
            />
          </div>
          <div>
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              value={billingInfo.zipCode}
              onChange={(e) => setBillingInfo(prev => ({ 
                ...prev, 
                zipCode: e.target.value 
              }))}
            />
          </div>
        </div>
      </div>

      {/* Terms and Newsletter */}
      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1"
          />
          <Label htmlFor="terms" className="text-sm text-gray-600">
            I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
          </Label>
        </div>
        
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="newsletter"
            checked={newsletterSignup}
            onChange={(e) => setNewsletterSignup(e.target.checked)}
            className="mt-1"
          />
          <Label htmlFor="newsletter" className="text-sm text-gray-600">
            Subscribe to our newsletter for course updates and learning tips
          </Label>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Order Summary</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{course.title}</span>
            <span>{course.isPaid ? `$${course.price}` : 'FREE'}</span>
          </div>
          {course.discount && course.discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount ({course.discount}%)</span>
              <span>-${calculateSavings().toFixed(2)}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{course.isPaid ? `$${course.price}` : 'FREE'}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button 
          onClick={handlePurchase}
          disabled={isProcessing || !agreedToTerms}
          className="flex-1"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="h-4 w-4 mr-2" />
              Complete Purchase
            </>
          )}
        </Button>
        <Button variant="outline" onClick={() => setCurrentStep(1)}>
          Back
        </Button>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Purchase Successful!</h3>
        <p className="text-gray-600">
          You have successfully enrolled in <strong>{course.title}</strong>
        </p>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 text-left">
        <h4 className="font-semibold text-gray-900 mb-2">What's Next?</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Course access granted immediately</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-600" />
            <span>Receipt sent to {billingInfo.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            <span>Start learning at your own pace</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-blue-600" />
            <span>Earn your certificate upon completion</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={handleCompletePurchase} className="flex-1">
          Start Learning Now
        </Button>
        <Button variant="outline" onClick={handleClose}>
          Close
        </Button>
      </div>
    </div>
  );

  if (!course) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {currentStep === 1 && 'Course Details'}
            {currentStep === 2 && 'Payment Information'}
            {currentStep === 3 && 'Purchase Complete'}
          </DialogTitle>
          <DialogDescription>
            {currentStep === 1 && 'Review course details and pricing before purchasing'}
            {currentStep === 2 && 'Enter your payment and billing information'}
            {currentStep === 3 && 'Your enrollment is confirmed and ready to begin'}
          </DialogDescription>
        </DialogHeader>

        {currentStep === 1 && renderCourseDetails()}
        {currentStep === 2 && renderPaymentForm()}
        {currentStep === 3 && renderConfirmation()}
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseCourseModal;
