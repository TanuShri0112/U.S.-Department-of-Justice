import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const MultilingualButton = ({ text, onClick, variant = "default", size = "default", className = "", ...props }) => {
  const { currentLanguage } = useLanguage();
  
  // Handle multilingual text - expects an object with language keys
  const displayText = typeof text === 'object' && text[currentLanguage] 
    ? text[currentLanguage]
    : text;
  
  return (
    <Button 
      variant={variant}
      size={size}
      onClick={onClick}
      className={className}
      {...props}
    >
      {displayText}
    </Button>
  );
};

export default MultilingualButton;