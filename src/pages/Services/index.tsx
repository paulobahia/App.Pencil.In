import logo from '@/assets/logo.svg'
import { AccordionServices, Calendar, SchedulingConfirmationDialog, TimePicker } from './components'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { Dialog } from "@/components/ui/dialog"

interface ServiceType {
  id: string;
  name: string;
  price: string;
  time: number;
}

const fakeServices: ServiceType[] = [
  {
    id: '1',
    name: 'Sobrancelha',
    price: '40,00',
    time: 60
  },
  {
    id: '2',
    name: 'Limpeza de Pele',
    price: '80,00',
    time: 138
  },
  {
    id: '3',
    name: 'Dermaplaning',
    price: '100,00',
    time: 78
  },
  {
    id: '4',
    name: 'Consultoria',
    price: '150,00',
    time: 120
  }
]

export const Services = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const name = searchParams.get('name');
  const phone = searchParams.get('phone');

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<number | null>(null)
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

  function handleSubmitTime(hour: number) {
    setSelectedTime(hour)
    console.log(id)
    console.log(name)
    console.log(phone)
    console.log(hour)
  }

  return (
    <main className="flex justify-center min-h-screen antialiased bg-background">
      <Dialog>
        <div className="flex flex-col items-center justify-start w-screen max-w-5xl gap-2 p-5">
          <img src={logo} alt="Logo" className='rounded-full size-20' />
          <div className='flex flex-col items-center'>
            <span className='text-[14px] font-medium'>Laura Fernandes</span>
            <span className='font-normal text-neutral-500'>Laura Fernandes - Brow Designer & Skin Care</span>
          </div>
          <AccordionServices selectedServices={selectedServices} onServiceSelected={handleServiceSelected} services={fakeServices} />
          {
            isServicesSelected &&
            <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />
          }
          {
            isDateSelected &&
            <TimePicker selectedDate={selectedDate} onSubmit={handleSubmitTime} />
          }
        </div>
        <SchedulingConfirmationDialog services={fakeServices} name={name} phone={phone} selectedTime={selectedTime} selectedDate={selectedDate} selectedServices={selectedServices}/>
      </Dialog>
    </main >
  )
}