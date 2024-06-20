import logo from '@/assets/logo.svg'
import { AccordionServices, Calendar, TimePicker } from './components'
import { useState } from 'react'

export const Services = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedServices, setSelectedServices] = useState<Array<string>>([])

  const isServicesSelected = selectedServices.length > 0
  const isDateSelected = !!selectedDate

  function handleServiceSelected(serviceId: string) {
    setSelectedServices(state => {
      if (state.includes(serviceId)) {
        return state.filter(service => service !== serviceId);
      } else {
        return [...state, serviceId];
      }
    });
  }

  return (
    <main className="flex justify-center min-h-screen antialiased bg-background">
      <div className="flex flex-col items-center justify-start w-screen max-w-5xl gap-2 p-5">
        <img src={logo} alt="Logo" className='rounded-full size-20' />
        <div className='flex flex-col items-center'>
          <span className='text-[14px] font-medium'>Laura Fernandes</span>
          <span className='font-normal text-neutral-500'>Laura Fernandes - Brow Designer & Skin Care</span>
        </div>
        <AccordionServices selectedServices={selectedServices} onServiceSelected={handleServiceSelected} />
        {
          isServicesSelected &&
          <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />
        }
        {
          isDateSelected &&
          <TimePicker selectedDate={selectedDate} />
        }
      </div>
    </main>
  )
}