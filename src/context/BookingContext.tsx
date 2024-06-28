import React, { createContext, useState } from 'react';

export type BookingContextType = {
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>
  selectedTime: number | null;
  setSelectedTime: React.Dispatch<React.SetStateAction<number | null>>
  selectedServices: string[];
  setSelectedServices: React.Dispatch<React.SetStateAction<string[]>>
  isPendingConfirmation: boolean;
  setIsPendingConfirmation: React.Dispatch<React.SetStateAction<boolean>>
  isServicesSelected: boolean;
  isDateSelected: boolean;
  reset(): void
};

export const BookingContext = createContext<BookingContextType | undefined>(undefined);

type BookingProviderProps = {
  children: React.ReactNode;
};

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isPendingConfirmation, setIsPendingConfirmation] = useState<boolean>(false);

  const isServicesSelected = selectedServices.length > 0;
  const isDateSelected = !!selectedDate;

  function reset () {
    setSelectedDate(null)
    setSelectedTime(null)
    setSelectedServices([])
    setIsPendingConfirmation(false)
  }

  return (
    <BookingContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        selectedServices,
        setSelectedServices,
        isPendingConfirmation,
        setIsPendingConfirmation,
        isServicesSelected,
        isDateSelected,
        reset
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
