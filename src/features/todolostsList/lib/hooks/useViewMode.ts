import { ViewModeContext } from "app/providers/ViewModeContext.ts/ViewModeContext"
import { useContext } from "react"

export const useViewMode = () => {
	const context = useContext(ViewModeContext)

	if (!context) throw new Error('Component should be rendered inside the context')

		return context
}