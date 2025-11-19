import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  Accessibility, 
  Type, 
  Contrast, 
  Volume2,
  X
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const AccessibilityControls = () => {
  const { currentLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [textToSpeech, setTextToSpeech] = useState(false);

  useEffect(() => {
    // Apply font size
    document.documentElement.style.fontSize = `${fontSize}px`;
    
    // Apply high contrast
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    return () => {
      document.documentElement.style.fontSize = '';
      document.documentElement.classList.remove('high-contrast');
    };
  }, [fontSize, highContrast]);

  const texts = {
    de: {
      title: 'Barrierefreiheit',
      description: 'Passen Sie die Einstellungen an, um die Benutzerfreundlichkeit zu verbessern',
      fontSize: 'Schriftgröße',
      highContrast: 'Hoher Kontrast',
      highContrastDesc: 'Erhöht den Kontrast für bessere Lesbarkeit',
      textToSpeech: 'Text-zu-Sprache',
      textToSpeechDesc: 'Vorlesen von Inhalten aktivieren',
      close: 'Schließen',
      reset: 'Zurücksetzen'
    },
    en: {
      title: 'Accessibility',
      description: 'Adjust settings to improve usability',
      fontSize: 'Font Size',
      highContrast: 'High Contrast',
      highContrastDesc: 'Increase contrast for better readability',
      textToSpeech: 'Text to Speech',
      textToSpeechDesc: 'Enable reading content aloud',
      close: 'Close',
      reset: 'Reset'
    },
    es: {
      title: 'Accesibilidad',
      description: 'Ajuste la configuración para mejorar la usabilidad',
      fontSize: 'Tamaño de Fuente',
      highContrast: 'Alto Contraste',
      highContrastDesc: 'Aumentar el contraste para mejor legibilidad',
      textToSpeech: 'Texto a Voz',
      textToSpeechDesc: 'Habilitar lectura de contenido en voz alta',
      close: 'Cerrar',
      reset: 'Resetear'
    }
  };

  const t = texts[currentLanguage] || texts.de;

  const handleReset = () => {
    setFontSize(16);
    setHighContrast(false);
    setTextToSpeech(false);
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg"
        aria-label={t.title}
      >
        <Accessibility className="h-5 w-5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Accessibility className="h-5 w-5" />
              {t.title}
            </DialogTitle>
            <DialogDescription>{t.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Font Size */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  {t.fontSize}
                </label>
                <span className="text-sm text-gray-600">{fontSize}px</span>
              </div>
              <Slider
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
                min={12}
                max={24}
                step={1}
                className="w-full"
              />
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Contrast className="h-4 w-4" />
                  <label className="text-sm font-medium">{t.highContrast}</label>
                </div>
                <p className="text-xs text-gray-600">{t.highContrastDesc}</p>
              </div>
              <Switch
                checked={highContrast}
                onCheckedChange={setHighContrast}
              />
            </div>

            {/* Text to Speech */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Volume2 className="h-4 w-4" />
                  <label className="text-sm font-medium">{t.textToSpeech}</label>
                </div>
                <p className="text-xs text-gray-600">{t.textToSpeechDesc}</p>
              </div>
              <Switch
                checked={textToSpeech}
                onCheckedChange={setTextToSpeech}
              />
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleReset}>
              {t.reset}
            </Button>
            <Button onClick={() => setOpen(false)}>
              {t.close}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AccessibilityControls;

