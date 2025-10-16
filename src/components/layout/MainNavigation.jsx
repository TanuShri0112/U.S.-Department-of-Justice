import React from 'react';
import { 
  Home, Book, Users, Folder, FileText, BarChart2,
  Grid, Settings, FileBox, MessageCircle, HelpCircle,
  GraduationCap, Upload, Video, Bell, Calendar
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { NavItem } from './NavItem';
import { useSidebar } from '@/contexts/SidebarContext';
import { useUserFilter } from '@/contexts/UserFilterContext';
import { useCourseSidebar } from '@/contexts/CourseSidebarContext';
import { useInstructorPortal } from '@/contexts/InstructorPortalContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const MainNavigation = ({ pathname, onItemClick }) => {
  const { isMainCollapsed } = useSidebar();
  const { isFilterMenuOpen, setIsFilterMenuOpen } = useUserFilter();
  const { openCourseSidebar, setCourseTitle } = useCourseSidebar();
  const { isInstructorMode, setInstructorMode } = useInstructorPortal();
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleUserClick = () => {
    if (location.pathname === '/users') {
      setIsFilterMenuOpen(!isFilterMenuOpen);
    } else {
      navigate('/users');
      if (onItemClick) onItemClick();
    }
  };

  const handleCourseClick = () => {
    // Always navigate to courses page when clicked
    navigate('/courses');
    if (onItemClick) onItemClick();
  };

  const handleGroupsClick = () => {
    navigate('/groups');
    if (onItemClick) onItemClick();
  };

  const handleResourcesClick = () => {
    navigate('/resources');
    if (onItemClick) onItemClick();
  };


  const handleNavItemClick = (path) => {
    navigate(path);
    if (onItemClick) onItemClick();
  };

  const handleHelpMenuClick = (section) => {
    navigate(`/help?section=${section}`);
    if (onItemClick) onItemClick();
  };
  
  const staggerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="flex-1 flex flex-col">
      <motion.div 
        className="flex-1 py-4 space-y-1.5 px-2"
        initial="hidden"
        animate="show"
        variants={staggerVariants}
      >
        {/* Home */}
        <motion.div variants={itemVariants}>
          <NavItem 
            icon={Home} 
            label="Home" 
            to="/" 
            active={pathname === '/'} 
            onClick={() => handleNavItemClick('/')}
            collapsed={isMainCollapsed}
            className="hover-lift"
          />
        </motion.div>
        
        {/* Courses */}
        <motion.div variants={itemVariants}>
          <NavItem 
            icon={Book} 
            label="Courses" 
            to="/courses" 
            active={pathname.startsWith('/courses')} 
            onClick={handleCourseClick}
            collapsed={isMainCollapsed}
            className="hover-lift"
          />
        </motion.div>
        
        {/* Groups */}
        <motion.div variants={itemVariants}>
          <NavItem 
            icon={Users} 
            label="Groups" 
            to="/groups" 
            active={pathname.startsWith('/groups')}
            onClick={handleGroupsClick}
            collapsed={isMainCollapsed}
            className="hover-lift"
          />
        </motion.div>
        
        {/* Catalog */}
        <motion.div variants={itemVariants}>
          <NavItem 
            icon={Folder}
            label="Catalog"
            to="/catalog"
            active={pathname.startsWith('/catalog')}
            onClick={() => handleNavItemClick('/catalog')}
            collapsed={isMainCollapsed}
            className="hover-lift"
          />
        </motion.div>
        
        
        {/* Resources */}
        <motion.div variants={itemVariants}>
          <NavItem
            icon={FileBox}
            label="Resources"
            to="/resources"
            active={pathname.startsWith('/resources')}
            onClick={handleResourcesClick}
            collapsed={isMainCollapsed}
            className="hover-lift"
          />
        </motion.div>
        
      </motion.div>

      {/* Help & Support */}
      <div className="border-t border-gray-100 p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "group w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg",
                "transition-all duration-200 ease-in-out",
                "hover:bg-gray-50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
                "text-gray-700 hover:text-gray-900 hover:shadow-sm",
                "transform hover:-translate-y-0.5",
                isMainCollapsed && "justify-center px-2"
              )}
              title={isMainCollapsed ? "Help & Support" : undefined}
            >
              <HelpCircle className={cn(
                "flex-shrink-0 transition-all duration-200", 
                isMainCollapsed ? "h-5 w-5" : "h-5 w-5",
                "text-gray-500 group-hover:text-blue-600 group-hover:scale-110"
              )} />
              
              {!isMainCollapsed && (
                <span className="truncate font-medium group-hover:text-blue-700 transition-colors duration-200">
                  Help & Support
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            side={isMainCollapsed ? "right" : "top"} 
            align="start"
            className="w-56 bg-white shadow-lg border border-gray-200 animate-in slide-in-from-bottom-2 duration-200"
          >
            <DropdownMenuItem 
              onClick={() => handleHelpMenuClick('faqs')}
              className="hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 cursor-pointer"
            >
              <FileText className="mr-2 h-4 w-4" />
              FAQs
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleHelpMenuClick('contact')}
              className="hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 cursor-pointer"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact Support
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleHelpMenuClick('guides')}
              className="hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 cursor-pointer"
            >
              <Book className="mr-2 h-4 w-4" />
              User Guides
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleHelpMenuClick('ticket')}
              className="hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 cursor-pointer"
            >
              <FileText className="mr-2 h-4 w-4" />
              Support Ticket
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Spacer */}
      <div className="flex-1 min-h-4"></div>

      {/* Instructor Portal Toggle - At the very bottom */}
      <div className="border-t border-gray-100 p-2">
        <button
          onClick={() => setInstructorMode(!isInstructorMode)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg",
            "transition-all duration-200 hover:bg-gray-50",
            "hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
            "hover:shadow-sm transform hover:-translate-y-0.5",
            isMainCollapsed ? "justify-center" : "justify-between"
          )}
        >
          <div className="flex items-center gap-3">
            <GraduationCap className={cn(
              "flex-shrink-0 h-5 w-5",
              isInstructorMode ? "text-blue-600" : "text-gray-500",
              "transition-all duration-200 group-hover:scale-110"
            )} />
            {!isMainCollapsed && (
              <span className={cn(
                "text-sm font-medium",
                isInstructorMode ? "text-blue-600" : "text-gray-700"
              )}>
                Instructor Mode
              </span>
            )}
          </div>
          <div className="flex items-center">
            <Switch
              checked={isInstructorMode}
              onCheckedChange={setInstructorMode}
              className={cn(
                isMainCollapsed && "scale-75",
                "transition-transform duration-200"
              )}
            />
          </div>
        </button>

        {isInstructorMode && (
          <div className="space-y-1 px-2 mt-2">
            {/* Course Management */}
            <NavItem 
              icon={Upload}
              label="Upload Courses"
              to="/courses/create"
              active={pathname === '/courses/create'}
              onClick={() => handleNavItemClick('/courses/create')}
              collapsed={isMainCollapsed}
              className="hover-lift"
            />
            <NavItem 
              icon={Video}
              label="Webinars"
              to="/webinars"
              active={pathname.startsWith('/webinars')}
              onClick={() => handleNavItemClick('/webinars')}
              collapsed={isMainCollapsed}
              className="hover-lift"
            />
            <NavItem 
              icon={Calendar}
              label="Schedule"
              to="/calendar"
              active={pathname === '/calendar'}
              onClick={() => handleNavItemClick('/calendar')}
              collapsed={isMainCollapsed}
              className="hover-lift"
            />

            {/* Communication */}
            <NavItem 
              icon={Bell}
              label="Announcements"
              to="/announcements"
              active={pathname === '/announcements'}
              onClick={() => handleNavItemClick('/announcements')}
              collapsed={isMainCollapsed}
              className="hover-lift"
            />
            <NavItem 
              icon={MessageCircle}
              label="Messages"
              to="/messages"
              active={pathname.startsWith('/messages')}
              onClick={() => handleNavItemClick('/messages')}
              collapsed={isMainCollapsed}
              className="hover-lift"
            />

            {/* Monitoring */}
            <NavItem 
              icon={Users}
              label="Users"
              to="/users"
              active={pathname.startsWith('/users')}
              onClick={handleUserClick}
              collapsed={isMainCollapsed}
              className="hover-lift"
            />
            <NavItem 
              icon={BarChart2}
              label="Reports"
              to="/reports"
              active={pathname.startsWith('/reports')}
              onClick={() => handleNavItemClick('/reports')}
              collapsed={isMainCollapsed}
              className="hover-lift"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainNavigation;