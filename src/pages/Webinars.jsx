import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { format, parse, set } from "date-fns";
import { CreateWebinarDialog } from "@/components/webinars/CreateWebinarDialog";
import { WebinarRegistrationDialog } from "@/components/webinars/WebinarRegistrationDialog";
import { DeleteWebinarDialog } from "@/components/webinars/DeleteWebinarDialog";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";

const SAMPLE_WEBINARS = [
  {
    id: 1,
    title: "Introduction to Legal Research",
    description: "Learn the fundamentals of legal research methodologies and tools.",
    presenter: "John Smith, J.D.",
    date: new Date(2025, 10, 20, 14, 0), // November 20, 2025, 2 PM
    duration: "1 hour",
    capacity: 100,
    registeredCount: 45,
    tags: ["Legal Research", "Beginner"],
  },
  {
    id: 2,
    title: "Advanced Case Law Analysis",
    description: "Deep dive into analyzing complex legal cases and precedents.",
    presenter: "Sarah Johnson, LLM",
    date: new Date(2025, 10, 22, 15, 0), // November 22, 2025, 3 PM
    duration: "1.5 hours",
    capacity: 75,
    registeredCount: 60,
    tags: ["Case Law", "Advanced"],
  },
];

export default function Webinars() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [registeredWebinars, setRegisteredWebinars] = useState(new Set());
  const [webinars, setWebinars] = useState(SAMPLE_WEBINARS);
  const [selectedWebinar, setSelectedWebinar] = useState(null);
  const [registrationDialogOpen, setRegistrationDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [webinarToDelete, setWebinarToDelete] = useState(null);
  const { toast } = useToast();

  const filteredWebinars = webinars.filter(webinar => {
    const matchesSearch = webinar.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         webinar.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = !selectedDate || format(webinar.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
    return matchesSearch && matchesDate;
  });

  const handleCreateWebinar = (newWebinar) => {
    // Combine date and time
    const timeArray = newWebinar.time.split(':');
    const combinedDate = set(newWebinar.date, {
      hours: parseInt(timeArray[0]),
      minutes: parseInt(timeArray[1]),
    });

    const webinarToAdd = {
      ...newWebinar,
      date: combinedDate,
      duration: `${newWebinar.duration} hour${newWebinar.duration === "1" ? "" : "s"}`,
      tags: ["New"],
    };

    setWebinars(prev => [...prev, webinarToAdd]);
    toast({
      title: "Webinar Created",
      description: "Your webinar has been successfully created.",
    });
  };

  const handleRegister = (webinar) => {
    setSelectedWebinar(webinar);
    setRegistrationDialogOpen(true);
  };

  const handleDelete = (webinar) => {
    setWebinarToDelete(webinar);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    setWebinars(prevWebinars => prevWebinars.filter(w => w.id !== webinarToDelete.id));
    // Remove from registered webinars if it was registered
    setRegisteredWebinars(prev => {
      const newSet = new Set(prev);
      newSet.delete(webinarToDelete.id);
      return newSet;
    });
    toast({
      title: "Webinar Deleted",
      description: "The webinar has been successfully deleted.",
    });
  };

  const handleRegistrationConfirm = () => {
    setRegisteredWebinars(prev => {
      const newSet = new Set(prev);
      const isCurrentlyRegistered = newSet.has(selectedWebinar.id);
      
      // Update registrations set
      if (isCurrentlyRegistered) {
        newSet.delete(selectedWebinar.id);
      } else {
        newSet.add(selectedWebinar.id);
      }

      // Update webinars list with new registration count
      setWebinars(prevWebinars => 
        prevWebinars.map(webinar => {
          if (webinar.id === selectedWebinar.id) {
            return {
              ...webinar,
              registeredCount: isCurrentlyRegistered 
                ? webinar.registeredCount - 1 
                : webinar.registeredCount + 1
            };
          }
          return webinar;
        })
      );

      // Show toast notification
      toast({
        title: isCurrentlyRegistered ? "Registration Cancelled" : "Registration Confirmed",
        description: isCurrentlyRegistered 
          ? "You have cancelled your registration for this webinar."
          : "You have successfully registered for this webinar.",
      });

      return newSet;
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Webinars</h1>
        <CreateWebinarDialog onWebinarCreate={handleCreateWebinar} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <Input
            type="search"
            placeholder="Search webinars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />
          
          <div className="grid gap-4">
            {filteredWebinars.map((webinar) => (
              <Card key={webinar.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{webinar.title}</CardTitle>
                      <CardDescription>{webinar.presenter}</CardDescription>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex gap-2">
                        {webinar.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(webinar);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{webinar.description}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <div>
                      <p>📅 {format(webinar.date, 'PPP')}</p>
                      <p>⏰ {format(webinar.date, 'p')} ({webinar.duration})</p>
                    </div>
                    <div>
                      <p>👥 {webinar.registeredCount}/{webinar.capacity} registered</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    variant={registeredWebinars.has(webinar.id) ? "secondary" : "default"}
                    onClick={() => handleRegister(webinar)}
                  >
                    {registeredWebinars.has(webinar.id) ? "Cancel Registration" : "Register Now"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Filter by Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
            {selectedDate && (
              <CardFooter>
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => setSelectedDate(null)}
                >
                  Clear Date Filter
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>

      {selectedWebinar && (
        <WebinarRegistrationDialog
          webinar={selectedWebinar}
          open={registrationDialogOpen}
          onOpenChange={setRegistrationDialogOpen}
          onConfirm={handleRegistrationConfirm}
          isRegistered={registeredWebinars.has(selectedWebinar.id)}
        />
      )}

      {webinarToDelete && (
        <DeleteWebinarDialog
          webinar={webinarToDelete}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
