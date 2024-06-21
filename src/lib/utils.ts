import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

interface GetWeekDaysParams {
  short?: boolean
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getWeekDays({ short = false }: GetWeekDaysParams = {}) {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2021, 5, day))))
    .map((weekDay) => {
      if (short) {
        return weekDay.substring(0, 3).toUpperCase()
      }

      return weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1))
    })
}

export function convertMinutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = remainingMinutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
}