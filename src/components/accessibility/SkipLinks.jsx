// IBC Tender Requirement: Skip Links for Keyboard Navigation
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SkipLinks = () => {
  const navigate = useNavigate();

  const skipLinks = [
    { id: 'main-content', label: 'Skip to main content', target: '#main-content' },
    { id: 'navigation', label: 'Skip to navigation', target: '#main-navigation' },
    { id: 'search', label: 'Skip to search', target: '#search-input' },
  ];

  const handleSkip = (target) => {
    const element = document.querySelector(target);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="skip-links">
      {skipLinks.map((link) => (
        <a
          key={link.id}
          href={link.target}
          onClick={(e) => {
            e.preventDefault();
            handleSkip(link.target);
          }}
          className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          aria-label={link.label}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};

export default SkipLinks;

