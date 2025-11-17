// IBC Tender Requirement: Comprehensive Accessibility Features
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Accessibility, 
  Type, 
  Contrast, 
  Volume2, 
  Keyboard,
  Eye,
  EyeOff,
  Minus,
  Plus,
  RotateCcw
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';

const AccessibilityToolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('accessibility-font-size');
    return saved ? parseInt(saved) : 100;
  });
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('accessibility-high-contrast') === 'true';
  });
  const [textToSpeech, setTextToSpeech] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  // Apply font size changes
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem('accessibility-font-size', fontSize.toString());
    return () => {
      // Don't reset on unmount, keep user preference
    };
  }, [fontSize]);

  // Apply high contrast mode on initial load
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    }
  }, []); // Run once on mount

  // Apply high contrast mode when toggled
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
      localStorage.setItem('accessibility-high-contrast', 'true');
    } else {
      document.documentElement.classList.remove('high-contrast');
      localStorage.setItem('accessibility-high-contrast', 'false');
    }
  }, [highContrast]);

  // Announce to screen readers
  const announceToScreenReader = (message) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  const handleFontSizeChange = (value) => {
    setFontSize(value[0]);
    announceToScreenReader(`Font size set to ${value[0]}%`);
  };

  const handleHighContrastToggle = (checked) => {
    setHighContrast(checked);
    announceToScreenReader(checked ? 'High contrast mode enabled' : 'High contrast mode disabled');
  };

  const handleTextToSpeechToggle = (checked) => {
    setTextToSpeech(checked);
    announceToScreenReader(checked ? 'Text to speech enabled' : 'Text to speech disabled');
  };

  const keyboardShortcuts = [
    { key: 'Alt + A', description: 'Open accessibility toolbar' },
    { key: 'Tab', description: 'Navigate between interactive elements' },
    { key: 'Enter / Space', description: 'Activate buttons and links' },
    { key: 'Esc', description: 'Close dialogs and menus' },
    { key: 'Ctrl + B', description: 'Toggle sidebar' },
    { key: 'Alt + L', description: 'Switch language' },
    { key: 'Alt + T', description: 'Toggle theme' },
    { key: 'Alt + S', description: 'Skip to main content' },
  ];

  return (
    <>
      {/* Floating Accessibility Button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
        }}
        className="fixed bottom-4 right-4 z-[9999] rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-shadow pointer-events-auto bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95"
        aria-label="Open accessibility options"
        title="Accessibility Options"
        style={{ 
          position: 'fixed',
          zIndex: 9999,
          pointerEvents: 'auto',
          cursor: 'pointer',
          border: 'none',
          outline: 'none'
        }}
      >
        <Accessibility className="h-6 w-6" />
      </button>

      {/* Accessibility Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Accessibility className="h-5 w-5" />
              Accessibility Options
            </DialogTitle>
            <DialogDescription>
              Customize your experience to make the platform more accessible
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Font Size Control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="font-size" className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Font Size
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFontSizeChange([Math.max(50, fontSize - 10)])}
                    aria-label="Decrease font size"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-16 text-center font-medium">{fontSize}%</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFontSizeChange([Math.min(200, fontSize + 10)])}
                    aria-label="Increase font size"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFontSizeChange([100])}
                    aria-label="Reset font size"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Slider
                id="font-size"
                value={[fontSize]}
                onValueChange={handleFontSizeChange}
                min={50}
                max={200}
                step={10}
                className="w-full"
                aria-label="Font size slider"
              />
              <p className="text-xs text-gray-500">
                Adjust text size from 50% to 200% of default size
              </p>
            </div>

            <Separator />

            {/* High Contrast Mode */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="high-contrast" className="flex items-center gap-2">
                  <Contrast className="h-4 w-4" />
                  High Contrast Mode
                </Label>
                <p className="text-xs text-gray-500">
                  Increase color contrast for better visibility
                </p>
              </div>
              <Switch
                id="high-contrast"
                checked={highContrast}
                onCheckedChange={handleHighContrastToggle}
                aria-label="Toggle high contrast mode"
              />
            </div>

            <Separator />

            {/* Text to Speech */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="text-to-speech" className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  Text to Speech
                </Label>
                <p className="text-xs text-gray-500">
                  Enable text-to-speech for content reading
                </p>
              </div>
              <Switch
                id="text-to-speech"
                checked={textToSpeech}
                onCheckedChange={handleTextToSpeechToggle}
                aria-label="Toggle text to speech"
              />
            </div>

            <Separator />

            {/* Screen Reader Support */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="screen-reader" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Screen Reader Announcements
                </Label>
                <p className="text-xs text-gray-500">
                  Enhanced announcements for screen reader users
                </p>
              </div>
              <Switch
                id="screen-reader"
                checked={screenReader}
                onCheckedChange={(checked) => {
                  setScreenReader(checked);
                  announceToScreenReader(checked ? 'Screen reader announcements enabled' : 'Screen reader announcements disabled');
                }}
                aria-label="Toggle screen reader announcements"
              />
            </div>

            <Separator />

            {/* Keyboard Shortcuts */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Keyboard className="h-4 w-4" />
                  Keyboard Shortcuts
                </Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowKeyboardShortcuts(!showKeyboardShortcuts)}
                >
                  {showKeyboardShortcuts ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {showKeyboardShortcuts && (
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  {keyboardShortcuts.map((shortcut, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span>{shortcut.description}</span>
                      <kbd className="px-2 py-1 bg-white border rounded text-xs font-mono">
                        {shortcut.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Screen Reader Only Announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true" id="screen-reader-announcements"></div>
    </>
  );
};

export default AccessibilityToolbar;

