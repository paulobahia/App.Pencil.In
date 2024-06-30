import { useMemo, useState } from "react"
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getWeekDays } from "@/lib/utils"
import { useBookingContext } from "@/hooks/useBookingContext"

interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

type CalendarWeeks = CalendarWeek[]

export const Calendar: React.FC = () => {

  const {
    selectedDate,
    setSelectedDate,
  } = useBookingContext();

  const [currentDate, setCurrentDate] = useState(() => { return dayjs().set('date', 1) })

  const currentMonth = currentDate.locale('pt-br').format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const shortWeekDays = getWeekDays({ short: true })

  function handlePreviousMonth() {
    const previousMonth = currentDate.subtract(1, 'month')
    setCurrentDate(previousMonth)
  }

  function handleNextMonth() {
    const nextMonth = currentDate.add(1, 'month')
    setCurrentDate(nextMonth)
  }

  const calendarWeeks = useMemo(() => {

    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })

    const firstWeekDay = currentDate.get('day')

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, 'day')
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
      ...daysInMonthArray.map((date) => {
        return {
          date,
          disabled:
            date.endOf('day').isBefore(new Date())
        }
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }

        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate])

  function isDateInCurrentMonth(date: dayjs.Dayjs): boolean {
    return date.year() === currentDate.year() && date.month() === currentDate.month();
  }

  function isCurrentDay(date: dayjs.Dayjs): boolean {
    const currentDate = dayjs();

    return date.isSame(currentDate, 'day');
  }

  function isSelectedDate(date: dayjs.Dayjs) {
    return date.isSame(selectedDate, 'day')
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between">
        <div className="font-medium capitalize text-neutral-200">
          {currentMonth} <span>{currentYear}</span>
        </div>
        <div className="flex gap-1 text-neutral-200">
          <Button onClick={handlePreviousMonth} variant="link" size={"icon"} title="Previous month" className="leading-none rounded-sm">
            <ChevronLeft className="size-5" />
          </Button>
          <Button onClick={handleNextMonth} variant="link" size={"icon"} title="Next month" className="leading-none rounded-sm">
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-7 gap-4 mb-2 text-center border-t border-b">
          {shortWeekDays.map((weekDay, index) => (
            <div key={index} className="my-4 text-xs font-medium tracking-widest uppercase text-emphasis">
              {weekDay}
            </div>
          ))}
        </div>
        <div className="relative grid grid-cols-7 grid-rows-6 gap-1 text-center">
          {calendarWeeks.map(({ days }) => {
            return days.map(({ date, disabled }) => {
              return (
                isDateInCurrentMonth(date)
                  ?
                  <div className="relative w-full pt-[100%]" key={date.toString()} >
                    <Button
                      onClick={() => setSelectedDate(date.toDate())}
                      disabled={disabled}
                      className={`absolute top-0 left-0 right-0 w-full mx-auto text-[14px] sm:text-lg font-medium bg-secondary hover:bg-[#6D28D9] size-full text-white text-center transition rounded-md disabled:cursor-default disabled:font-normal disabled:bg-transparent ${isSelectedDate(date) ? 'bg-[#6D28D9] hover:bg-[#6D28D9]' : 'bg-secondary hover:bg-secondary'}`}>
                      {date.get('date')}
                      {isCurrentDay(date) && <span className="bg-white absolute bottom-[23%] rounded-full size-[10%]" />}
                    </Button>
                  </div>
                  :
                  <div key={date.toString()} />
              )
            })
          })}
        </div>
      </div>
    </div >
  )
}