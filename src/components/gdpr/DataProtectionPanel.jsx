import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  FileText, 
  Download, 
  Search,
  Calendar,
  User,
  Activity
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';

export const DataProtectionPanel = () => {
  const { currentLanguage } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock audit log data
  const auditLogs = [
    {
      id: 1,
      timestamp: '2025-01-15 10:30:00',
      user: 'admin@kreis-wesel.de',
      action: 'Benutzer erstellt',
      resource: 'User: Max Mustermann',
      ipAddress: '192.168.1.100',
      status: 'success'
    },
    {
      id: 2,
      timestamp: '2025-01-15 09:15:00',
      user: 'trainer@kreis-wesel.de',
      action: 'Kurs bearbeitet',
      resource: 'Course: Datenschutz & IT-Sicherheit',
      ipAddress: '192.168.1.105',
      status: 'success'
    },
    {
      id: 3,
      timestamp: '2025-01-14 16:45:00',
      user: 'admin@kreis-wesel.de',
      action: 'Daten exportiert',
      resource: 'Report: Team Statistics',
      ipAddress: '192.168.1.100',
      status: 'success'
    },
    {
      id: 4,
      timestamp: '2025-01-14 14:20:00',
      user: 'supervisor@kreis-wesel.de',
      action: 'Zugriff verweigert',
      resource: 'Admin Panel',
      ipAddress: '192.168.1.110',
      status: 'denied'
    }
  ];

  const dataProcessingActivities = [
    {
      id: 1,
      purpose: 'Benutzerverwaltung',
      legalBasis: 'Art. 6 Abs. 1 lit. b DSGVO',
      dataCategories: 'Name, E-Mail, Abteilung',
      retentionPeriod: '5 Jahre nach Beendigung des Arbeitsverhältnisses'
    },
    {
      id: 2,
      purpose: 'Schulungsfortschritt',
      legalBasis: 'Art. 6 Abs. 1 lit. b DSGVO',
      dataCategories: 'Kursfortschritt, Bewertungen, Zertifikate',
      retentionPeriod: '3 Jahre nach Kursabschluss'
    },
    {
      id: 3,
      purpose: 'Systemanalyse',
      legalBasis: 'Art. 6 Abs. 1 lit. f DSGVO',
      dataCategories: 'Nutzungsstatistiken, Log-Dateien',
      retentionPeriod: '1 Jahr'
    }
  ];

  const filteredLogs = auditLogs.filter(log => 
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.resource.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const texts = {
    de: {
      title: 'Datenschutzbericht',
      auditLogs: 'Prüfprotokolle',
      dataProcessing: 'Datenverarbeitungsaktivitäten',
      privacyNotice: 'Datenschutzhinweis',
      timestamp: 'Zeitstempel',
      user: 'Benutzer',
      action: 'Aktion',
      resource: 'Ressource',
      ipAddress: 'IP-Adresse',
      status: 'Status',
      purpose: 'Zweck',
      legalBasis: 'Rechtsgrundlage',
      dataCategories: 'Datenkategorien',
      retentionPeriod: 'Aufbewahrungsfrist',
      export: 'Exportieren',
      search: 'Suchen...',
      success: 'Erfolg',
      denied: 'Verweigert'
    },
    en: {
      title: 'Data Protection Report',
      auditLogs: 'Audit Logs',
      dataProcessing: 'Data Processing Activities',
      privacyNotice: 'Privacy Notice',
      timestamp: 'Timestamp',
      user: 'User',
      action: 'Action',
      resource: 'Resource',
      ipAddress: 'IP Address',
      status: 'Status',
      purpose: 'Purpose',
      legalBasis: 'Legal Basis',
      dataCategories: 'Data Categories',
      retentionPeriod: 'Retention Period',
      export: 'Export',
      search: 'Search...',
      success: 'Success',
      denied: 'Denied'
    },
    es: {
      title: 'Informe de Protección de Datos',
      auditLogs: 'Registros de Auditoría',
      dataProcessing: 'Actividades de Procesamiento de Datos',
      privacyNotice: 'Aviso de Privacidad',
      timestamp: 'Marca de Tiempo',
      user: 'Usuario',
      action: 'Acción',
      resource: 'Recurso',
      ipAddress: 'Dirección IP',
      status: 'Estado',
      purpose: 'Propósito',
      legalBasis: 'Base Legal',
      dataCategories: 'Categorías de Datos',
      retentionPeriod: 'Período de Retención',
      export: 'Exportar',
      search: 'Buscar...',
      success: 'Éxito',
      denied: 'Denegado'
    }
  };

  const t = texts[currentLanguage] || texts.de;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="h-8 w-8" />
            {t.title}
          </h1>
          <p className="text-gray-600 mt-1">
            {currentLanguage === 'de' 
              ? 'DSGVO-konforme Datenschutzverwaltung und Prüfprotokolle' 
              : 'GDPR-compliant data protection management and audit logs'}
          </p>
        </div>
      </div>

      <Tabs defaultValue="audit-logs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="audit-logs">
            {t.auditLogs}
          </TabsTrigger>
          <TabsTrigger value="data-processing">
            {t.dataProcessing}
          </TabsTrigger>
          <TabsTrigger value="privacy-notice">
            {t.privacyNotice}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="audit-logs" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  {t.auditLogs}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder={t.search}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    {t.export}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.timestamp}</TableHead>
                    <TableHead>{t.user}</TableHead>
                    <TableHead>{t.action}</TableHead>
                    <TableHead>{t.resource}</TableHead>
                    <TableHead>{t.ipAddress}</TableHead>
                    <TableHead>{t.status}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.resource}</TableCell>
                      <TableCell>{log.ipAddress}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={log.status === 'success' ? 'default' : 'destructive'}
                        >
                          {log.status === 'success' ? t.success : t.denied}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data-processing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {t.dataProcessing}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.purpose}</TableHead>
                    <TableHead>{t.legalBasis}</TableHead>
                    <TableHead>{t.dataCategories}</TableHead>
                    <TableHead>{t.retentionPeriod}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataProcessingActivities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell className="font-medium">{activity.purpose}</TableCell>
                      <TableCell>{activity.legalBasis}</TableCell>
                      <TableCell>{activity.dataCategories}</TableCell>
                      <TableCell>{activity.retentionPeriod}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy-notice" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {t.privacyNotice}
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              {currentLanguage === 'de' ? (
                <div className="space-y-4">
                  <h3>Datenschutzerklärung für Kreis Wesel – Lernportal</h3>
                  <p>
                    Der Schutz Ihrer persönlichen Daten ist uns wichtig. Diese Datenschutzerklärung 
                    informiert Sie über die Art, den Umfang und Zweck der Verarbeitung von 
                    personenbezogenen Daten in unserem Lernportal.
                  </p>
                  <h4>1. Verantwortlicher</h4>
                  <p>
                    Verantwortlich für die Datenverarbeitung ist der Kreis Wesel. 
                    Kontaktdaten finden Sie auf unserer Website.
                  </p>
                  <h4>2. Rechtsgrundlage</h4>
                  <p>
                    Die Verarbeitung Ihrer Daten erfolgt auf Grundlage der DSGVO, 
                    insbesondere Art. 6 Abs. 1 lit. b (Vertragserfüllung) und lit. f (berechtigtes Interesse).
                  </p>
                  <h4>3. Ihre Rechte</h4>
                  <p>
                    Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der 
                    Verarbeitung, Datenübertragbarkeit und Widerspruch gegen die Verarbeitung.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3>Privacy Notice for Kreis Wesel – Lernportal</h3>
                  <p>
                    The protection of your personal data is important to us. This privacy notice 
                    informs you about the type, scope and purpose of the processing of personal 
                    data in our learning portal.
                  </p>
                  <h4>1. Data Controller</h4>
                  <p>
                    Kreis Wesel is responsible for data processing. Contact details can be found on our website.
                  </p>
                  <h4>2. Legal Basis</h4>
                  <p>
                    Your data is processed on the basis of GDPR, in particular Art. 6 para. 1 lit. b 
                    (contract fulfillment) and lit. f (legitimate interest).
                  </p>
                  <h4>3. Your Rights</h4>
                  <p>
                    You have the right to information, correction, deletion, restriction of processing, 
                    data portability and objection to processing.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataProtectionPanel;

