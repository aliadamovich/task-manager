import {SxProps } from '@mui/material'

//пример написания стилей в MUI в виде объекта для sx
// export const buttonContainerSX: SxProps = {
//   display: "flex",
//   justifyContent: "space-between",
// };

//если у нас есть какая то логика по вычислению св-в в зависимости от просов то в виде функции 
//в компоненте в sx прописываем этот объект либо функцию c вызываемым аргументом

export const getListItemSx = (isDone: boolean): SxProps => ({
	justifyContent: 'space-between', 
	opacity: isDone ? 0.3 : 1,

	"&:hover": {
    background: "#ededed6d",
    borderRadius: "4px",
    button: {
      display: "block",
    },
  },
}
);
//как пример того же самого функционала что и выше, но с помощью reusable component и styled()
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


export const editableSpanSx = (isHeader: boolean): SxProps => ({
  flexGrow: 1,
  cursor: "pointer",
	// fontWeight: isHeader ? 500 : 400,
	// fontSize: 
});

export const todolistTitleStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "10px 0 20px",
  fontSize: "22px",
	fontWeight: '500'
};




