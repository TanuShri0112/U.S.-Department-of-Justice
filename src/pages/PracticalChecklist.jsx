import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

const ITEMS = [
  { id: 'pc1', label: 'Demonstrates hand hygiene correctly', weight: '20%' },
  { id: 'pc2', label: 'Wears PPE in correct sequence', weight: '20%' },
  { id: 'pc3', label: 'Disposes biomedical waste safely', weight: '20%' },
  { id: 'pc4', label: 'Communicates protocol to team', weight: '20%' },
  { id: 'pc5', label: 'Documents process in MIS', weight: '20%' },
];

const PracticalChecklist = () => {
  const [checked, setChecked] = useState({});

  const toggle = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const completed = Object.values(checked).filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold">Practical Checklist — Evaluator View</h1>
        <p className="text-gray-500 text-sm">
          Prototype UI for Department of Health & Family Welfare evaluators.
        </p>
      </div>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Checklist Items</CardTitle>
          <Badge variant="outline">
            {completed} / {ITEMS.length} completed
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          {ITEMS.map((item) => (
            <label key={item.id} className="flex items-center gap-3 border rounded-lg p-3">
              <Checkbox checked={!!checked[item.id]} onCheckedChange={() => toggle(item.id)} />
              <div className="flex flex-col gap-1">
                <span className="font-medium text-gray-900">{item.label}</span>
                <span className="text-xs text-gray-500">Weightage: {item.weight}</span>
              </div>
            </label>
          ))}
          <Button className="w-full bg-purple-600 hover:bg-purple-700">Save Evaluation</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PracticalChecklist;

