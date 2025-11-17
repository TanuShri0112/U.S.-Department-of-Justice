// IBC Tender Requirement: App wrapper with accessibility features
import { useKeyboardShortcuts } from './accessibility/KeyboardShortcuts';

export const AppWithAccessibility = ({ children }) => {
  useKeyboardShortcuts();
  return <>{children}</>;
};

