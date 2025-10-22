import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { CalendarDays, PlusCircle, Ticket, Clock, MapPin, Share2, Trash2, Copy, CheckCircle2, Download, EyeOff } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const defaultEvents = [
  { id: 1, title: 'Cybercrime Awareness Webinar', date: '2025-11-05', time: '10:00', location: 'Online', type: 'Webinar', capacity: 200, attending: 142 },
  { id: 2, title: 'Community Outreach - Boston', date: '2025-11-12', time: '14:00', location: 'Boston, MA', type: 'Outreach', capacity: 80, attending: 63 },
  { id: 3, title: 'Policy Roundtable', date: '2025-12-02', time: '09:30', location: 'Washington, D.C.', type: 'Meeting', capacity: 25, attending: 18 },
];

const AdminEvents = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [events, setEvents] = useState(defaultEvents.map(e => ({ ...e, published: true })));
  const [recentAction, setRecentAction] = useState('');

  const filtered = useMemo(() => {
    return events.filter(e => 
      (typeFilter === 'all' || e.type === typeFilter) &&
      (query.trim() === '' || e.title.toLowerCase().includes(query.toLowerCase()) || e.location.toLowerCase().includes(query.toLowerCase()))
    );
  }, [events, query, typeFilter]);

  const handleCreate = () => {
    toast({ title: 'Create event', description: 'Open create form from main app or integrate here.' });
  };
  const handleCalendar = () => toast({ title: 'Calendar', description: 'Use the Calendar section for scheduling.' });
  const handleRsvps = () => toast({ title: 'RSVPs', description: 'Open RSVP management.' });
  const handleShare = (e) => toast({ title: 'Share link copied', description: `Link for "${e.title}" copied.` });
  const handleDelete = (id) => setEvents(prev => prev.filter(e => e.id !== id));
  const togglePublish = (id) => setEvents(prev => prev.map(e => e.id === id ? { ...e, published: !e.published } : e));
  const duplicate = (ev) => {
    const copy = { ...ev, id: Math.max(...events.map(e=>e.id))+1, title: ev.title + ' (Copy)' };
    setEvents(prev => [copy, ...prev]);
    setRecentAction('Duplicated');
    toast({ title: 'Event duplicated' });
  };
  const exportCsv = () => {
    const header = ['Title','Date','Time','Type','Location','Capacity','Attending','Published'];
    const rows = events.map(e => [e.title,e.date,e.time,e.type,e.location,e.capacity,e.attending,e.published?'Yes':'No']);
    const csv = [header.join(','), ...rows.map(r=>r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download='events.csv'; a.click(); URL.revokeObjectURL(url);
    toast({ title: t('csvExported') });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{t('eventsManagement')}</h2>
          <p className="text-sm text-gray-500">{t('createManageShareEvents')}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={exportCsv}><Download className="h-4 w-4 mr-2" /> {t('exportCSV')}</Button>
          <Button onClick={handleCreate} className="shadow-sm">
            <PlusCircle className="h-4 w-4 mr-2" /> {t('createEvent')}
          </Button>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        <div className="flex-1"><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('searchByTitleLocation')} /></div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full md:w-56"><SelectValue placeholder={t('filterByType')} /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('allTypes')}</SelectItem>
            <SelectItem value="Webinar">{t('webinar')}</SelectItem>
            <SelectItem value="Outreach">{t('outreach')}</SelectItem>
            <SelectItem value="Meeting">{t('meeting')}</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => { setQuery(''); setTypeFilter('all'); }}>{t('reset')}</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-white border-blue-100">
          <p className="text-xs text-blue-700/70">{t('upcomingThisMonth')}</p>
          <p className="text-2xl font-semibold text-blue-800">{events.length}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-50 to-white border-green-100">
          <p className="text-xs text-green-700/70">{t('totalRsvps')}</p>
          <p className="text-2xl font-semibold text-green-800">{events.reduce((a,b)=>a+b.attending,0)}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-amber-50 to-white border-amber-100">
          <p className="text-xs text-amber-700/70">{t('avgCapacityUsed')}</p>
          <p className="text-2xl font-semibold text-amber-800">{Math.round(events.reduce((a,b)=>a + (b.attending/b.capacity),0)/events.length*100)}%</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4 bg-white">
          <h3 className="font-medium mb-2">{t('calendar')}</h3>
          <p className="text-sm text-gray-600 mb-3">{t('viewUpcomingEventsMonthly')}</p>
          <Button variant="outline" onClick={handleCalendar}>
            <CalendarDays className="h-4 w-4 mr-2" /> {t('openCalendar')}
          </Button>
        </div>
        <div className="border rounded-lg p-4 bg-white">
          <h3 className="font-medium mb-2">{t('manageRsvps')}</h3>
          <p className="text-sm text-gray-600 mb-3">{t('trackAttendeeResponses')}</p>
          <Button variant="outline" onClick={handleRsvps}>
            <Ticket className="h-4 w-4 mr-2" /> {t('viewRsvps')}
          </Button>
        </div>
        <div className="border rounded-lg p-4 bg-white">
          <h3 className="font-medium mb-2">{t('quickAnnounce')}</h3>
          <p className="text-sm text-gray-600 mb-3">{t('sendQuickEventAnnouncement')}</p>
          <Button variant="outline" onClick={() => toast({ title: t('announcementSent') })}>{t('send')}</Button>
        </div>
      </div>

      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h3 className="font-medium">{t('upcomingEvents')}</h3>
          <span className="text-xs text-gray-500">{filtered.length} {t('results')}</span>
        </div>
        <ul className="divide-y">
          {filtered.map((e) => (
            <li key={e.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
              <div className="hidden md:block">
                <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center font-semibold">
                  {new Date(e.date).toLocaleDateString(undefined,{ day:'2-digit'})}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium">{e.title}</span>
                  <Badge variant="secondary">{e.type}</Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-1">
                  <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {e.date} {e.time}</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {e.location}</span>
                  <span className="inline-flex items-center gap-1">{e.attending}/{e.capacity} {t('attending')}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={handleRsvps}>{t('rsvps')}</Button>
                <Button size="sm" variant="outline" onClick={() => handleShare(e)}><Share2 className="h-4 w-4 mr-1" /> {t('share')}</Button>
                <Button size="sm" variant="outline" onClick={() => duplicate(e)}><Copy className="h-4 w-4 mr-1" /> {t('duplicate')}</Button>
                <Button size="sm" variant={e.published ? 'secondary' : 'outline'} onClick={() => togglePublish(e.id)}>
                  {e.published ? <><EyeOff className="h-4 w-4 mr-1"/> {t('unpublish')}</> : <><CheckCircle2 className="h-4 w-4 mr-1"/> {t('publish')}</>}
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="destructive" className="bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"><Trash2 className="h-4 w-4 mr-1" />{t('delete')}</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t('delete')} "{e.title}"?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-gray-600">{t('thisActionCannotBeUndone')}</p>
                    <DialogFooter>
                      <Button variant="outline">{t('cancel')}</Button>
                      <Button onClick={() => handleDelete(e.id)} variant="destructive">{t('delete')}</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminEvents;


