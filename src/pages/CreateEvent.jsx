import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Webinar');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState(50);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({ title: 'Event created', description: `${title} on ${date} at ${location}` });
    navigate('/events');
  };

  const preview = useMemo(() => ({ title, date, location, type, description, capacity }), [title, date, location, type, description, capacity]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Create Event</h1>
        <Button type="button" variant="outline" onClick={() => navigate('/events')}>Cancel</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg border">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Webinar">Webinar</SelectItem>
                  <SelectItem value="Outreach">Outreach</SelectItem>
                  <SelectItem value="Meeting">Meeting</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Capacity</label>
              <Input type="number" min={1} value={capacity} onChange={(e) => setCapacity(parseInt(e.target.value || '1', 10))} required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add agenda, speakers, access details..." />
          </div>
          <div className="flex gap-2">
            <Button type="submit">Save</Button>
            <Button type="button" variant="outline" onClick={() => navigate('/events')}>Discard</Button>
          </div>
        </form>

        <Card className="p-4 bg-gradient-to-br from-gray-50 to-white border-gray-200">
          <h2 className="font-medium mb-2">Live preview</h2>
          <div className="space-y-1">
            <div className="text-lg font-semibold">{preview.title || 'Untitled Event'}</div>
            <div className="text-sm text-gray-600">{preview.date || 'Date TBD'} • {preview.type}</div>
            <div className="text-sm text-gray-600">{preview.location || 'Location TBD'}</div>
          </div>
          {preview.description && (
            <p className="text-sm text-gray-700 mt-3 whitespace-pre-wrap">{preview.description}</p>
          )}
          <div className="text-xs text-gray-500 mt-4">Capacity: {preview.capacity}</div>
        </Card>
      </div>
    </div>
  );
};

export default CreateEvent;


