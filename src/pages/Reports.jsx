import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Download, 
  FileSpreadsheet, 
  FileText, 
  TrendingUp, 
  Users, 
  Clock, 
  Target,
  BarChart3,
  PieChart,
  LineChart,
  MapPin
} from 'lucide-react';
import { 
  PieChart as RechartsPieChart, 
  Pie,
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  ComposedChart
} from 'recharts';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Mock data for the reports
const mockData = {
  enrollmentByRegion: [
    { name: 'North', value: 450, color: '#8884d8' },
    { name: 'South', value: 320, color: '#82ca9d' },
    { name: 'East', value: 280, color: '#ffc658' },
    { name: 'West', value: 380, color: '#ff7c7c' },
    { name: 'Central', value: 220, color: '#8dd1e1' }
  ],
  completionRateOverTime: [
    { month: 'Jan', rate: 65 },
    { month: 'Feb', rate: 72 },
    { month: 'Mar', rate: 68 },
    { month: 'Apr', rate: 75 },
    { month: 'May', rate: 78 },
    { month: 'Jun', rate: 82 },
    { month: 'Jul', rate: 79 },
    { month: 'Aug', rate: 85 },
    { month: 'Sep', rate: 88 },
    { month: 'Oct', rate: 91 },
    { month: 'Nov', rate: 87 },
    { month: 'Dec', rate: 93 }
  ],
  communityHoursLogged: [
    { month: 'Jan', hours: 240 },
    { month: 'Feb', hours: 320 },
    { month: 'Mar', hours: 280 },
    { month: 'Apr', hours: 380 },
    { month: 'May', hours: 420 },
    { month: 'Jun', hours: 350 },
    { month: 'Jul', hours: 410 },
    { month: 'Aug', hours: 390 },
    { month: 'Sep', hours: 450 },
    { month: 'Oct', hours: 480 },
    { month: 'Nov', hours: 440 },
    { month: 'Dec', hours: 520 }
  ],
  impactMetrics: [
    { month: 'Jan', campaigns: 12, surveys: 8 },
    { month: 'Feb', campaigns: 15, surveys: 10 },
    { month: 'Mar', campaigns: 18, surveys: 12 },
    { month: 'Apr', campaigns: 22, surveys: 15 },
    { month: 'May', campaigns: 25, surveys: 18 },
    { month: 'Jun', campaigns: 28, surveys: 20 },
    { month: 'Jul', campaigns: 30, surveys: 22 },
    { month: 'Aug', campaigns: 32, surveys: 25 },
    { month: 'Sep', campaigns: 35, surveys: 28 },
    { month: 'Oct', campaigns: 38, surveys: 30 },
    { month: 'Nov', campaigns: 40, surveys: 32 },
    { month: 'Dec', campaigns: 42, surveys: 35 }
  ],
  reportsTable: [
    { year: 2024, region: 'North', enrollments: 450, completions: 405, outreachHours: 2400, campaigns: 42, surveys: 35 },
    { year: 2024, region: 'South', enrollments: 320, completions: 288, outreachHours: 1800, campaigns: 38, surveys: 30 },
    { year: 2024, region: 'East', enrollments: 280, completions: 252, outreachHours: 1600, campaigns: 35, surveys: 28 },
    { year: 2024, region: 'West', enrollments: 380, completions: 342, outreachHours: 2200, campaigns: 40, surveys: 32 },
    { year: 2024, region: 'Central', enrollments: 220, completions: 198, outreachHours: 1200, campaigns: 32, surveys: 25 },
    { year: 2023, region: 'North', enrollments: 420, completions: 378, outreachHours: 2200, campaigns: 38, surveys: 30 },
    { year: 2023, region: 'South', enrollments: 300, completions: 270, outreachHours: 1600, campaigns: 35, surveys: 28 },
    { year: 2023, region: 'East', enrollments: 260, completions: 234, outreachHours: 1400, campaigns: 32, surveys: 25 },
    { year: 2023, region: 'West', enrollments: 350, completions: 315, outreachHours: 2000, campaigns: 38, surveys: 30 },
    { year: 2023, region: 'Central', enrollments: 200, completions: 180, outreachHours: 1100, campaigns: 28, surveys: 22 }
  ]
};

// StatCard Component for KPI cards
const StatCard = ({ title, value, icon: Icon, trend, color = "blue" }) => (
  <Card className="hover:shadow-lg transition-shadow duration-200">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">{trend}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </CardContent>
  </Card>
);

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const Reports = () => {
  const [loading, setLoading] = useState(false);
  const [timeFilter, setTimeFilter] = useState('2024');
  const [regionFilter, setRegionFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate KPIs from mock data
  const kpis = useMemo(() => {
    const currentYearData = mockData.reportsTable.filter(item => item.year.toString() === timeFilter);
    const totalEnrollments = currentYearData.reduce((sum, item) => sum + item.enrollments, 0);
    const totalCompletions = currentYearData.reduce((sum, item) => sum + item.completions, 0);
    const totalOutreachHours = currentYearData.reduce((sum, item) => sum + item.outreachHours, 0);
    const totalCampaigns = currentYearData.reduce((sum, item) => sum + item.campaigns, 0);
    const totalSurveys = currentYearData.reduce((sum, item) => sum + item.surveys, 0);
    
    const completionRate = totalEnrollments > 0 ? Math.round((totalCompletions / totalEnrollments) * 100) : 0;
    const impactMetrics = totalCampaigns + totalSurveys;

    return {
      totalEnrollments,
      completionRate,
      totalOutreachHours,
      impactMetrics
    };
  }, [timeFilter]);

  // Filter table data
  const filteredTableData = useMemo(() => {
    let filtered = mockData.reportsTable.filter(item => item.year.toString() === timeFilter);
    
    if (regionFilter !== 'all') {
      filtered = filtered.filter(item => item.region.toLowerCase() === regionFilter.toLowerCase());
    }
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.region.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [timeFilter, regionFilter, searchTerm]);

  // Export to Excel
  const exportToExcel = () => {
    try {
      setLoading(true);
      
      const worksheet = XLSX.utils.json_to_sheet(filteredTableData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Reports');
      
      // Add summary sheet
      const summaryData = [
        ['Metric', 'Value'],
        ['Total Enrollments', kpis.totalEnrollments],
        ['Completion Rate', `${kpis.completionRate}%`],
        ['Total Outreach Hours', kpis.totalOutreachHours],
        ['Impact Metrics', kpis.impactMetrics]
      ];
      const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');
      
      XLSX.writeFile(workbook, `reports_${timeFilter}_${new Date().toISOString().split('T')[0]}.xlsx`);
      
      setTimeout(() => setLoading(false), 500);
    } catch (error) {
      console.error('Excel Export Error:', error);
      alert('Error exporting Excel file. Please try again.');
      setLoading(false);
    }
  };

  // Export to PDF
  const exportToPDF = () => {
    try {
      setLoading(true);
      
      const doc = new jsPDF();
      
      // Title
      doc.setFontSize(20);
      doc.text('Data & Reporting Summary', 20, 30);
      
      // Summary section
      doc.setFontSize(12);
      doc.text(`Report Period: ${timeFilter}`, 20, 50);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 60);
      
      // KPIs
      doc.setFontSize(16);
      doc.text('Key Performance Indicators', 20, 80);
      doc.setFontSize(12);
      doc.text(`Total Enrollments: ${kpis.totalEnrollments.toLocaleString()}`, 20, 95);
      doc.text(`Completion Rate: ${kpis.completionRate}%`, 20, 105);
      doc.text(`Total Outreach Hours: ${kpis.totalOutreachHours.toLocaleString()}`, 20, 115);
      doc.text(`Impact Metrics: ${kpis.impactMetrics}`, 20, 125);
      
      // Simple table without autoTable
      doc.setFontSize(14);
      doc.text('Detailed Reports', 20, 145);
      
      // Table headers
      doc.setFontSize(10);
      const startY = 155;
      const colWidths = [15, 25, 25, 25, 30, 20, 20];
      const headers = ['Year', 'Region', 'Enrollments', 'Completions', 'Hours', 'Campaigns', 'Surveys'];
      
      // Draw headers
      let currentX = 20;
      headers.forEach((header, index) => {
        doc.text(header, currentX, startY);
        currentX += colWidths[index];
      });
      
      // Draw data rows
      let currentY = startY + 10;
      filteredTableData.slice(0, 15).forEach(row => {
        currentX = 20;
        const rowData = [
          row.year.toString(),
          row.region,
          row.enrollments.toString(),
          row.completions.toString(),
          row.outreachHours.toString(),
          row.campaigns.toString(),
          row.surveys.toString()
        ];
        
        rowData.forEach((data, index) => {
          doc.text(data, currentX, currentY);
          currentX += colWidths[index];
        });
        currentY += 8;
      });
      
      // Footer
      doc.setFontSize(8);
      doc.text('Generated by ECPAT International Training System', 20, doc.internal.pageSize.height - 20);
      
      doc.save(`reports_${timeFilter}_${new Date().toISOString().split('T')[0]}.pdf`);
      
      setTimeout(() => setLoading(false), 500);
    } catch (error) {
      console.error('PDF Export Error:', error);
      setLoading(false);
      
      // Fallback: Create a simple text-based PDF
      try {
        const fallbackDoc = new jsPDF();
        fallbackDoc.setFontSize(20);
        fallbackDoc.text('Data & Reporting Summary', 20, 30);
        fallbackDoc.setFontSize(12);
        fallbackDoc.text(`Report Period: ${timeFilter}`, 20, 50);
        fallbackDoc.text(`Total Enrollments: ${kpis.totalEnrollments}`, 20, 70);
        fallbackDoc.text(`Completion Rate: ${kpis.completionRate}%`, 20, 85);
        fallbackDoc.text(`Total Outreach Hours: ${kpis.totalOutreachHours}`, 20, 100);
        fallbackDoc.text(`Impact Metrics: ${kpis.impactMetrics}`, 20, 115);
        fallbackDoc.text('Generated by ECPAT International', 20, 150);
        fallbackDoc.save(`reports_simple_${timeFilter}.pdf`);
      } catch (fallbackError) {
        console.error('Fallback PDF Error:', fallbackError);
        alert('PDF export failed. Please try again later.');
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 Data & Reporting</h1>
          <p className="text-gray-600">Track enrollments, completions, outreach, and impact metrics.</p>
        </div>
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 Data & Reporting</h1>
        <p className="text-gray-600">Track enrollments, completions, outreach, and impact metrics.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Enrollment by Region"
          value={kpis.totalEnrollments.toLocaleString()}
          icon={Users}
          trend="+12% vs last year"
          color="blue"
        />
        <StatCard
          title="Completion Rate"
          value={`${kpis.completionRate}%`}
          icon={Target}
          trend="+5% vs last year"
          color="green"
        />
        <StatCard
          title="Community Outreach Hours"
          value={kpis.totalOutreachHours.toLocaleString()}
          icon={Clock}
          trend="+18% vs last year"
          color="purple"
        />
        <StatCard
          title="Impact Metrics"
          value={kpis.impactMetrics}
          icon={BarChart3}
          trend="+22% vs last year"
          color="orange"
        />
      </div>

      {/* Charts Section */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="enrollment" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="enrollment" className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                Enrollment
              </TabsTrigger>
              <TabsTrigger value="completion" className="flex items-center gap-2">
                <LineChart className="h-4 w-4" />
                Completion
              </TabsTrigger>
              <TabsTrigger value="outreach" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Outreach
              </TabsTrigger>
              <TabsTrigger value="impact" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Impact
              </TabsTrigger>
              </TabsList>

            <TabsContent value="enrollment" className="space-y-4">
              <h3 className="text-lg font-semibold">Enrollment by Region</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={mockData.enrollmentByRegion}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {mockData.enrollmentByRegion.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
                    </div>
                </TabsContent>

            <TabsContent value="completion" className="space-y-4">
              <h3 className="text-lg font-semibold">Completion Rate Over Time</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={mockData.completionRateOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="rate" stroke="#8884d8" strokeWidth={2} name="Completion Rate %" />
                  </RechartsLineChart>
                </ResponsiveContainer>
                  </div>
                </TabsContent>

            <TabsContent value="outreach" className="space-y-4">
              <h3 className="text-lg font-semibold">Community Hours Logged</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockData.communityHoursLogged}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#82ca9d" name="Hours Logged" />
                  </BarChart>
                </ResponsiveContainer>
                  </div>
                </TabsContent>

            <TabsContent value="impact" className="space-y-4">
              <h3 className="text-lg font-semibold">Impact Metrics (Campaigns vs Surveys)</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={mockData.impactMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="campaigns" fill="#8884d8" name="Campaigns" />
                    <Bar dataKey="surveys" fill="#82ca9d" name="Surveys" />
                  </ComposedChart>
                </ResponsiveContainer>
                  </div>
                </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Reports Table Section */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Detailed Reports</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="north">North</SelectItem>
                  <SelectItem value="south">South</SelectItem>
                  <SelectItem value="east">East</SelectItem>
                  <SelectItem value="west">West</SelectItem>
                  <SelectItem value="central">Central</SelectItem>
                </SelectContent>
              </Select>
              
              <Input
                placeholder="Search regions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48"
              />
              
              <div className="flex gap-2">
                <Button onClick={exportToExcel} variant="outline" size="sm" className="flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4" />
                  Excel
                </Button>
                <Button onClick={exportToPDF} variant="outline" size="sm" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  PDF
                </Button>
              </div>
            </div>
              </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Year</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Enrollments</TableHead>
                  <TableHead>Completions</TableHead>
                  <TableHead>Outreach Hours</TableHead>
                  <TableHead>Campaigns</TableHead>
                  <TableHead>Surveys</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTableData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{row.year}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        {row.region}
          </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{row.enrollments.toLocaleString()}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{row.completions.toLocaleString()}</Badge>
                    </TableCell>
                    <TableCell>{row.outreachHours.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-800">{row.campaigns}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">{row.surveys}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
      </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;