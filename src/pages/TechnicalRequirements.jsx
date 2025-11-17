// IBC Tender Requirement: Technical Requirements Documentation
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Smartphone, 
  Monitor, 
  Globe, 
  Shield, 
  Lock, 
  Link as LinkIcon,
  Languages,
  Eye
} from 'lucide-react';

const TechnicalRequirements = () => {
  const requirements = [
    {
      title: 'Cross-Platform Compatibility',
      icon: Monitor,
      status: 'implemented',
      description: 'Works on computers and mobile devices (phones/tablets)',
      details: [
        'Responsive design for desktop, tablet, and mobile devices',
        'Touch-optimized interface for mobile devices',
        'Progressive Web App (PWA) capabilities',
        'Compatible with iOS, Android, Windows, macOS, and Linux',
        'Minimum touch target size: 44x44px for accessibility'
      ]
    },
    {
      title: 'Accessibility & Multilingual Support',
      icon: Eye,
      status: 'implemented',
      description: 'Accessible to everyone (supports disabilities, different languages)',
      details: [
        'WCAG 2.1 AA compliance for accessibility',
        'Keyboard navigation support',
        'Screen reader compatibility',
        'High contrast mode support',
        'Reduced motion support for motion sensitivity',
        'Multilingual support (English, Spanish, and extensible)',
        'ARIA labels and semantic HTML',
        'Focus indicators for keyboard users'
      ]
    },
    {
      title: 'Security & GDPR Compliance',
      icon: Shield,
      status: 'implemented',
      description: 'Secure (follows GDPR and data protection laws, encrypted data)',
      details: [
        'AES-256-GCM encryption for data at rest',
        'TLS 1.3 encryption for data in transit',
        'GDPR-compliant data processing',
        'Data retention policies (7 years for training records)',
        'User data export (Right to Data Portability)',
        'Data anonymization capabilities',
        'Audit logging for security events',
        'Secure authentication and authorization',
        'XSS and injection attack prevention',
        'Content Security Policy (CSP) headers'
      ]
    },
    {
      title: 'System Integration',
      icon: LinkIcon,
      status: 'implemented',
      description: 'Can connect (integrate) with Council systems like HR and Microsoft Teams',
      details: [
        'REST API integration for HR systems',
        'SAML 2.0 SSO integration',
        'Microsoft Teams integration',
        'Teams meeting scheduling',
        'Teams channel notifications',
        'Teams calendar synchronization',
        'File sharing via Teams',
        'User synchronization from HR systems',
        'Department data integration',
        'Training status updates to HR systems'
      ]
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Technical Requirements</h1>
        <p className="text-gray-600">
          Ipswich Borough Council (IBC) Learning Management System - Technical Compliance
        </p>
      </div>

      <div className="grid gap-6">
        {requirements.map((req, index) => {
          const Icon = req.icon;
          return (
            <Card key={index} className="border-l-4 border-l-blue-600">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>{req.title}</CardTitle>
                      <CardDescription className="mt-1">{req.description}</CardDescription>
                    </div>
                  </div>
                  <Badge 
                    variant="default" 
                    className="bg-green-600 flex items-center gap-1"
                  >
                    <CheckCircle className="h-3 w-3" />
                    {req.status === 'implemented' ? 'Implemented' : 'In Progress'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {req.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            Additional Technical Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Performance</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Optimized for fast loading times</li>
                <li>• Lazy loading for images and content</li>
                <li>• Code splitting for efficient bundle sizes</li>
                <li>• Caching strategies for offline support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Standards Compliance</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• SCORM 1.2 and SCORM 2004 compatible</li>
                <li>• xAPI (Tin Can API) support</li>
                <li>• LTI (Learning Tools Interoperability) ready</li>
                <li>• RESTful API architecture</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Browser Support</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Chrome, Firefox, Safari, Edge (latest 2 versions)</li>
                <li>• Mobile browsers: iOS Safari, Chrome Mobile</li>
                <li>• Progressive enhancement for older browsers</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Data Protection</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Regular security audits</li>
                <li>• Automated backup systems</li>
                <li>• Disaster recovery procedures</li>
                <li>• Data breach notification protocols</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicalRequirements;

