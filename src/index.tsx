import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./app/App"
import { ColorModeProvider } from "./styles/Theme"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes/router"
import { ViewModeProvider } from "app/providers/ViewModeContext.ts/ViewModeContext"
import './styles/reset.scss'

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
	<Provider store={store}>
		<ColorModeProvider>
			<ViewModeProvider>
				<RouterProvider router={router} />
			</ViewModeProvider>
		</ColorModeProvider>
	</Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
