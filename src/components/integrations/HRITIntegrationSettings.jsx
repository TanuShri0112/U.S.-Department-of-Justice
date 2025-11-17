// IBC Tender Requirement: HR/IT Integration Settings Component
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { toast } from 'react-hot-toast';
import { 
  Settings, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  Key, 
  Link as LinkIcon,
  Users,
  Database
} from 'lucide-react';
import HRITIntegrationManager from '@/lib/integrations/HRITIntegration';

const HRITIntegrationSettings = () => {
  const [activeTab, setActiveTab] = useState('rest');
  const [restConfig, setRestConfig] = useState({
    enabled: false,
    baseUrl: '',
    apiKey: '',
    timeout: 30000
  });
  const [samlConfig, setSamlConfig] = useState({
    enabled: false,
    issuer: '',
    entityId: '',
    ssoUrl: '',
    callbackUrl: '',
    certificate: ''
  });
  const [connectionStatus, setConnectionStatus] = useState({
    rest: 'disconnected',
    saml: 'disconnected'
  });
  const [isTesting, setIsTesting] = useState(false);

  const integrationManager = new HRITIntegrationManager();

  const handleTestRESTConnection = async () => {
    setIsTesting(true);
    try {
      integrationManager.initializeREST(restConfig);
      await integrationManager.syncUsers();
      setConnectionStatus({ ...connectionStatus, rest: 'connected' });
      toast.success('REST connection successful!');
    } catch (error) {
      setConnectionStatus({ ...connectionStatus, rest: 'error' });
      toast.error(`Connection failed: ${error.message}`);
    } finally {
      setIsTesting(false);
    }
  };

  const handleTestSAMLConnection = async () => {
    setIsTesting(true);
    try {
      integrationManager.initializeSAML(samlConfig);
      const authRequest = await integrationManager.handleSAMLAuth();
      setConnectionStatus({ ...connectionStatus, saml: 'connected' });
      toast.success('SAML configuration valid!');
    } catch (error) {
      setConnectionStatus({ ...connectionStatus, saml: 'error' });
      toast.error(`SAML configuration error: ${error.message}`);
    } finally {
      setIsTesting(false);
    }
  };

  const handleSyncUsers = async () => {
    if (!restConfig.enabled) {
      toast.error('Please enable and configure REST integration first');
      return;
    }

    setIsTesting(true);
    try {
      integrationManager.initializeREST(restConfig);
      const result = await integrationManager.syncUsers();
      toast.success(`Successfully synced ${result.users?.length || 0} users`);
    } catch (error) {
      toast.error(`Sync failed: ${error.message}`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">HR/IT System Integration</h1>
        <p className="text-gray-600">
          Configure integration with Ipswich Borough Council HR and IT systems
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rest">REST API</TabsTrigger>
          <TabsTrigger value="saml">SAML SSO</TabsTrigger>
        </TabsList>

        {/* REST API Configuration */}
        <TabsContent value="rest" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="h-5 w-5" />
                    REST API Configuration
                  </CardTitle>
                  <CardDescription>
                    Connect to HR/IT systems using REST API
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={restConfig.enabled}
                    onCheckedChange={(checked) => 
                      setRestConfig({ ...restConfig, enabled: checked })
                    }
                  />
                  <Badge 
                    variant={connectionStatus.rest === 'connected' ? 'default' : 'secondary'}
                    className="flex items-center gap-1"
                  >
                    {connectionStatus.rest === 'connected' ? (
                      <>
                        <CheckCircle className="h-3 w-3" />
                        Connected
                      </>
                    ) : connectionStatus.rest === 'error' ? (
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
                <Label htmlFor="restBaseUrl">Base URL</Label>
                <Input
                  id="restBaseUrl"
                  placeholder="https://api.hr.ibc.gov.uk"
                  value={restConfig.baseUrl}
                  onChange={(e) => setRestConfig({ ...restConfig, baseUrl: e.target.value })}
                  disabled={!restConfig.enabled}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="restApiKey">API Key</Label>
                <Input
                  id="restApiKey"
                  type="password"
                  placeholder="Enter API key"
                  value={restConfig.apiKey}
                  onChange={(e) => setRestConfig({ ...restConfig, apiKey: e.target.value })}
                  disabled={!restConfig.enabled}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="restTimeout">Timeout (ms)</Label>
                <Input
                  id="restTimeout"
                  type="number"
                  value={restConfig.timeout}
                  onChange={(e) => setRestConfig({ ...restConfig, timeout: parseInt(e.target.value) })}
                  disabled={!restConfig.enabled}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleTestRESTConnection}
                  disabled={!restConfig.enabled || isTesting}
                  variant="outline"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isTesting ? 'animate-spin' : ''}`} />
                  Test Connection
                </Button>
                <Button
                  onClick={handleSyncUsers}
                  disabled={!restConfig.enabled || connectionStatus.rest !== 'connected' || isTesting}
                  variant="default"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Sync Users
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SAML Configuration */}
        <TabsContent value="saml" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    SAML SSO Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure Single Sign-On with HR/IT systems using SAML 2.0
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={samlConfig.enabled}
                    onCheckedChange={(checked) => 
                      setSamlConfig({ ...samlConfig, enabled: checked })
                    }
                  />
                  <Badge 
                    variant={connectionStatus.saml === 'connected' ? 'default' : 'secondary'}
                    className="flex items-center gap-1"
                  >
                    {connectionStatus.saml === 'connected' ? (
                      <>
                        <CheckCircle className="h-3 w-3" />
                        Configured
                      </>
                    ) : connectionStatus.saml === 'error' ? (
                      <>
                        <XCircle className="h-3 w-3" />
                        Error
                      </>
                    ) : (
                      'Not Configured'
                    )}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="samlIssuer">Issuer</Label>
                <Input
                  id="samlIssuer"
                  placeholder="athena-lms"
                  value={samlConfig.issuer}
                  onChange={(e) => setSamlConfig({ ...samlConfig, issuer: e.target.value })}
                  disabled={!samlConfig.enabled}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="samlEntityId">Entity ID</Label>
                <Input
                  id="samlEntityId"
                  placeholder="https://sso.ibc.gov.uk"
                  value={samlConfig.entityId}
                  onChange={(e) => setSamlConfig({ ...samlConfig, entityId: e.target.value })}
                  disabled={!samlConfig.enabled}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="samlSsoUrl">SSO URL</Label>
                <Input
                  id="samlSsoUrl"
                  placeholder="https://sso.ibc.gov.uk/saml/sso"
                  value={samlConfig.ssoUrl}
                  onChange={(e) => setSamlConfig({ ...samlConfig, ssoUrl: e.target.value })}
                  disabled={!samlConfig.enabled}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="samlCallbackUrl">Callback URL</Label>
                <Input
                  id="samlCallbackUrl"
                  placeholder="https://lms.ibc.gov.uk/auth/saml/callback"
                  value={samlConfig.callbackUrl}
                  onChange={(e) => setSamlConfig({ ...samlConfig, callbackUrl: e.target.value })}
                  disabled={!samlConfig.enabled}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="samlCertificate">Certificate (PEM format)</Label>
                <textarea
                  id="samlCertificate"
                  className="w-full min-h-[120px] p-2 border rounded-md"
                  placeholder="-----BEGIN CERTIFICATE-----..."
                  value={samlConfig.certificate}
                  onChange={(e) => setSamlConfig({ ...samlConfig, certificate: e.target.value })}
                  disabled={!samlConfig.enabled}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleTestSAMLConnection}
                  disabled={!samlConfig.enabled || isTesting}
                  variant="outline"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isTesting ? 'animate-spin' : ''}`} />
                  Validate Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRITIntegrationSettings;

