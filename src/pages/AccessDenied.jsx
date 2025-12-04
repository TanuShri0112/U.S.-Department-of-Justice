import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const messages = {
  en: {
    title: 'Access restricted',
    subtitle: 'You do not have the required role to view this page.',
    description:
      'Request the appropriate permissions from your program administrator or switch to a role with the necessary access level.',
    action: 'Go back to dashboard',
  },
  uk: {
    title: 'Доступ обмежено',
    subtitle: 'У вас немає прав для перегляду цієї сторінки.',
    description:
      'Попросіть потрібні дозволи у адміністратора програми або переключіться на роль із відповідним рівнем доступу.',
    action: 'Повернутися на панель',
  },
};

const AccessDenied = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentLanguage } = useLanguage();

  const t = messages[currentLanguage] ?? messages.en;

  const handleBack = () => {
    if (location.state?.from?.pathname) {
      navigate(location.state.from.pathname);
      return;
    }
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-gray-50 px-4">
      <div className="max-w-xl w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-10 text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 bg-red-50 rounded-full">
            <ShieldAlert className="h-10 w-10 text-red-500" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">{t.title}</h1>
          <h2 className="text-lg font-medium text-gray-800">{t.subtitle}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{t.description}</p>
        </div>
        <Button onClick={handleBack} className="px-6">
          {t.action}
        </Button>
      </div>
    </div>
  );
};

export default AccessDenied;

