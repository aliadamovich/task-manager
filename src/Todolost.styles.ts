import {SxProps } from '@mui/material'

//пример написания стилей в MUI в виде объекта для sx
export const buttonContainerSX: SxProps = {
  display: "flex",
  justifyContent: "space-between",
};

//если у нас есть какая то логика по вычислению св-в в зависимости от просов то  в виде функции 
export const getListItemSx = (isDone: boolean): SxProps => ({
	justifyContent: 'space-between', 
	opacity: isDone ? 0.3 : 1 }
);


//в компоненте в sx прописываем этот объект либо функцию c вызываемым аргументом