import React from 'react';

export type DrawerContextValue = {
  openDrawer: () => void;
  closeDrawer: () => void;
};

export const DrawerContext = React.createContext<DrawerContextValue>({
  openDrawer: () => {},
  closeDrawer: () => {},
});

