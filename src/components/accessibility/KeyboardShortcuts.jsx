// IBC Tender Requirement: Keyboard Shortcuts for Accessibility
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Keyboard shortcuts handler for accessibility
 */
export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Alt + A: Open accessibility toolbar
      if (event.altKey && event.key === 'a') {
        event.preventDefault();
        const toolbarButton = document.querySelector('[aria-label="Open accessibility options"]');
        if (toolbarButton) {
          toolbarButton.click();
        }
      }

      // Alt + L: Focus language switcher
      if (event.altKey && event.key === 'l') {
        event.preventDefault();
        const langButton = document.querySelector('[aria-label="Select language"]');
        if (langButton) {
          langButton.focus();
        }
      }

      // Alt + S: Skip to main content
      if (event.altKey && event.key === 's') {
        event.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      // Alt + H: Go to home/dashboard
      if (event.altKey && event.key === 'h') {
        event.preventDefault();
        navigate('/');
      }

      // Alt + T: Toggle theme (if theme toggle exists)
      if (event.altKey && event.key === 't') {
        event.preventDefault();
        const themeButton = document.querySelector('[aria-label*="theme"], [aria-label*="Theme"]');
        if (themeButton) {
          themeButton.click();
        }
      }

      // Escape: Close any open dialogs/modals
      if (event.key === 'Escape') {
        const openDialog = document.querySelector('[role="dialog"][aria-hidden="false"]');
        if (openDialog) {
          const closeButton = openDialog.querySelector('[aria-label*="close"], [aria-label*="Close"]');
          if (closeButton) {
            closeButton.click();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);
};

export default useKeyboardShortcuts;

