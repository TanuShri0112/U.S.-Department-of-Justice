import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';

const Settings = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Settings" 
        description="Manage your application settings"
      />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Roles & Access</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 border rounded-md">
              <div className="font-semibold mb-1">Admin</div>
              <div>Full platform management and settings.</div>
            </div>
            <div className="p-4 border rounded-md">
              <div className="font-semibold mb-1">Evaluator</div>
              <div>Access analytics, evaluation tools, MEL dashboards.</div>
            </div>
            <div className="p-4 border rounded-md">
              <div className="font-semibold mb-1">Manager</div>
              <div>Track team progress and impact metrics.</div>
            </div>
            <div className="p-4 border rounded-md md:col-span-3">
              <div className="font-semibold mb-1">Learner</div>
              <div>Access learning content, assessments, reflections.</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-ca-primary" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Platform Name</Label>
              <Input id="siteName" defaultValue="DAI Global" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteUrl">Platform URL</Label>
              <Input id="siteUrl" defaultValue="https://creditoracademy.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input id="supportEmail" type="email" defaultValue="support@daiglobal.com" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Email Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fromEmail">From Email</Label>
              <Input id="fromEmail" type="email" defaultValue="no-reply@creditoracademy.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emailFooter">Email Footer Text</Label>
              <Input id="emailFooter" defaultValue="© 2025 DAI Global. All rights reserved." />
            </div>
            <Button>Update Email Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;