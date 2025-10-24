import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { CalendarDays, PlusCircle, Ticket, Clock, MapPin, Share2, Trash2, Video, Users, FileText, Bell } from 'lucide-react';

const getMockEvents = (t) => [
  { id: 1, title: t('uqtrTrainingWorkshop'), date: '2025-11-05', time: '10:00', location: t('online'), type: 'Event', capacity: 200, attending: 142 },
  { id: 2, title: t('uqtrCommunityOutreach'), date: '2025-11-12', time: '14:00', location: t('troisRivieres'), type: 'Event', capacity: 80, attending: 63 },
  { id: 3, title: t('uqtrPolicyRoundtable'), date: '2025-12-02', time: '09:30', location: t('uqtrCampus'), type: 'Event', capacity: 25, attending: 18 },
];

const getMockWebinars = () => [
  {
    id: 101,
    title: 'Introduction to Legal Research',
    description: 'Learn the fundamentals of legal research methodologies and tools.',
    presenter: 'John Smith, J.D.',
    date: '2025-11-08',
    time: '14:00',
    duration: '1 hour',
    location: 'Online',
    type: 'Webinar',
    capacity: 100,
    attending: 45,
    tags: ['Legal Research', 'Beginner'],
  },
  {
    id: 102,
    title: 'Advanced Case Law Analysis',
    description: 'Deep dive into analyzing complex legal cases and precedents.',
    presenter: 'Sarah Johnson, LLM',
    date: '2025-11-15',
    time: '15:00',
    duration: '1.5 hours',
    location: 'Online',
    type: 'Webinar',
    capacity: 75,
    attending: 60,
    tags: ['Case Law', 'Advanced'],
  },
  {
    id: 103,
    title: 'Community Engagement Strategies',
    description: 'Effective strategies for community outreach and engagement programs.',
    presenter: 'Michelle Davis',
    date: '2025-11-22',
    time: '11:00',
    duration: '1 hour',
    location: 'Online',
    type: 'Webinar',
    capacity: 150,
    attending: 78,
    tags: ['Community', 'Strategy'],
  },
];

const Events = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [events, setEvents] = useState(getMockEvents(t));
  const [webinars, setWebinars] = useState(getMockWebinars());
  const [allItems, setAllItems] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'events', 'webinars'
  const [saved, setSaved] = useState(() => {
    try { return JSON.parse(localStorage.getItem('savedEvents') || '[]'); } catch { return []; }
  });
  const [rsvps, setRsvps] = useState(() => {
    try { return JSON.parse(localStorage.getItem('eventRsvps') || '{}'); } catch { return {}; }
  });
  const [subscribed, setSubscribed] = useState(() => localStorage.getItem('eventsSubscribed') === '1');
  const [activeEvent, setActiveEvent] = useState(null);
  const [pendingStatus, setPendingStatus] = useState('Going');
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setAllItems([...events, ...webinars].sort((a, b) => new Date(a.date) - new Date(b.date)));
  }, [events, webinars]);

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

  const getItemsToDisplay = () => {
    let items = allItems;
    
    if (activeTab === 'events') items = events;
    else if (activeTab === 'webinars') items = webinars;

    return items.filter(item => 
      (typeFilter === 'all' || item.type === typeFilter) &&
      (query.trim() === '' || item.title.toLowerCase().includes(query.toLowerCase()) || item.location.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const filtered = getItemsToDisplay();

  const getItemIcon = (type) => {
    return type === 'Webinar' ? <Video className="h-4 w-4" /> : <CalendarDays className="h-4 w-4" />;
  };

  const getItemColor = (type) => {
    return type === 'Webinar' ? 'bg-purple-50 border-purple-100' : 'bg-blue-50 border-blue-100';
  };

  const getTypeIcon = (type) => {
    return type === 'Webinar' ? 'text-purple-600' : 'text-blue-600';
  };

  // Group items by date for schedule view
  const groupedByDate = useMemo(() => {
    const grouped = {};
    filtered.forEach(item => {
      if (!grouped[item.date]) grouped[item.date] = [];
      grouped[item.date].push(item);
    });
    return grouped;
  }, [filtered]);

  const stats = {
    upcoming: allItems.length,
    events: events.length,
    webinars: webinars.length,
    totalAttending: allItems.reduce((a, b) => a + b.attending, 0),
  };

  return (
    <div className="space-y-6 animate-fade-in bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Events & Webinars</h1>
          <p className="text-slate-600">Discover and register for upcoming events and educational webinars</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleRsvps} className="shadow-sm gap-2">
            <Ticket className="h-4 w-4" /> 
            <span className="hidden sm:inline">My RSVPs</span>
          </Button>
          <Button variant="outline" onClick={() => setSubscribed(!subscribed)} className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">{subscribed ? 'Unsubscribe' : 'Subscribe'}</span>
        </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-shadow">
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-slate-600">Total Upcoming</p>
              <div className="p-2 bg-blue-100 rounded-lg">
                <CalendarDays className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.upcoming}</p>
          </div>
        </Card>

        <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-shadow">
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-slate-600">Events</p>
              <div className="p-2 bg-green-100 rounded-lg">
                <Ticket className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.events}</p>
          </div>
        </Card>

        <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-shadow">
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-slate-600">Webinars</p>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Video className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.webinars}</p>
          </div>
        </Card>

        <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-shadow">
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-slate-600">Total Attending</p>
              <div className="p-2 bg-amber-100 rounded-lg">
                <Users className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.totalAttending}</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-md bg-white p-6">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <div className="flex-1">
            <Input 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              placeholder="Search events or webinars by title or location..." 
              className="border-slate-300"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-56 border-slate-300">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Event">Events Only</SelectItem>
              <SelectItem value="Webinar">Webinars Only</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => { setQuery(''); setTypeFilter('all'); }}>Reset</Button>
        </div>
      </Card>

      {/* Tabs */}
      <Card className="border-0 shadow-md bg-white overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start bg-slate-100 border-b rounded-none p-0 h-auto">
            <TabsTrigger value="all" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-white">
              <CalendarDays className="h-4 w-4 mr-2" />
              All Events & Webinars
            </TabsTrigger>
            <TabsTrigger value="events" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-white">
              <Ticket className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="webinars" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-white">
              <Video className="h-4 w-4 mr-2" />
              Webinars
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="p-6 m-0">
            {/* View Mode Selector */}
            <div className="flex gap-2 mb-6 justify-end">
              <Button 
                size="sm" 
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
                className="gap-2"
              >
                <FileText className="h-4 w-4" />
                List View
              </Button>
              <Button 
                size="sm" 
                variant={viewMode === 'calendar' ? 'default' : 'outline'}
                onClick={() => setViewMode('calendar')}
                className="gap-2"
              >
                <CalendarDays className="h-4 w-4" />
                Schedule
          </Button>
        </div>

            {viewMode === 'list' ? (
              // List View
              <div className="space-y-3">
                {filtered.length === 0 ? (
                  <div className="text-center py-12">
                    <CalendarDays className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-600">No events or webinars found</p>
                  </div>
                ) : (
                  filtered.map((item) => (
                    <div 
                      key={item.id} 
                      className={`border rounded-lg p-4 hover:shadow-md transition-all ${getItemColor(item.type)}`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Date Box */}
                        <div className="hidden md:flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-white border border-slate-200">
                          <span className="text-sm font-semibold text-slate-900">
                            {new Date(item.date).toLocaleDateString(undefined, { day: '2-digit' })}
                          </span>
                          <span className="text-xs text-slate-500">
                            {new Date(item.date).toLocaleDateString(undefined, { month: 'short' })}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <div className={`p-1.5 rounded-lg ${getItemColor(item.type)}`}>
                              {getItemIcon(item.type)}
        </div>
                            <h3 className="font-semibold text-slate-900">{item.title}</h3>
                            <Badge className={`${getItemColor(item.type)} text-slate-900 border-0`}>
                              {item.type}
                            </Badge>
                            {item.tags && item.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
      </div>

                          <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {item.date} at {item.time}
                            </span>
                            {item.duration && (
                              <span className="inline-flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {item.duration}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {item.location}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {item.attending}/{item.capacity} attending
                            </span>
                          </div>

                          {item.presenter && (
                            <p className="text-sm text-slate-500 mt-2">
                              Presenter: <span className="font-medium">{item.presenter}</span>
                            </p>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Dialog open={!!activeEvent && activeEvent?.id === item.id} onOpenChange={(o) => { if (!o) setActiveEvent(null); }}>
                            <DialogTrigger asChild>
                              <Button size="sm" onClick={() => openRsvp(item)}>
                                {rsvps[item.id] ? 'Update' : 'RSVP'}
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>RSVP to "{item.title}"</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-3">
                                <RadioGroup value={pendingStatus} onValueChange={setPendingStatus}>
                                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input type="radio" checked={pendingStatus === 'Going'} onChange={() => setPendingStatus('Going')} /> Going
                                  </label>
                                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input type="radio" checked={pendingStatus === 'Interested'} onChange={() => setPendingStatus('Interested')} /> Interested
                                  </label>
                                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input type="radio" checked={pendingStatus === 'Not Going'} onChange={() => setPendingStatus('Not Going')} /> Not Going
                                  </label>
                                </RadioGroup>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setActiveEvent(null)}>Cancel</Button>
                                <Button onClick={confirmRsvp}>Confirm</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button 
                            size="sm" 
                            variant={saved.includes(item.id) ? 'secondary' : 'outline'}
                            onClick={() => toggleSave(item.id)}
                          >
                            {saved.includes(item.id) ? 'Saved' : 'Save'}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => downloadIcs(item)}>
                            Add to Calendar
                          </Button>
                        </div>
        </div>
                </div>
                  ))
                )}
              </div>
            ) : (
              // Schedule/Calendar View
              <div className="space-y-6">
                {filtered.length === 0 ? (
                  <div className="text-center py-12">
                    <CalendarDays className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-600">No events or webinars scheduled</p>
                  </div>
                ) : (
                  Object.entries(groupedByDate).sort().map(([date, items]) => (
                    <div key={date} className="space-y-3">
                      <h3 className="text-lg font-semibold text-slate-900 sticky top-0 bg-white p-2 rounded-lg border border-slate-200">
                        📅 {new Date(date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </h3>
                      <div className="space-y-3 pl-4 border-l-2 border-slate-300">
                        {items.map((item) => (
                          <div 
                            key={item.id}
                            className="bg-white p-4 rounded-lg border border-slate-200 hover:shadow-md transition-all"
                          >
                            <div className="flex items-start justify-between">
              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  <span className="text-sm font-semibold text-slate-900 bg-blue-100 px-2 py-1 rounded">
                                    {item.time}
                                  </span>
                                  {item.duration && (
                                    <span className="text-xs text-slate-500">
                                      ({item.duration})
                                    </span>
                                  )}
                                  <Badge className={`${getItemColor(item.type)} text-slate-900 border-0`}>
                                    {item.type}
                                  </Badge>
                </div>
                                <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                                <p className="text-sm text-slate-600 mb-2">{item.description || item.location}</p>
                                <div className="flex flex-wrap gap-2 text-sm text-slate-500">
                                  <span>📍 {item.location}</span>
                                  <span>👥 {item.attending}/{item.capacity}</span>
                                  {item.presenter && <span>👨‍🏫 {item.presenter}</span>}
                </div>
              </div>
                              <Dialog open={!!activeEvent && activeEvent?.id === item.id} onOpenChange={(o) => { if (!o) setActiveEvent(null); }}>
                  <DialogTrigger asChild>
                                  <Button size="sm" onClick={() => openRsvp(item)}>
                                    {rsvps[item.id] ? 'Update' : 'Join'}
                                  </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                                    <DialogTitle>RSVP to "{item.title}"</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3">
                      <RadioGroup value={pendingStatus} onValueChange={setPendingStatus}>
                                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                                        <input type="radio" checked={pendingStatus === 'Going'} onChange={() => setPendingStatus('Going')} /> Going
                                      </label>
                                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                                        <input type="radio" checked={pendingStatus === 'Interested'} onChange={() => setPendingStatus('Interested')} /> Interested
                                      </label>
                                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                                        <input type="radio" checked={pendingStatus === 'Not Going'} onChange={() => setPendingStatus('Not Going')} /> Not Going
                                      </label>
                      </RadioGroup>
                    </div>
                    <DialogFooter>
                                    <Button variant="outline" onClick={() => setActiveEvent(null)}>Cancel</Button>
                                    <Button onClick={confirmRsvp}>Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Results summary */}
            {filtered.length > 0 && (
              <div className="text-xs text-slate-500 text-center mt-6 pt-6 border-t border-slate-200">
                Showing {filtered.length} result{filtered.length !== 1 ? 's' : ''}
      </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>

      {/* Saved items hint */}
      {saved.length > 0 && (
        <div className="text-xs text-slate-500 text-center bg-white p-3 rounded-lg border border-slate-200">
          📌 You have {saved.length} saved item{saved.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};

export default Events;


