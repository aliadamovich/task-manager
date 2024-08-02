import React from 'react'
import {styled} from '@mui/material/styles'
import Button from '@mui/material/Button'
import { ListItem } from '@mui/material';


export const MenuButton = styled(Button)({
	minWidth: '110px',
	fontWeight: 'bold',
	boxShadow: '0 0 0 2px #054B62, 4px 4px 0 0 #054B62',
	borderRadius: '2px',
	textTransform: 'capitalize',
	margin: '0 10px',
	padding: '8px 24px',
	color: '#ffffff',
	background: '#1565c0',
})


type FilterButtonPropsType = {
  filter?: string;
};

export const FilterButton = styled(Button)<FilterButtonPropsType>(({filter, theme}) => ({
	background: filter || theme.palette.primary.main,
}))

type IsDoneType = {
	isDone: boolean
}
export const StyledListItem = styled(ListItem)<IsDoneType>(({ isDone }) => ({
  justifyContent: "space-between",
  padding: 0,
  opacity: isDone ? 0.3 : 1,
	

  "&:hover": {
    background: "#ededed6d",
    borderRadius: "4px",
    button: {
      display: "block",
    },
  },
}));