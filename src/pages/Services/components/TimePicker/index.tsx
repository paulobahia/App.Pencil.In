import { Button } from "@/components/ui/button"
import { DialogTrigger } from "@/components/ui/dialog"
import { convertMinutesToTime } from "@/lib/utils"
import dayjs from "dayjs"
import 'dayjs/locale/pt-br'
import { useEffect, useRef } from "react"

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

const availability: Availability = {
  availableTimes: [
    510,
    540,
    570,
    630,
    660,
    690,
    720,
    750,
    780,
    810,
    840,
    870,
    900,
    930,
    960,
    990,
    1050,
    1080,
    1110,
    1140,
    1200,
    1230,
    1260,
    1320
  ],
  possibleTimes: [
    480,
    510,
    540,
    570,
    600,
    630,
    660,
    690,
    720,
    750,
    780,
    810,
    840,
    870,
    900,
    930,
    960,
    990,
    1020,
    1050,
    1080,
    1110,
    1140,
    1170,
    1200,
    1230,
    1260,
    1290,
    1320
  ]
}

interface TimePickerProps {
  selectedDate: Date | null
  onSubmit: (hour: number) => void
}

export const TimePicker: React.FC<TimePickerProps> = ({ selectedDate, onSubmit }) => {

  const timePickerRef = useRef<HTMLDivElement>(null)

  const weekDay = selectedDate ? dayjs(selectedDate).locale('pt-br').format('ddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).locale('pt-br').format('YYYY')
    : null

  useEffect(() => {
    if (timePickerRef.current) {
      timePickerRef.current.focus()
      timePickerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [])

  return (
    <div ref={timePickerRef} className='flex flex-col w-full'>
      <div className='flex flex-row gap-1'>
        <span className='font-medium text-neutral-200 text-[14px]'>{weekDay}</span>
        <span className='font-normal text-neutral-400 text-[14px]'>{describedDate}</span>
      </div>
      <div className='grid grid-cols-3 gap-2 mt-3'>
        {availability.possibleTimes.map((hour) => {
          return (
            <DialogTrigger key={hour} asChild>
              <Button
                onClick={() => onSubmit(hour)}
                key={hour}
                variant={"outline"}
                disabled={!availability.availableTimes.includes(hour)}
                className='relative flex flex-col items-center justify-center flex-grow w-full h-auto px-4 py-2 mb-2 text-sm font-medium transition border rounded-md whitespace-nowrap disabled:cursor-not-allowed text-emphasis border-default bg-default hover:bg-muted focus-visible:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-empthasis disabled:border-subtle disabled:bg-opacity-30 disabled:text-muted disabled:hover:bg-opacity-30 disabled:hover:text-muted disabled:hover:border-subtle disabled:hover:bg-default min-h-9 hover:border-brand-default undefined'>
                {convertMinutesToTime(hour)}
              </Button>
            </DialogTrigger>
          )
        })}
      </div>
    </div>
  )
}