import { Button } from "@/components/ui/button"
import dayjs from "dayjs"

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

const availability: Availability = {
  availableTimes: [8, 9, 10, 11, 12, 13, 14, 16, 18, 19, 20, 21, 22],
  possibleTimes: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
}

interface TimePickerProps {
  selectedDate: Date | null
}

export const TimePicker: React.FC<TimePickerProps> = ({ selectedDate }) => {

  const weekDay = selectedDate ? dayjs(selectedDate).locale('pt-br').format('ddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).locale('pt-br').format('YYYY')
    : null

  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-row gap-1'>
        <span className='font-medium text-neutral-200 text-[14px]'>{weekDay}</span>
        <span className='font-normal text-neutral-400 text-[14px]'>{describedDate}</span>
      </div>
      <div className='grid grid-cols-3 gap-2 mt-3'>
        {availability.possibleTimes.map((hour) => {
          return (
            <Button
              key={hour}
              variant={"outline"}
              disabled={!availability.availableTimes.includes(hour)}
              className='relative flex flex-col items-center justify-center flex-grow w-full h-auto px-4 py-2 mb-2 text-sm font-medium transition border rounded-md whitespace-nowrap disabled:cursor-not-allowed text-emphasis border-default bg-default hover:bg-muted focus-visible:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-empthasis disabled:border-subtle disabled:bg-opacity-30 disabled:text-muted disabled:hover:bg-opacity-30 disabled:hover:text-muted disabled:hover:border-subtle disabled:hover:bg-default min-h-9 hover:border-brand-default undefined'>
              {String(hour).padStart(2, '0')}:00
            </Button>
          )
        })}
      </div>
    </div>
  )
}