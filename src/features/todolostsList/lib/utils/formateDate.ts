import { format } from "date-fns"
import dayjs, { Dayjs } from "dayjs"

export const formatDate = (dateStr: string | null) => {
	if (!dateStr) return ''
	const date = new Date(dateStr)
	return format(date, 'dd.MM.yyyy HH:mm')
}

export const formatToDate = (dateString: string): Dayjs => {
  return dayjs(dateString); 
};