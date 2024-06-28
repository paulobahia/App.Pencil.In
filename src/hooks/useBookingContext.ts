import { BookingContext, BookingContextType } from '@/context/BookingContext';
import { useContext } from 'react';

export const useBookingContext = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookingContext must be used within a BookingProvider');
  }
  return context;
};