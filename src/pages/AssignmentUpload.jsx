import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Paperclip } from 'lucide-react';

const AssignmentUpload = () => (
  <div className="max-w-3xl mx-auto space-y-6 p-6 animate-fade-in">
    <div>
      <h1 className="text-2xl font-semibold">Assignment Upload — Prototype</h1>
      <p className="text-gray-500 text-sm">
        Upload supporting evidence for “Basic Infection Prevention & Control” assignment.
      </p>
    </div>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Assignment Brief
          <Badge variant="outline">Due in 2 days</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-gray-600">
        <p>
          Describe the steps your facility takes to ensure proper sterilization of equipment. Attach SOPs or
          supporting photos. This demo records nothing; it merely showcases the UI.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Word / PDF / Image accepted (placeholder).</li>
          <li>Maximum size 25 MB.</li>
          <li>Evaluator will provide remarks within 48 hours.</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Submit Evidence</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Reflection Notes</label>
          <Textarea rows={4} placeholder="Describe your procedure..." />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Attach Files</label>
          <div className="border-2 border-dashed rounded-lg p-6 text-center text-sm text-gray-500">
            <Paperclip className="mx-auto h-6 w-6 mb-2 text-gray-400" />
            Drag & drop or use the button below (demo only)
            <div className="mt-3">
              <Input type="file" multiple className="cursor-pointer" />
            </div>
          </div>
        </div>
        <Button className="w-full bg-green-600 hover:bg-green-700">Mark Assignment as Submitted</Button>
      </CardContent>
    </Card>
  </div>
);

export default AssignmentUpload;

