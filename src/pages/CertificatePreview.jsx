import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CertificatePreview = () => (
  <div className="max-w-5xl mx-auto space-y-6 p-6 animate-fade-in">
    <div>
      <h1 className="text-2xl font-semibold">Certificate Preview</h1>
      <p className="text-gray-500 text-sm">Prototype UI for the tender requirement — static preview only.</p>
    </div>

    <Card>
      <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <CardTitle>Template Selection</CardTitle>
        <Select defaultValue="classic">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="classic">Classic Health Template</SelectItem>
            <SelectItem value="modern">Modern Minimal</SelectItem>
            <SelectItem value="bilingual">Bilingual (EN/HI)</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-white shadow-inner p-6 space-y-2">
          <p className="text-xs text-gray-500 text-right">Department of Health & Family Welfare</p>
          <h2 className="text-3xl font-serif text-center tracking-wide">Certificate of Completion</h2>
          <p className="text-center text-sm text-gray-600">This certifies that</p>
          <div className="text-center text-2xl font-semibold text-gray-900">Aditi Sharma</div>
          <p className="text-center text-gray-600">has successfully completed</p>
          <div className="text-center text-lg font-medium text-blue-700">
            Basic Infection Prevention & Control
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">On 23 January 2026</p>
          <div className="flex justify-between text-xs text-gray-500 mt-6">
            <span>Director, Training</span>
            <span>Seal</span>
            <span>Registrar</span>
          </div>
        </div>
        <div className="space-y-3">
          <Badge variant="outline">Preview • Read-only</Badge>
          <p className="text-sm text-gray-600">
            All certificate data is pulled from the learner profile. This UI is a placeholder showing how the
            admin can preview templates before download.
          </p>
          <Button className="w-full bg-blue-600 hover:bg-blue-700">Download PDF</Button>
          <Button variant="outline" className="w-full">Send via Email</Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default CertificatePreview;

