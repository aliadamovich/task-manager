import { ViewModeType } from "common/types/viewTypes";
import { createContext, ReactNode, useContext, useEffect } from "react";
import { useState } from "react";

type ModeContext = {
	mode: ViewModeType
	setMode: (mode: ViewModeType) => void
}

export const ViewModeContext = createContext<ModeContext | undefined>(undefined)

export const ViewModeProvider = ({children}: {children: ReactNode}) => {

	const [mode, setMode] = useState<ViewModeType>(() => (localStorage.getItem('viewMode') as ViewModeType || 'columns')
);
	useEffect(() => {
		localStorage.setItem('viewMode', mode)
	}, [mode])
	
	const value = {
		mode, 
		setMode
	}

	return (
		<ViewModeContext.Provider value={value}>{children}</ViewModeContext.Provider>
	)
}

