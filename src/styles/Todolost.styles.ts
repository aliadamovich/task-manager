import { SxProps, useTheme } from "@mui/material"
//пример написания стилей в MUI в виде объекта для sx
// export const buttonContainerSX: SxProps = {
//   display: "flex",
//   justifyContent: "space-between",
// };

//если у нас есть какая то логика по вычислению св-в в зависимости от просов то в виде функции
//в компоненте в sx прописываем этот объект либо функцию c вызываемым аргументом

//как пример того же самого функционала что и ниже, но с помощью reusable component и styled()
// type IsDoneType = {
//   isDone: boolean;
// };
// export const StyledListItem = styled(ListItem)<IsDoneType>(({ isDone }) => ({
//   justifyContent: "space-between",
//   padding: 0,
//   opacity: isDone ? 0.3 : 1,

//   "&:hover": {
//     background: "#ededed6d",
//     borderRadius: "4px",
//     button: {
//       display: "block",
//     },
//   },
// }));

//стиль для заголовка тудулиста
export const TaskEditableSpanBoxSX = (isDone: boolean): SxProps => ({
	opacity: isDone ? 0.3 : 1,
	display: "flex",
	marginBottom: "8px",
	alignItems: 'center'
})

export const todolistTitleStyle = {
	margin: "10px 0 20px",
	fontSize: "24px",
	fontWeight: "500",
}

export const ItemWithHoverStyle = (theme: any): SxProps => ({
	flexGrow: 1,
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	transition: "all 0.3s ease 0s",
	color: "dark-grey",
	cursor: 'pointer',
	gap: "7px",
	padding: '2px 5px',
	button: {
		opacity: "0",
		visibility: "hidden",
	},

	"&:hover": {
		// background: "#ededed6d",
		background: `${theme.palette.primary.light}`,
		borderRadius: "6px",
		button: {
			opacity: "1",
			visibility: "visible",
		},
	},
})

export const popoverWIthColor = (priorityColor: string): SxProps => ({
	position: "relative",
	"&::before": {
		content: "''",
		width: "8px",
		height: "8px",
		marginRight: "8px",
		backgroundColor: priorityColor,
		display: "inline-block",
		borderRadius: "50%",
		verticalAlign: "middle",
	},
})
