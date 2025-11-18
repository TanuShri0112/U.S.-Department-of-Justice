import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SimulationLab = () => (
  <div className="max-w-5xl mx-auto space-y-6 p-6 animate-fade-in">
    <div>
      <h1 className="text-2xl font-semibold">Virtual Lab / Simulation</h1>
      <p className="text-gray-500 text-sm">
        Placeholder screen to demonstrate simulation container requested in the tender.
      </p>
    </div>

    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Simulation Container</CardTitle>
        <Badge variant="outline">H5P-style Embed Placeholder</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video w-full rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center text-gray-500">
          <p className="text-lg font-medium">Simulation Player Placeholder</p>
          <p className="text-sm">Embed SCORM/H5P content here (not part of prototype).</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Instructions</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
              <p>1. Review infection scenario briefing.</p>
              <p>2. Apply PPE sequence virtually.</p>
              <p>3. Identify compliance violations.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Result Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
              <p>Attempt #: 002</p>
              <p>Status: <span className="font-semibold text-green-600">Pass (92%)</span></p>
              <p>Remarks: Excellent adherence to PPE sequence.</p>
            </CardContent>
          </Card>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1">Retry Simulation</Button>
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Submit Attempt</Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default SimulationLab;

