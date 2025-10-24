import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { SidebarNav } from './SidebarNav';
import { Header } from './Header';
import { GroupContextualSidebar } from './GroupContextualSidebar';
import { useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';
import AdminContextualSidebar from './AdminContextualSidebar';
import { useCourseSidebar } from '@/contexts/CourseSidebarContext';
import { UserFilterMenu } from '@/components/users/UserFilterMenu';
import { useUserFilter } from '@/contexts/UserFilterContext';
import { useAdminPortal } from '@/contexts/AdminPortalContext';
import { AdminPortal } from '../admin/AdminPortal';
import { motion, AnimatePresence } from 'framer-motion';

// Dictionary of course titles keyed by ID
const courseTitles = {
  '1757539': 'Advanced Credit Analysis',
  'nodejs101': 'Node.js Fundamentals',
  'reactjs202': 'React.js Advanced',
  'ml506': 'Machine Learning',
  'data345': 'Data Analysis',
};

export const AdminLayout = ({ title = 'Dashboard' }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId } = useParams();

  // Context values
  const {
    isMainCollapsed,
    isAdminSectionActive,
    isAdminSidebarOpen,
    isGroupSectionActive,
    isGroupSidebarOpen,
    activeGroupId,
  } = useSidebar();

  const { setCourseTitle } = useCourseSidebar();

  const { isFilterMenuOpen } = useUserFilter();
  
  const { isAdminPortalEnabled, closeAdminPortal } = useAdminPortal();

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  // Set the document title based on the current route
  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    let newTitle = title || 'Dashboard';

    if (pathSegments.length > 0) {
      const firstSegment = pathSegments[0];

      // Convert the route to title case and handle specific routes
      if (firstSegment === 'dashboard' || firstSegment === '') {
        newTitle = 'Dashboard';
      } else if (pathSegments.length === 1) {
        newTitle =
          firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1);
      } else if (
        firstSegment === 'courses' &&
        pathSegments[1] === 'view' &&
        courseId
      ) {
        // For course view pages
        newTitle = courseTitles[courseId] || 'Course Details';
        setCourseTitle(newTitle);
      }
    }

    document.title = `${newTitle} | ECPAT International`;
  }, [location.pathname, title, courseId, setCourseTitle]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Main Sidebar */}
      <div
        className={cn(
          'z-50 transition-all duration-300 ease-in-out h-screen fixed md:sticky top-0 left-0',
          isMainCollapsed ? 'w-16' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <SidebarNav onCloseMobile={closeMobileMenu} />
      </div>

      {/* Contextual Sidebars */}
      <AnimatePresence mode="wait">
        {/* Admin Contextual Sidebar */}
        {isAdminSectionActive && isAdminSidebarOpen && (
          <motion.div
            key="admin-sidebar"
            className={cn(
              'z-40 h-screen fixed top-0 md:sticky md:left-0',
              isMainCollapsed ? 'left-16' : 'left-64 md:left-0'
            )}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <AdminContextualSidebar isCollapsed={false} />
          </motion.div>
        )}

        {/* Group Contextual Sidebar */}
        {isGroupSectionActive && activeGroupId && isGroupSidebarOpen && (
          <motion.div
            key="group-sidebar"
            className={cn(
              'z-40 h-screen fixed top-0 md:sticky md:left-0',
              isMainCollapsed ? 'left-16' : 'left-64 md:left-0'
            )}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <GroupContextualSidebar isCollapsed={false} />
          </motion.div>
        )}

      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <div className="sticky top-0 z-30 bg-white shadow-sm border-b">
          <Header onMenuClick={() => setMobileOpen(true)} />
        </div>

        {/* Mobile overlay */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={closeMobileMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>

        {/* Users page filter menu */}
        {isFilterMenuOpen && location.pathname === '/users' && (
          <UserFilterMenu />
        )}

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
      
      {/* Admin Portal Overlay */}
      {isAdminPortalEnabled && (
        <div className="fixed inset-0 z-50 bg-white">
          <AdminPortal onToggle={closeAdminPortal} />
        </div>
      )}
    </div>
  );
};

export default AdminLayout;