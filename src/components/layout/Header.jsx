import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Bell, Search, User, Calendar, Inbox, Recycle, ExternalLink } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "../theme/ThemeToggle";
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Header = ({ onMenuClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userAvatar, setUserAvatar] = useState('/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png');
  const [avatarKey, setAvatarKey] = useState(Date.now());
  
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false);
  const [inboxDialogOpen, setInboxDialogOpen] = useState(false);
  const [recycleBinDialogOpen, setRecycleBinDialogOpen] = useState(false);
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);

  useEffect(() => {
    const handleAvatarUpdate = (event) => {
      console.log('Avatar update received in header:', event.detail);
      setUserAvatar(event.detail.avatar);
      setAvatarKey(Date.now());
    };

    const handleForceRefresh = (event) => {
      console.log('Force avatar refresh in header:', event.detail);
      setUserAvatar(event.detail.avatar);
      setAvatarKey(Date.now());
    };

    const handleStorageChange = (event) => {
      if (event.key === 'userAvatar' && event.newValue) {
        console.log('Storage change detected for avatar:', event.newValue);
        setUserAvatar(event.newValue);
        setAvatarKey(Date.now());
      }
    };

    const savedAvatar = localStorage.getItem('userAvatar');
    const savedTimestamp = localStorage.getItem('userAvatarTimestamp');
    
    if (savedAvatar) {
      console.log('Loading saved avatar:', savedAvatar);
      setUserAvatar(savedAvatar);
      setAvatarKey(Date.now());
    }

    window.addEventListener('avatarUpdated', handleAvatarUpdate);
    window.addEventListener('forceAvatarRefresh', handleForceRefresh);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('avatarUpdated', handleAvatarUpdate);
      window.removeEventListener('forceAvatarRefresh', handleForceRefresh);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleAthenaLMSClick = () => {
    navigate('/');
    toast({
      title: "Welcome to Athena LMS",
      description: "You're now on the homepage",
      duration: 2000,
    });
  };

  const handleCalendarClick = () => {
    setCalendarDialogOpen(true);
  };

  const handleInboxClick = () => {
    setInboxDialogOpen(true);
  };

  const handleRecycleBinClick = () => {
    setRecycleBinDialogOpen(true);
  };

  const handleNotificationsClick = () => {
    setNotificationDialogOpen(true);
  };

  const handleJoinMeeting = (eventTitle) => {
    toast({
      title: "Joining Meeting",
      description: `Opening ${eventTitle}...`,
      duration: 3000,
    });
  };

  return (
    <>
      <header className="px-4 h-16 flex items-center justify-between bg-white shadow-sm z-40 border-b border-gray-200">
        <div className="flex items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={handleAthenaLMSClick}
          >
            <h1 className="text-xl font-semibold text-gray-900">
              Athena LMS
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="search"
              className="w-[300px] py-2 pl-10 pr-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search..."
            />
          </div>

          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleCalendarClick}
            className="text-gray-600 hover:bg-gray-100"
            aria-label="Calendar"
          >
            <Calendar className="h-5 w-5" />
          </Button>

          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleNotificationsClick}
            className="relative text-gray-600 hover:bg-gray-100"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar key={avatarKey} className="h-9 w-9">
                  <AvatarImage 
                    src={userAvatar} 
                    alt="User" 
                    onLoad={() => console.log('Avatar image loaded successfully')}
                    onError={() => console.log('Avatar image failed to load')}
                  />
                  <AvatarFallback>AL</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Instructor</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    instructor@athena.edu
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                toast({
                  title: "Logged out",
                  description: "You have been logged out successfully",
                  duration: 2000,
                });
              }}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Dialog open={calendarDialogOpen} onOpenChange={setCalendarDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Calendar & Events
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900">Today's Events</h3>
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">Team Meeting</span>
                    <div className="text-blue-600 text-xs">10:00 AM</div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex items-center gap-1 text-xs px-2 py-1 h-7"
                    onClick={() => handleJoinMeeting('Team Meeting')}
                  >
                    Join
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex justify-between">
                  <span>Course Review</span>
                  <span className="text-blue-600">2:00 PM</span>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-900">Upcoming This Week</h3>
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Project Deadline</span>
                  <span className="text-green-600">Friday</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">Monthly Team Meeting</span>
                    <div className="text-green-600 text-xs">Next Monday</div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex items-center gap-1 text-xs px-2 py-1 h-7"
                    onClick={() => handleJoinMeeting('Monthly Team Meeting')}
                  >
                    Join
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={notificationDialogOpen} onOpenChange={setNotificationDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="font-medium text-sm">New course available</p>
                <p className="text-xs text-gray-600">Advanced Risk Assessment is now open for enrollment</p>
                <span className="text-xs text-blue-600">5 minutes ago</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="font-medium text-sm">Assignment graded</p>
                <p className="text-xs text-gray-600">Your Module 4 assignment received a score of 95%</p>
                <span className="text-xs text-green-600">1 hour ago</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="font-medium text-sm">Reminder</p>
                <p className="text-xs text-gray-600">Live session starts in 30 minutes</p>
                <span className="text-xs text-yellow-600">30 minutes ago</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t">
              <Button variant="outline" size="sm" className="w-full">
                Mark All as Read
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};