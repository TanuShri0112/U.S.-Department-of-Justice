import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { CalendarDays, PlusCircle, Ticket, Clock, MapPin, Share2, Trash2 } from 'lucide-react';

const getMockEvents = (t) => [
  { id: 1, title: t('uqtrTrainingWorkshop'), date: '2025-11-05', time: '10:00', location: t('online'), type: t('webinar'), capacity: 200, attending: 142 },
  { id: 2, title: t('uqtrCommunityOutreach'), date: '2025-11-12', time: '14:00', location: t('troisRivieres'), type: t('outreach'), capacity: 80, attending: 63 },
  { id: 3, title: t('uqtrPolicyRoundtable'), date: '2025-12-02', time: '09:30', location: t('uqtrCampus'), type: t('meeting'), capacity: 25, attending: 18 },
];

const Events = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [events, setEvents] = useState(getMockEvents(t));
  const [saved, setSaved] = useState(() => {
    try { return JSON.parse(localStorage.getItem('savedEvents') || '[]'); } catch { return []; }
  });
  const [rsvps, setRsvps] = useState(() => {
    try { return JSON.parse(localStorage.getItem('eventRsvps') || '{}'); } catch { return {}; }
  });
  const [subscribed, setSubscribed] = useState(() => localStorage.getItem('eventsSubscribed') === '1');
  const [activeEvent, setActiveEvent] = useState(null);
  const [pendingStatus, setPendingStatus] = useState('Going');

  useEffect(() => { localStorage.setItem('savedEvents', JSON.stringify(saved)); }, [saved]);
  useEffect(() => { localStorage.setItem('eventRsvps', JSON.stringify(rsvps)); }, [rsvps]);
  useEffect(() => { localStorage.setItem('eventsSubscribed', subscribed ? '1' : '0'); }, [subscribed]);

  const handleCalendar = () => navigate('/events/calendar');
  const handleRsvps = () => navigate('/events/rsvps');
  const handleSubscribe = () => {
    setSubscribed(prev => !prev);
    toast({ title: !subscribed ? t('subscribed') : t('unsubscribed'), description: !subscribed ? t('willReceiveReminders') : t('willNotReceiveReminders') });
  };

  const toggleSave = (id) => {
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const openRsvp = (ev) => {
    setActiveEvent(ev);
    setPendingStatus(rsvps[ev.id] || t('going'));
  };

  const confirmRsvp = () => {
    if (!activeEvent) return;
    setRsvps(prev => ({ ...prev, [activeEvent.id]: pendingStatus }));
    setActiveEvent(null);
    toast({ title: t('rsvpUpdated'), description: `${pendingStatus} ${t('for')} "${activeEvent.title}"` });
  };

  const downloadIcs = (ev) => {
    const dt = new Date(`${ev.date}T${ev.time}:00`);
    const dtEnd = new Date(dt.getTime() + 60 * 60 * 1000);
    const format = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Athena LMS//Events//EN',
      'BEGIN:VEVENT',
      `UID:${ev.id}@athena.lms`,
      `DTSTAMP:${format(new Date())}`,
      `DTSTART:${format(dt)}`,
      `DTEND:${format(dtEnd)}`,
      `SUMMARY:${ev.title}`,
      `LOCATION:${ev.location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${ev.title.replace(/\s+/g,'_')}.ics`; a.click();
    URL.revokeObjectURL(url);
    toast({ title: t('addedToCalendar'), description: t('icsFileDownloaded') });
  };

  const filtered = useMemo(() => {
    return events.filter(e => 
      (typeFilter === 'all' || e.type === typeFilter) &&
      (query.trim() === '' || e.title.toLowerCase().includes(query.toLowerCase()) || e.location.toLowerCase().includes(query.toLowerCase()))
    );
  }, [events, query, typeFilter]);

  const handleShare = (e) => toast({ title: t('shareLinkCopied'), description: `${t('linkFor')} "${e.title}" ${t('copiedToClipboard')}` });
  const handleDelete = (id) => setEvents(prev => prev.filter(e => e.id !== id));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{t('events')}</h1>
          <p className="text-sm text-gray-500">{t('discoverAndRsvp')}</p>
        </div>
        <Button onClick={handleRsvps} className="shadow-sm">
          <Ticket className="h-4 w-4 mr-2" /> {t('myRsvps')}
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-lg p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        <div className="flex-1">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('searchByTitleOrLocation')} />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full md:w-56">
            <SelectValue placeholder={t('filterByType')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('allTypes')}</SelectItem>
            <SelectItem value="Webinar">{t('webinar')}</SelectItem>
            <SelectItem value="Outreach">{t('outreach')}</SelectItem>
            <SelectItem value="Meeting">{t('meeting')}</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => { setQuery(''); setTypeFilter('all'); }}>{t('reset')}</Button>
      </div>

      {/* At-a-glance */}
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

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4 bg-white">
          <h2 className="font-medium mb-2">{t('calendar')}</h2>
          <p className="text-sm text-gray-600 mb-3">{t('viewUpcomingEvents')}</p>
          <Button variant="outline" onClick={handleCalendar}>
            <CalendarDays className="h-4 w-4 mr-2" /> {t('openCalendar')}
          </Button>
        </div>

        <div className="border rounded-lg p-4 bg-white">
          <h2 className="font-medium mb-2">{t('myRsvps')}</h2>
          <p className="text-sm text-gray-600 mb-3">{t('seeEventsResponded')}</p>
          <Button variant="outline" onClick={handleRsvps}>
            <Ticket className="h-4 w-4 mr-2" /> {t('viewRsvps')}
          </Button>
        </div>

        <div className="border rounded-lg p-4 bg-white">
          <h2 className="font-medium mb-2">{t('subscribe')}</h2>
          <p className="text-sm text-gray-600 mb-3">{t('getEventReminders')}</p>
          <Button variant="outline" onClick={handleSubscribe}>{subscribed ? t('unsubscribe') : t('subscribe')}</Button>
        </div>
      </div>

      {/* Upcoming list */}
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
                <Dialog open={!!activeEvent && activeEvent?.id === e.id} onOpenChange={(o) => { if (!o) setActiveEvent(null); }}>
                  <DialogTrigger asChild>
                    <Button size="sm" onClick={() => openRsvp(e)}>{rsvps[e.id] ? t('updateRsvp') : t('rsvp')}</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t('rsvpTo')} "{e.title}"</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3">
                      <RadioGroup value={pendingStatus} onValueChange={setPendingStatus}>
                        <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" checked={pendingStatus===t('going')} onChange={() => setPendingStatus(t('going'))} /> {t('going')}</label>
                        <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" checked={pendingStatus===t('interested')} onChange={() => setPendingStatus(t('interested'))} /> {t('interested')}</label>
                        <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" checked={pendingStatus===t('notGoing')} onChange={() => setPendingStatus(t('notGoing'))} /> {t('notGoing')}</label>
                      </RadioGroup>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setActiveEvent(null)}>{t('cancel')}</Button>
                      <Button onClick={confirmRsvp}>{t('confirm')}</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button size="sm" variant={saved.includes(e.id) ? 'secondary' : 'outline'} onClick={() => toggleSave(e.id)}>{saved.includes(e.id) ? t('saved') : t('save')}</Button>
                <Button size="sm" variant="outline" onClick={() => downloadIcs(e)}>{t('addToCalendar')}</Button>
                <Button size="sm" variant="outline" onClick={() => handleShare(e)}><Share2 className="h-4 w-4 mr-1" /> {t('share')}</Button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Saved events hint */}
      {saved.length > 0 && (
        <div className="text-xs text-gray-500 text-center">{t('youHave')} {saved.length} {t('savedEvent')}{saved.length>1?'s':''}.</div>
      )}
    </div>
  );
};

export default Events;


