import React from 'react'
import { Calendar, DateObject } from 'react-native-calendars'

interface Props {
  onSelectDate?: (date: string) => void
  minDate?: string
}

export default function CalendarPicker({ onSelectDate, minDate }: Props) {
  function handleDayPress(day: DateObject) {
    onSelectDate?.(day.dateString)
  }
  return <Calendar minDate={minDate} onDayPress={handleDayPress} />
}
