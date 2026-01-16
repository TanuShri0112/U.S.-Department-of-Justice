import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const MultilingualText = ({ children, className = "", ...props }) => {
  const { currentLanguage } = useLanguage();
  
  // Handle different types of content
  if (typeof children === 'string') {
    return <span className={className} {...props}>{children}</span>;
  }
  
  if (Array.isArray(children)) {
    return (
      <span className={className} {...props}>
        {children.map((text, index) => {
          if (typeof text === 'string') {
            return <span key={index}>{text}</span>;
          }
          if (typeof text === 'object' && text[currentLanguage]) {
            return <span key={index}>{text[currentLanguage]}</span>;
          }
          return null;
        })}
      </span>
    );
  }
  
  if (typeof children === 'object' && children[currentLanguage]) {
    return <span className={className} {...props}>{children[currentLanguage]}</span>;
  }
  
  return <span className={className} {...props}>{children}</span>;
};

export default MultilingualText;