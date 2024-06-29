import React, { createContext, useState } from 'react';

export type NotificationContextType = {
  isDeniedNotification: boolean;
  setIsDeniedNotification: React.Dispatch<React.SetStateAction<boolean>>
};

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

type NotificationProviderProps = {
  children: React.ReactNode;
};

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [isDeniedNotification, setIsDeniedNotification] = useState<boolean>(false);

  return (
    <NotificationContext.Provider
      value={{
        isDeniedNotification,
        setIsDeniedNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
