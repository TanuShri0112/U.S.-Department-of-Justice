// IBC Tender Requirement: GDPR Compliance with IBC Privacy & Retention Policies
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Shield, FileText, Clock, Lock, Eye, Trash2, Download, CheckCircle } from 'lucide-react';

const GDPRCompliance = () => {
  const [activeTab, setActiveTab] = useState('privacy');

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">GDPR Compliance & Privacy</h1>
        <p className="text-gray-600">
          Ipswich Borough Council (IBC) Data Protection and Privacy Policies
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
          <TabsTrigger value="retention">Data Retention</TabsTrigger>
          <TabsTrigger value="rights">Your Rights</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Status</TabsTrigger>
        </TabsList>

        {/* Privacy Policy Tab */}
        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Ipswich Borough Council Privacy Policy
              </CardTitle>
              <CardDescription>
                Last updated: {new Date().toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-2">1. Introduction</h3>
                <p className="text-gray-700 mb-4">
                  Ipswich Borough Council (IBC) is committed to protecting your personal data in accordance 
                  with the General Data Protection Regulation (GDPR) and the Data Protection Act 2018. This 
                  privacy policy explains how we collect, use, and protect your personal information when you 
                  use our Learning Management System (LMS).
                </p>

                <h3 className="text-lg font-semibold mb-2">2. Data Controller</h3>
                <p className="text-gray-700 mb-4">
                  Ipswich Borough Council is the data controller for the personal data processed through this 
                  LMS. Our registered address is:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="font-medium">Ipswich Borough Council</p>
                  <p>Grafton House</p>
                  <p>15-17 Russell Road</p>
                  <p>Ipswich IP1 2DE</p>
                  <p className="mt-2">Email: data.protection@ipswich.gov.uk</p>
                </div>

                <h3 className="text-lg font-semibold mb-2">3. Personal Data We Collect</h3>
                <p className="text-gray-700 mb-2">We collect the following types of personal data:</p>
                <ul className="list-disc list-inside space-y-1 mb-4 text-gray-700">
                  <li>Name, email address, and employee ID</li>
                  <li>Department and job role information</li>
                  <li>Training records and course completion data</li>
                  <li>Assessment scores and learning progress</li>
                  <li>System usage logs and access timestamps</li>
                  <li>Communication records (messages, feedback)</li>
                </ul>

                <h3 className="text-lg font-semibold mb-2">4. How We Use Your Data</h3>
                <p className="text-gray-700 mb-2">We use your personal data to:</p>
                <ul className="list-disc list-inside space-y-1 mb-4 text-gray-700">
                  <li>Provide access to training courses and learning materials</li>
                  <li>Track your learning progress and completion</li>
                  <li>Generate compliance reports for your department</li>
                  <li>Send notifications about training requirements and deadlines</li>
                  <li>Improve our learning platform and services</li>
                  <li>Comply with legal obligations and council policies</li>
                </ul>

                <h3 className="text-lg font-semibold mb-2">5. Legal Basis for Processing</h3>
                <p className="text-gray-700 mb-4">
                  We process your personal data based on the following legal grounds:
                </p>
                <ul className="list-disc list-inside space-y-1 mb-4 text-gray-700">
                  <li><strong>Legitimate Interest:</strong> Staff development and training management</li>
                  <li><strong>Legal Obligation:</strong> Compliance with health and safety, and employment law</li>
                  <li><strong>Public Task:</strong> Delivery of public services and staff training</li>
                  <li><strong>Consent:</strong> Where you have provided explicit consent for specific processing</li>
                </ul>

                <h3 className="text-lg font-semibold mb-2">6. Data Sharing</h3>
                <p className="text-gray-700 mb-4">
                  We may share your data with:
                </p>
                <ul className="list-disc list-inside space-y-1 mb-4 text-gray-700">
                  <li>Your line manager and department head for training compliance reporting</li>
                  <li>HR department for training records and compliance tracking</li>
                  <li>IT department for system maintenance and support</li>
                  <li>Authorized third-party service providers under strict data processing agreements</li>
                  <li>Regulatory bodies when required by law</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  We do not sell or share your personal data with external organizations for marketing purposes.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Retention Tab */}
        <TabsContent value="retention" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                IBC Data Retention Policy
              </CardTitle>
              <CardDescription>
                How long we retain your personal data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg mb-2">Training Records</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Retention Period:</strong> 7 years from course completion or employee termination
                  </p>
                  <p className="text-sm text-gray-600">
                    This includes course completion certificates, assessment scores, and training history. 
                    Required for compliance reporting and employment records.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg mb-2">User Account Data</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Retention Period:</strong> Active accounts retained while employed; 2 years after termination
                  </p>
                  <p className="text-sm text-gray-600">
                    Account information, login credentials, and profile data. Deleted after retention period 
                    unless required for legal or compliance purposes.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-lg mb-2">System Logs</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Retention Period:</strong> 90 days for access logs; 1 year for security audit logs
                  </p>
                  <p className="text-sm text-gray-600">
                    System access logs, login attempts, and security events. Retained for security monitoring 
                    and incident investigation.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-lg mb-2">Communication Records</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Retention Period:</strong> 2 years from last communication
                  </p>
                  <p className="text-sm text-gray-600">
                    Messages, feedback, and support communications. Retained for service quality and dispute resolution.
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Trash2 className="h-5 w-5" />
                    Data Deletion
                  </h3>
                  <p className="text-gray-700">
                    At the end of the retention period, personal data is securely deleted using industry-standard 
                    methods. Anonymized statistical data may be retained for reporting purposes where it cannot 
                    identify individuals.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Your Rights Tab */}
        <TabsContent value="rights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Your Data Protection Rights
              </CardTitle>
              <CardDescription>
                Under GDPR, you have the following rights regarding your personal data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Eye className="h-4 w-4 text-blue-500" />
                    Right of Access
                  </h3>
                  <p className="text-sm text-gray-700">
                    You have the right to request a copy of all personal data we hold about you. 
                    Requests will be processed within 30 days.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-green-500" />
                    Right to Rectification
                  </h3>
                  <p className="text-sm text-gray-700">
                    You can request correction of inaccurate or incomplete personal data at any time.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Trash2 className="h-4 w-4 text-red-500" />
                    Right to Erasure
                  </h3>
                  <p className="text-sm text-gray-700">
                    You can request deletion of your personal data in certain circumstances, subject to 
                    legal and compliance requirements.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Lock className="h-4 w-4 text-purple-500" />
                    Right to Restrict Processing
                  </h3>
                  <p className="text-sm text-gray-700">
                    You can request that we limit how we use your personal data in certain situations.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Download className="h-4 w-4 text-orange-500" />
                    Right to Data Portability
                  </h3>
                  <p className="text-sm text-gray-700">
                    You can request a copy of your data in a structured, machine-readable format.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-indigo-500" />
                    Right to Object
                  </h3>
                  <p className="text-sm text-gray-700">
                    You can object to processing of your personal data for certain purposes, including 
                    direct marketing or automated decision-making.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <h3 className="font-semibold mb-2">How to Exercise Your Rights</h3>
                <p className="text-sm text-gray-700 mb-2">
                  To exercise any of these rights, please contact:
                </p>
                <p className="text-sm font-medium">
                  Email: data.protection@ipswich.gov.uk<br />
                  Phone: 01473 432000<br />
                  Address: Grafton House, 15-17 Russell Road, Ipswich IP1 2DE
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Status Tab */}
        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                GDPR Compliance Status
              </CardTitle>
              <CardDescription>
                Current compliance measures and certifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Data Encryption</span>
                  </div>
                  <Badge variant="default" className="bg-green-600">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Access Controls</span>
                  </div>
                  <Badge variant="default" className="bg-green-600">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Audit Logging</span>
                  </div>
                  <Badge variant="default" className="bg-green-600">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Data Retention Policies</span>
                  </div>
                  <Badge variant="default" className="bg-green-600">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Privacy Policy</span>
                  </div>
                  <Badge variant="default" className="bg-green-600">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Data Processing Agreements</span>
                  </div>
                  <Badge variant="default" className="bg-green-600">Active</Badge>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Compliance Certification</h3>
                <p className="text-sm text-gray-700">
                  This LMS is designed and operated in compliance with GDPR requirements and IBC data 
                  protection policies. Regular audits are conducted to ensure ongoing compliance.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GDPRCompliance;

