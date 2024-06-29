import { NotificationContext, NotificationContextType } from '@/context/NotificationContext';
import { useContext } from 'react';

export const useNotificationContext = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};