import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { TaskPriorities } from 'features/todolostsList/lib/enums/enum';
import { popoverWIthColor } from 'styles/Todolost.styles';
import { priorityOptions } from './taskModal/taskSelects/TaskSelects';

type Props = {
	priority: TaskPriorities
}

export const TaskPriorityPopover = ({priority}: Props) => {
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
	const priorityLabel = priorityOptions.find(o => o.value === priority.toString())?.label
	const priorityColor = priorityOptions.find(o => o.value === priority.toString())?.color;
	
	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return (
		<div>
			<Typography sx={popoverWIthColor(priorityColor || '#000')}
				aria-owns={open ? 'mouse-over-popover' : undefined}
				aria-haspopup="true"
				onMouseEnter={handlePopoverOpen}
				onMouseLeave={handlePopoverClose}
			>
			</Typography>
			<Popover
				id="mouse-over-popover"
				sx={{ pointerEvents: 'none' }}
				open={open}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				onClose={handlePopoverClose}
				disableRestoreFocus
			>
				<Typography sx={{ p: 1 }} variant='body2'>Priority: {priorityLabel}</Typography>
			</Popover>
		</div>
	);
}
