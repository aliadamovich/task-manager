import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, useContext, useState } from "react";
import React from "react";


//React.createContext(): Это функция, которая создаёт контекст и позволяет передать данные без необходимости прокидывания пропсов,. Функция создает объект Provider Consumer - для управления и получения контекста
//Она принимает один аргумент — значение по умолчанию для этого контекста.
//в данном примере принимает объект с единственной функцией пустой toggleColorMode внутри - загушкой - на случай если контекст не будет обеспечен (важно чтобы избежать ошибок)
export const ColorModeContext = createContext({ toggleColorMode: () => {} })


//создаю компоненту которая имеет всю логику + возвращает две обёртки - одну с контекстом для ночного режима, вторую для доступа к  темам
export const ColorModeProvider = ({ children }: { children: React.ReactNode }) => {
	const [mode, setMode] = useState<'light' | 'dark'>('light');

	//объект который отдаем консюмеру контекста (в нем метод который меняет режим)
	const colorMode = {
		toggleColorMode: () => {
			setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light' ))
		}
	}

	const theme = createTheme({
		palette: {
			primary: {
				main: "#8bd5e4",
			},
			secondary: {
				main: "#AE86A0",
			},
			// mode: isLight ? "light" : "dark",
			mode
		},
		typography: {
			fontFamily: "Montserrat, sans-serif",
			fontSize: 14
		},
});
	return (
		//в провайдере контекста передаем объект colorMode с нашим методом, в компоненте где нужен этот контекст(у нас - Header) вызываем useContext и поллучаем доступ к объекту и его методу
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ColorModeContext.Provider>
	)
}
