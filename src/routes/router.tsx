import { createBrowserRouter, Navigate } from "react-router-dom"
import App from "../app/App"
import { TodolistsList } from "features/todolostsList/ui/TodolistsList"
import { LoginPage } from "features/login/ui/LoginPage"
import { ErrorPage } from "common/components/errorPage/ErrorPage"

export const PATH = {
	ROOT: "/",
	LOGIN: "/login",
	TODOLISTS: "/todolists",
	ERROR: "404",
}

export const router = createBrowserRouter([
	{
		path: PATH.ROOT,
		element: <App />,
		errorElement: <Navigate to="404" />, //navigate указываем чтобы при неправильно введенном
		//адресе происходило перенаправление на путь 404 в адресной строке

		children: [
			{
				index: true,
				element: <Navigate to={PATH.TODOLISTS} />,
			},

			{
				path: PATH.TODOLISTS,
				element: <TodolistsList />,
			},
		],
	},
	{
		path: PATH.LOGIN,
		element: <LoginPage />,
	},
	{
		path: PATH.ERROR,
		element: <ErrorPage />,
	},
])
