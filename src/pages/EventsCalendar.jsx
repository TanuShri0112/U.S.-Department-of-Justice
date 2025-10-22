import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';

const EventsCalendar = () => {
  const { toast } = useToast();
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());

  const handleExport = () => {
    toast({ title: 'Exported', description: 'Calendar exported to ICS.' });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold">Events Calendar</h1>
        <div className="flex items-center gap-2">
          <Select value={view} onValueChange={setView}>
            <SelectTrigger className="w-36"><SelectValue placeholder="View" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setDate(new Date())} variant="outline">Today</Button>
          <Button onClick={handleExport} variant="outline">Export ICS</Button>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-4">
        <Calendar mode="single" selected={date} onSelect={setDate} className="mx-auto" />
        <div className="text-xs text-center text-gray-500 mt-2">View: {view}</div>
      </div>
    </div>
  );
};

export default EventsCalendar;


