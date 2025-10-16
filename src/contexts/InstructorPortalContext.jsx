import React, { createContext, useContext, useState } from 'react';

const InstructorPortalContext = createContext({
  isInstructorMode: false,
  setInstructorMode: () => {},
});

export const InstructorPortalProvider = ({ children }) => {
  const [isInstructorMode, setInstructorMode] = useState(false);

  return (
    <InstructorPortalContext.Provider value={{ isInstructorMode, setInstructorMode }}>
      {children}
    </InstructorPortalContext.Provider>
  );
};

export const useInstructorPortal = () => {
  const context = useContext(InstructorPortalContext);
  if (!context) {
    throw new Error('useInstructorPortal must be used within an InstructorPortalProvider');
  }
  return context;
};
