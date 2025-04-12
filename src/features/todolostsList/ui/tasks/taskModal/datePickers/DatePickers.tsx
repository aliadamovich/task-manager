import { formatToDate } from "features/todolostsList/lib/utils/formateDate";
import { DatePicker, PickersDay } from '@mui/x-date-pickers'
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Dayjs } from 'dayjs';


type Props = {
	name: string
	initialDate: string
	disabled?: boolean
	onChange: ({field, date}:{field: string, date: Dayjs}) => void
}

export const CustomDatePicker = ({ name, initialDate, disabled, onChange }: Props ) => {
	const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
	const StyledButton = styled(IconButton)(({ theme }) => ({
		borderRadius: theme.shape.borderRadius,
	}));

	const StyledDay = styled(PickersDay)(({ theme }) => ({
		borderRadius: theme.shape.borderRadius,
		color: theme.palette.secondary.light,
		...theme.applyStyles('light', {
			color: theme.palette.secondary.dark,
		}),
	}));

	const onChangeHandler = (newDate: Dayjs | null ) => {
		if (!newDate) return
		onChange({field: name, date: newDate })
	}

	return (
			<>
				<DatePicker
					format="DD/MM/YYYY"
					label={capitalize(name)}
					value={formatToDate(initialDate)}
					onChange={onChangeHandler}
					disabled={disabled}
					slots={{
						openPickerIcon: EditCalendarRoundedIcon,
						openPickerButton: StyledButton,
						day: StyledDay,
					}}
					slotProps={{
						openPickerIcon: { fontSize: 'small' },
						openPickerButton: { color: 'secondary' },
						textField: {
							variant: 'outlined',
							focused: true,
							color: 'secondary',
							error: false,
						},
					}}
				/>
			</>
	)
}