import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Bell, Search, User, Calendar, Inbox, Recycle, ExternalLink, Check } from 'lucide-react';
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
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRole } from '@/contexts/RoleContext';
import { ROLE_LABELS } from '@/constants/roles';
import { Badge } from '@/components/ui/badge';

export const Header = ({ onMenuClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentLanguage } = useLanguage();
  const { activeRole, currentUser, assumeRole } = useRole();
  
  const [userAvatar, setUserAvatar] = useState('/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png');
  const [avatarKey, setAvatarKey] = useState(Date.now());
  
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false);
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);

  const handleLogoClick = () => {
    navigate('/');
  };

  const availableRoles = currentUser?.roles ?? [];
  const activeRoleLabel =
    ROLE_LABELS[activeRole]?.[currentLanguage] ??
    ROLE_LABELS[activeRole]?.en ??
    activeRole;

  return (
    <>
      <header className="px-4 h-16 flex items-center justify-between bg-white shadow-md z-40 border-b border-gray-200">
        <div className="flex items-center gap-8">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={handleLogoClick}
          >
            <h1 className="text-lg font-semibold text-gray-900">
              {currentLanguage === 'de' ? 'Kreis Wesel – Lernportal' : 
               currentLanguage === 'es' ? 'Kreis Wesel – Lernportal' : 
               'Kreis Wesel – Lernportal'}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {activeRole && (
            <Badge variant="outline" className="hidden md:flex items-center gap-2 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-green-500" aria-hidden />
              <span className="text-xs font-medium">{activeRoleLabel}</span>
            </Badge>
          )}
          <ThemeToggle />
          <LanguageSwitcher />
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="search"
              className="w-[300px] py-2 pl-10 pr-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))]"
              placeholder={currentLanguage === 'de' ? 'Suchen...' : 
                           currentLanguage === 'es' ? 'Buscar...' : 
                           'Search...'}
            />
          </div>

          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setCalendarDialogOpen(true)}
            className="text-gray-600 hover:bg-gray-100"
            aria-label={currentLanguage === 'de' ? 'Kalender' : 
                        currentLanguage === 'es' ? 'Calendario' : 
                        'Calendar'}
          >
            <Calendar className="h-5 w-5" />
          </Button>

          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setNotificationDialogOpen(true)}
            className="relative text-gray-600 hover:bg-gray-100"
            aria-label={currentLanguage === 'de' ? 'Benachrichtigungen' : 
                        currentLanguage === 'es' ? 'Notificaciones' : 
                        'Notifications'}
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
                  />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-white border border-gray-200 shadow-lg rounded-xl p-1"
            align="end"
            forceMount
          >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activeRoleLabel}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    instructor@sachsen.de
                  </p>
                </div>
              </DropdownMenuLabel>
              {availableRoles.length > 1 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="text-xs text-muted-foreground px-1">
                    {currentLanguage === 'de' ? 'Rolle wechseln' : 
                     currentLanguage === 'es' ? 'Cambiar rol' : 
                     'Switch role'}
                  </DropdownMenuLabel>
                  {availableRoles.map((role) => {
                    const label = ROLE_LABELS[role]?.[currentLanguage] ?? ROLE_LABELS[role]?.en ?? role;
                    const isActive = role === activeRole;
                    return (
                      <DropdownMenuItem
                        key={role}
                        onClick={() => assumeRole(role)}
                        className="flex items-center justify-between text-sm"
                      >
                        <span>{label}</span>
                        {isActive && <Check className="h-4 w-4 text-primary" />}
                      </DropdownMenuItem>
                    );
                  })}
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>{currentLanguage === 'de' ? 'Profil' : 
                        currentLanguage === 'es' ? 'Perfil' : 
                        'Profile'}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                toast({
                  title: currentLanguage === 'de' ? 'Abgemeldet' : 
                         currentLanguage === 'es' ? 'Sesión cerrada' : 
                         'Logged out',
                  description: currentLanguage === 'de'
                    ? 'Sie wurden erfolgreich abgemeldet'
                    : currentLanguage === 'es'
                    ? 'Has cerrado la sesión correctamente'
                    : 'You have been logged out successfully',
                  duration: 2000,
                });
              }}>
                {currentLanguage === 'de' ? 'Abmelden' : 
                 currentLanguage === 'es' ? 'Cerrar sesión' : 
                 'Log out'}
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
              {currentLanguage === 'de' ? 'Kalender & Ereignisse' : 
               currentLanguage === 'es' ? 'Calendario y eventos' : 
               'Calendar & Events'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900">
                {currentLanguage === 'de' ? 'Heutige Ereignisse' : 
                 currentLanguage === 'es' ? 'Eventos de hoy' : 
                 "Today's Events"}
              </h3>
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">
                      {currentLanguage === 'de' ? 'Team-Meeting' : 
                       currentLanguage === 'es' ? 'Reunión del equipo' : 
                       'Team Meeting'}
                    </span>
                    <div className="text-blue-600 text-xs">10:00</div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex items-center gap-1 text-xs px-2 py-1 h-7"
                  >
                    {currentLanguage === 'de' ? 'Beitreten' : 
                     currentLanguage === 'es' ? 'Unirse' : 
                     'Join'}
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
              {currentLanguage === 'de' ? 'Benachrichtigungen' : 
               currentLanguage === 'es' ? 'Notificaciones' : 
               'Notifications'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="font-medium text-sm">
                  {currentLanguage === 'de' ? 'Neuer Kurs verfügbar' : 
                   currentLanguage === 'es' ? 'Nuevo curso disponible' : 
                   'New course available'}
                </p>
                <p className="text-xs text-gray-600">
                  {currentLanguage === 'de'
                    ? 'Das Modul für Datenschutz & IT-Sicherheit ist jetzt für die Anmeldung geöffnet'
                    : currentLanguage === 'es'
                    ? 'El módulo avanzado de seguridad ya está abierto para inscripciones'
                    : 'Advanced Security Module is now open for enrollment'}
                </p>
                <span className="text-xs text-blue-600">
                  {currentLanguage === 'de' ? 'vor 5 Minuten' : 
                   currentLanguage === 'es' ? 'Hace 5 minutos' : 
                   '5 minutes ago'}
                </span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t">
              <Button variant="outline" size="sm" className="w-full">
                {currentLanguage === 'de' ? 'Alle als gelesen markieren' : 
                 currentLanguage === 'es' ? 'Marcar todo como leído' : 
                 'Mark All as Read'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};