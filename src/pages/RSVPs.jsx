import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const RSVPs = () => {
  const { toast } = useToast();
  const [list, setList] = useState([
    { id: 1, name: 'Alex Johnson', status: 'Going' },
    { id: 2, name: 'Priya Singh', status: 'Interested' },
    { id: 3, name: 'Lee Chen', status: 'Not Going' },
  ]);

  const toggleStatus = (id) => {
    setList((prev) => prev.map((r) => r.id === id ? { ...r, status: r.status === 'Going' ? 'Interested' : 'Going' } : r));
    toast({ title: 'RSVP updated', description: `Updated attendee #${id}` });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">RSVPs</h1>
      <div className="bg-white border rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((r) => (
              <tr key={r.id} className="border-b last:border-0">
                <td className="p-3">{r.name}</td>
                <td className="p-3 text-sm text-gray-600">{r.status}</td>
                <td className="p-3">
                  <Button size="sm" variant="outline" onClick={() => toggleStatus(r.id)}>Toggle</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RSVPs;


