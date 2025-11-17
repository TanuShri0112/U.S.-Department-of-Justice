// IBC Tender Requirement: Accessibility Features Documentation
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Accessibility, 
  Languages, 
  Keyboard,
  Eye,
  Volume2,
  Type,
  Contrast,
  Monitor,
  Smartphone
} from 'lucide-react';

const AccessibilityFeatures = () => {
  const accessibilityFeatures = [
    {
      category: 'Visual Accessibility',
      icon: Eye,
      features: [
        'High contrast mode for better visibility',
        'Adjustable font sizes (50% to 200%)',
        'Color contrast ratios meet WCAG 2.1 AA standards',
        'Screen reader compatibility (NVDA, JAWS, VoiceOver)',
        'Alternative text for all images',
        'Focus indicators for keyboard navigation',
        'Skip links for quick navigation'
      ]
    },
    {
      category: 'Motor & Mobility',
      icon: Keyboard,
      features: [
        'Full keyboard navigation support',
        'Keyboard shortcuts for common actions',
        'Large touch targets (minimum 44x44px)',
        'No time limits on interactions',
        'Voice control compatibility',
        'Switch control support'
      ]
    },
    {
      category: 'Hearing & Audio',
      icon: Volume2,
      features: [
        'Text-to-speech functionality',
        'Captions for video content',
        'Visual indicators for audio alerts',
        'Transcripts for audio content',
        'Volume controls'
      ]
    },
    {
      category: 'Cognitive & Learning',
      icon: Type,
      features: [
        'Clear, simple language',
        'Consistent navigation structure',
        'Error prevention and correction',
        'Help and support documentation',
        'Progress indicators',
        'Multiple ways to access content'
      ]
    },
    {
      category: 'Multilingual Support',
      icon: Languages,
      features: [
        '10 supported languages: English, Spanish, French, German, Polish, Romanian, Bulgarian, Hindi, Urdu, Arabic',
        'Automatic language detection',
        'Language switcher in header',
        'RTL (Right-to-Left) support for Arabic and Urdu',
        'Localized content and interface',
        'Language-specific date and number formats'
      ]
    },
    {
      category: 'Device Compatibility',
      icon: Monitor,
      features: [
        'Responsive design for all screen sizes',
        'Mobile-optimized interface',
        'Tablet-friendly layouts',
        'Touch and mouse input support',
        'Works with assistive technologies',
        'Cross-browser compatibility'
      ]
    }
  ];

  const keyboardShortcuts = [
    { keys: 'Alt + A', action: 'Open accessibility toolbar' },
    { keys: 'Alt + S', action: 'Skip to main content' },
    { keys: 'Alt + L', action: 'Focus language switcher' },
    { keys: 'Alt + H', action: 'Go to home/dashboard' },
    { keys: 'Alt + T', action: 'Toggle theme' },
    { keys: 'Tab', action: 'Navigate between elements' },
    { keys: 'Enter / Space', action: 'Activate buttons and links' },
    { keys: 'Esc', action: 'Close dialogs and menus' },
    { keys: 'Ctrl + B', action: 'Toggle sidebar' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Accessibility Features</h1>
        <p className="text-gray-600">
          Comprehensive accessibility support for all users, including those with disabilities
        </p>
      </div>

      {/* Accessibility Features Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {accessibilityFeatures.map((category, index) => {
          const Icon = category.icon;
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-blue-600" />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Keyboard Shortcuts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Keyboard Shortcuts
          </CardTitle>
          <CardDescription>
            Use these keyboard shortcuts to navigate and interact with the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {keyboardShortcuts.map((shortcut, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">{shortcut.action}</span>
                <kbd className="px-3 py-1 bg-white border rounded text-sm font-mono shadow-sm">
                  {shortcut.keys}
                </kbd>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* WCAG Compliance */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            WCAG 2.1 AA Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">Perceivable</span>
              <Badge variant="default" className="bg-green-600">Compliant</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Operable</span>
              <Badge variant="default" className="bg-green-600">Compliant</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Understandable</span>
              <Badge variant="default" className="bg-green-600">Compliant</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Robust</span>
              <Badge variant="default" className="bg-green-600">Compliant</Badge>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            This platform meets WCAG 2.1 Level AA standards, ensuring accessibility for users with 
            various disabilities including visual, auditory, motor, and cognitive impairments.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessibilityFeatures;

