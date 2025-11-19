import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';

export const CookieConsent = () => {
  const { currentLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always required
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setOpen(true);
    }
  }, []);

  const handleAcceptAll = () => {
    setPreferences({
      necessary: true,
      analytics: true,
      marketing: true
    });
    saveConsent(true, true, true);
  };

  const handleAcceptSelected = () => {
    saveConsent(preferences.necessary, preferences.analytics, preferences.marketing);
  };

  const handleRejectAll = () => {
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false
    });
    saveConsent(true, false, false);
  };

  const saveConsent = (necessary, analytics, marketing) => {
    const consent = {
      necessary,
      analytics,
      marketing,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    setOpen(false);
  };

  const texts = {
    de: {
      title: 'Cookie-Zustimmung',
      description: 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und unsere Dienste zu analysieren. Sie können Ihre Präferenzen unten auswählen.',
      necessary: 'Notwendige Cookies',
      necessaryDesc: 'Erforderlich für die Grundfunktionen der Website. Diese können nicht deaktiviert werden.',
      analytics: 'Analyse-Cookies',
      analyticsDesc: 'Helfen uns zu verstehen, wie Besucher mit der Website interagieren.',
      marketing: 'Marketing-Cookies',
      marketingDesc: 'Werden verwendet, um relevante Werbung und Marketingkampagnen bereitzustellen.',
      acceptAll: 'Alle akzeptieren',
      acceptSelected: 'Ausgewählte akzeptieren',
      rejectAll: 'Alle ablehnen',
      save: 'Einstellungen speichern'
    },
    en: {
      title: 'Cookie Consent',
      description: 'We use cookies to improve your experience and analyze our services. You can select your preferences below.',
      necessary: 'Necessary Cookies',
      necessaryDesc: 'Required for basic website functionality. These cannot be disabled.',
      analytics: 'Analytics Cookies',
      analyticsDesc: 'Help us understand how visitors interact with the website.',
      marketing: 'Marketing Cookies',
      marketingDesc: 'Used to deliver relevant advertising and marketing campaigns.',
      acceptAll: 'Accept All',
      acceptSelected: 'Accept Selected',
      rejectAll: 'Reject All',
      save: 'Save Preferences'
    },
    es: {
      title: 'Consentimiento de Cookies',
      description: 'Utilizamos cookies para mejorar su experiencia y analizar nuestros servicios. Puede seleccionar sus preferencias a continuación.',
      necessary: 'Cookies Necesarias',
      necessaryDesc: 'Requeridas para la funcionalidad básica del sitio web. No se pueden desactivar.',
      analytics: 'Cookies de Análisis',
      analyticsDesc: 'Nos ayudan a entender cómo los visitantes interactúan con el sitio web.',
      marketing: 'Cookies de Marketing',
      marketingDesc: 'Se utilizan para entregar publicidad relevante y campañas de marketing.',
      acceptAll: 'Aceptar Todo',
      acceptSelected: 'Aceptar Seleccionadas',
      rejectAll: 'Rechazar Todo',
      save: 'Guardar Preferencias'
    }
  };

  const t = texts[currentLanguage] || texts.de;

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-start space-x-3 p-4 border rounded-lg">
            <Checkbox checked={preferences.necessary} disabled />
            <div className="flex-1">
              <label className="font-medium">{t.necessary}</label>
              <p className="text-sm text-gray-600">{t.necessaryDesc}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 border rounded-lg">
            <Checkbox 
              checked={preferences.analytics} 
              onCheckedChange={(checked) => 
                setPreferences({ ...preferences, analytics: !!checked })
              }
            />
            <div className="flex-1">
              <label className="font-medium">{t.analytics}</label>
              <p className="text-sm text-gray-600">{t.analyticsDesc}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 border rounded-lg">
            <Checkbox 
              checked={preferences.marketing} 
              onCheckedChange={(checked) => 
                setPreferences({ ...preferences, marketing: !!checked })
              }
            />
            <div className="flex-1">
              <label className="font-medium">{t.marketing}</label>
              <p className="text-sm text-gray-600">{t.marketingDesc}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleRejectAll}>
            {t.rejectAll}
          </Button>
          <Button variant="outline" onClick={handleAcceptSelected}>
            {t.save}
          </Button>
          <Button onClick={handleAcceptAll}>
            {t.acceptAll}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CookieConsent;

