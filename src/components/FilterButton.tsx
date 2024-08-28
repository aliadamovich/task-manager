import { Button, ButtonProps } from "@mui/material";
import React from "react";

//взяли типы из MUI и оюъединили их с нашим типом на сучай если понадобится в будущем свои пропсы передать
type ButtonPropsType = ButtonProps & {

}

export const FilterButton = React.memo(({ children, onClick, variant }: ButtonPropsType) => {
	console.log('filter');
	return (
		<Button
			size="small" variant={variant}
			onClick={onClick}>
			{children}
		</Button>
	)
})