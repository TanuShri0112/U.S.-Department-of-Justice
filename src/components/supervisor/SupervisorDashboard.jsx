import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Users, 
  BookOpen, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Download,
  TrendingUp,
  Calendar,
  FileText,
  BarChart3
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations/translations';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const SupervisorDashboard = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage] || translations.de;
  
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Mock data for team monitoring
  const teamData = [
    {
      id: 1,
      name: 'Max Mustermann',
      department: 'IT',
      coursesAssigned: 3,
      coursesCompleted: 2,
      completionRate: 67,
      upcomingRenewals: ['Datenschutz & IT-Sicherheit - 15.03.2025'],
      status: 'on-track'
    },
    {
      id: 2,
      name: 'Anna Schmidt',
      department: 'HR',
      coursesAssigned: 4,
      coursesCompleted: 4,
      completionRate: 100,
      upcomingRenewals: [],
      status: 'complete'
    },
    {
      id: 3,
      name: 'Peter Weber',
      department: 'IT',
      coursesAssigned: 3,
      coursesCompleted: 1,
      completionRate: 33,
      upcomingRenewals: ['Datenschutz & IT-Sicherheit - 20.03.2025'],
      status: 'at-risk'
    },
    {
      id: 4,
      name: 'Maria Fischer',
      department: 'Finance',
      coursesAssigned: 2,
      coursesCompleted: 0,
      completionRate: 0,
      upcomingRenewals: [],
      status: 'overdue'
    }
  ];

  const departmentStats = [
    { name: 'IT', total: 12, completed: 8, inProgress: 3, overdue: 1 },
    { name: 'HR', total: 8, completed: 7, inProgress: 1, overdue: 0 },
    { name: 'Finance', total: 10, completed: 5, inProgress: 2, overdue: 3 }
  ];

  const mandatoryTrainingGaps = [
    { course: 'Datenschutz & IT-Sicherheit', required: 15, completed: 12, gap: 3 },
    { course: 'Arbeitsschutz', required: 20, completed: 18, gap: 2 },
    { course: 'Compliance-Schulung', required: 10, completed: 8, gap: 2 }
  ];

  const chartData = departmentStats.map(dept => ({
    name: dept.name,
    Abgeschlossen: dept.completed,
    'In Bearbeitung': dept.inProgress,
    Überfällig: dept.overdue
  }));

  const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

  const handleExportReport = () => {
    // Export functionality
    console.log('Exporting team report...');
  };

  const getStatusBadge = (status) => {
    const badges = {
      'complete': <Badge className="bg-green-100 text-green-800">{currentLanguage === 'de' ? 'Abgeschlossen' : 'Complete'}</Badge>,
      'on-track': <Badge className="bg-blue-100 text-blue-800">{currentLanguage === 'de' ? 'Auf Kurs' : 'On Track'}</Badge>,
      'at-risk': <Badge className="bg-yellow-100 text-yellow-800">{currentLanguage === 'de' ? 'Gefährdet' : 'At Risk'}</Badge>,
      'overdue': <Badge className="bg-red-100 text-red-800">{currentLanguage === 'de' ? 'Überfällig' : 'Overdue'}</Badge>
    };
    return badges[status] || badges['on-track'];
  };

  const filteredTeam = selectedDepartment === 'all' 
    ? teamData 
    : teamData.filter(member => member.department === selectedDepartment);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {currentLanguage === 'de' ? 'Personalentwicklung' : 'Personnel Development'}
          </h1>
          <p className="text-gray-600 mt-1">
            {currentLanguage === 'de' 
              ? 'Überwachung und Verwaltung der Team-Schulungen' 
              : 'Monitor and manage team training'}
          </p>
        </div>
        <Button onClick={handleExportReport} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          {currentLanguage === 'de' ? 'Bericht herunterladen' : 'Download Report'}
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {currentLanguage === 'de' ? 'Team-Mitglieder' : 'Team Members'}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamData.length}</div>
            <p className="text-xs text-muted-foreground">
              {currentLanguage === 'de' ? 'Aktive Mitarbeiter' : 'Active employees'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {currentLanguage === 'de' ? 'Zugewiesene Kurse' : 'Assigned Courses'}
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamData.reduce((sum, member) => sum + member.coursesAssigned, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              {currentLanguage === 'de' ? 'Gesamt zugewiesen' : 'Total assigned'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {currentLanguage === 'de' ? 'Durchschnittliche Abschlussquote' : 'Avg Completion Rate'}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(teamData.reduce((sum, member) => sum + member.completionRate, 0) / teamData.length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {currentLanguage === 'de' ? 'Team-Durchschnitt' : 'Team average'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {currentLanguage === 'de' ? 'Anstehende Erneuerungen' : 'Upcoming Renewals'}
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamData.reduce((sum, member) => sum + member.upcomingRenewals.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              {currentLanguage === 'de' ? 'In den nächsten 30 Tagen' : 'Next 30 days'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="team-status" className="space-y-4">
        <TabsList>
          <TabsTrigger value="team-status">
            {currentLanguage === 'de' ? 'Team-Status' : 'Team Status'}
          </TabsTrigger>
          <TabsTrigger value="department">
            {currentLanguage === 'de' ? 'Abteilungsebene' : 'Department Level'}
          </TabsTrigger>
          <TabsTrigger value="gaps">
            {currentLanguage === 'de' ? 'Schulungslücken' : 'Training Gaps'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="team-status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {currentLanguage === 'de' ? 'Team-Kursstatus' : 'Team Course Status'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <select 
                  value={selectedDepartment} 
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">{currentLanguage === 'de' ? 'Alle Abteilungen' : 'All Departments'}</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">{currentLanguage === 'de' ? 'Finanzen' : 'Finance'}</option>
                </select>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{currentLanguage === 'de' ? 'Name' : 'Name'}</TableHead>
                    <TableHead>{currentLanguage === 'de' ? 'Abteilung' : 'Department'}</TableHead>
                    <TableHead>{currentLanguage === 'de' ? 'Zugewiesen' : 'Assigned'}</TableHead>
                    <TableHead>{currentLanguage === 'de' ? 'Abgeschlossen' : 'Completed'}</TableHead>
                    <TableHead>{currentLanguage === 'de' ? 'Abschlussquote' : 'Completion Rate'}</TableHead>
                    <TableHead>{currentLanguage === 'de' ? 'Status' : 'Status'}</TableHead>
                    <TableHead>{currentLanguage === 'de' ? 'Anstehende Erneuerungen' : 'Upcoming Renewals'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeam.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.department}</TableCell>
                      <TableCell>{member.coursesAssigned}</TableCell>
                      <TableCell>{member.coursesCompleted}</TableCell>
                      <TableCell>{member.completionRate}%</TableCell>
                      <TableCell>{getStatusBadge(member.status)}</TableCell>
                      <TableCell>
                        {member.upcomingRenewals.length > 0 ? (
                          <div className="space-y-1">
                            {member.upcomingRenewals.map((renewal, idx) => (
                              <div key={idx} className="text-xs text-orange-600">{renewal}</div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">
                            {currentLanguage === 'de' ? 'Keine' : 'None'}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="department" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                {currentLanguage === 'de' ? 'Abteilungsstatistiken' : 'Department Statistics'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Abgeschlossen" fill="#10B981" />
                  <Bar dataKey="In Bearbeitung" fill="#F59E0B" />
                  <Bar dataKey="Überfällig" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gaps" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                {currentLanguage === 'de' ? 'Lücken in Pflichtschulungen' : 'Gaps in Mandatory Training'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{currentLanguage === 'de' ? 'Kurs' : 'Course'}</TableHead>
                    <TableHead>{currentLanguage === 'de' ? 'Erforderlich' : 'Required'}</TableHead>
                    <TableHead>{currentLanguage === 'de' ? 'Abgeschlossen' : 'Completed'}</TableHead>
                    <TableHead>{currentLanguage === 'de' ? 'Lücke' : 'Gap'}</TableHead>
                    <TableHead>{currentLanguage === 'de' ? 'Aktion' : 'Action'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mandatoryTrainingGaps.map((gap, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{gap.course}</TableCell>
                      <TableCell>{gap.required}</TableCell>
                      <TableCell>{gap.completed}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">{gap.gap}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          {currentLanguage === 'de' ? 'Zuweisen' : 'Assign'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupervisorDashboard;

