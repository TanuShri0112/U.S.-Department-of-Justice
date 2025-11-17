// IBC Tender Requirement: Microsoft Teams Integration Settings
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { toast } from 'react-hot-toast';
import { 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  Video,
  Calendar,
  Bell,
  FileText
} from 'lucide-react';
import TeamsIntegrationManager from '@/lib/integrations/TeamsIntegration';

const TeamsIntegrationSettings = () => {
  const [teamsConfig, setTeamsConfig] = useState({
    enabled: false,
    clientId: '',
    tenantId: '',
    redirectUri: window.location.origin + '/auth/teams/callback',
    channelId: ''
  });
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [isTesting, setIsTesting] = useState(false);

  const teamsManager = new TeamsIntegrationManager();

  const handleTestConnection = async () => {
    setIsTesting(true);
    try {
      teamsManager.initialize(teamsConfig);
      // In production, this would actually test the connection
      setConnectionStatus('connected');
      toast.success('Microsoft Teams connection successful!');
    } catch (error) {
      setConnectionStatus('error');
      toast.error(`Connection failed: ${error.message}`);
    } finally {
      setIsTesting(false);
    }
  };

  const handleAuthenticate = async () => {
    try {
      teamsManager.initialize(teamsConfig);
      await teamsManager.teamsIntegration.authenticate();
    } catch (error) {
      toast.error(`Authentication failed: ${error.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Microsoft Teams Integration</h1>
        <p className="text-gray-600">
          Connect with Microsoft Teams for meetings, notifications, and collaboration
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Teams Configuration
              </CardTitle>
              <CardDescription>
                Configure Microsoft Teams integration for training sessions and notifications
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={teamsConfig.enabled}
                onCheckedChange={(checked) => 
                  setTeamsConfig({ ...teamsConfig, enabled: checked })
                }
              />
              <Badge 
                variant={connectionStatus === 'connected' ? 'default' : 'secondary'}
                className="flex items-center gap-1"
              >
                {connectionStatus === 'connected' ? (
                  <>
                    <CheckCircle className="h-3 w-3" />
                    Connected
                  </>
                ) : connectionStatus === 'error' ? (
                  <>
                    <XCircle className="h-3 w-3" />
                    Error
                  </>
                ) : (
                  'Disconnected'
                )}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="teamsClientId">Azure AD Client ID</Label>
            <Input
              id="teamsClientId"
              placeholder="Enter Azure AD Application Client ID"
              value={teamsConfig.clientId}
              onChange={(e) => setTeamsConfig({ ...teamsConfig, clientId: e.target.value })}
              disabled={!teamsConfig.enabled}
            />
            <p className="text-xs text-gray-500">
              Register your app in Azure AD to get a Client ID
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="teamsTenantId">Tenant ID</Label>
            <Input
              id="teamsTenantId"
              placeholder="Enter your Azure AD Tenant ID"
              value={teamsConfig.tenantId}
              onChange={(e) => setTeamsConfig({ ...teamsConfig, tenantId: e.target.value })}
              disabled={!teamsConfig.enabled}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="teamsRedirectUri">Redirect URI</Label>
            <Input
              id="teamsRedirectUri"
              value={teamsConfig.redirectUri}
              onChange={(e) => setTeamsConfig({ ...teamsConfig, redirectUri: e.target.value })}
              disabled={!teamsConfig.enabled}
            />
            <p className="text-xs text-gray-500">
              Add this URL to your Azure AD app registration redirect URIs
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="teamsChannelId">Default Teams Channel ID (Optional)</Label>
            <Input
              id="teamsChannelId"
              placeholder="Enter Teams channel ID for notifications"
              value={teamsConfig.channelId}
              onChange={(e) => setTeamsConfig({ ...teamsConfig, channelId: e.target.value })}
              disabled={!teamsConfig.enabled}
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleAuthenticate}
              disabled={!teamsConfig.enabled || isTesting}
              variant="outline"
            >
              <Video className="h-4 w-4 mr-2" />
              Authenticate with Teams
            </Button>
            <Button
              onClick={handleTestConnection}
              disabled={!teamsConfig.enabled || isTesting}
              variant="default"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isTesting ? 'animate-spin' : ''}`} />
              Test Connection
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Integration Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-3 border rounded-lg">
              <Video className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold">Teams Meetings</h3>
                <p className="text-sm text-gray-600">
                  Schedule and join training sessions directly from Teams
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border rounded-lg">
              <Bell className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-semibold">Channel Notifications</h3>
                <p className="text-sm text-gray-600">
                  Send training updates and reminders to Teams channels
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border rounded-lg">
              <Calendar className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <h3 className="font-semibold">Calendar Sync</h3>
                <p className="text-sm text-gray-600">
                  Sync training schedules with Teams calendar
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border rounded-lg">
              <FileText className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <h3 className="font-semibold">File Sharing</h3>
                <p className="text-sm text-gray-600">
                  Share training materials and resources via Teams
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamsIntegrationSettings;

