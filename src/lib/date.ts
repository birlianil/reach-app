import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export function toLocal(iso: string, tz?: string) {
  if (tz) return dayjs.utc(iso).tz(tz)
  return dayjs(iso)
}

export function toIsoUtc(date: Date) {
  return dayjs(date).utc().toISOString()
}
