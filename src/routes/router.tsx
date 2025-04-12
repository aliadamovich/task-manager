import { createHashRouter, Navigate } from "react-router-dom"
import App from "../app/App"
import { AllTodolistsPage } from "features/todolostsList/ui/AllTodolistsPage"
import { LoginPage } from "features/login/ui/LoginPage"
import {  NotFoundPage } from "common/components/notFoundPage/NotFoundPage"
import { SingleTodolistPage } from "features/todolostsList/ui/SingleTodolistPage"

export const PATH = {
	ROOT: "/",
	LOGIN: "/login",
	TODOLISTS: "/todolists",
	ERROR: "404",
}

export const router = createHashRouter([
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
				element: <AllTodolistsPage />,
			},
			{
				path: "todolists/:id",
				element: <SingleTodolistPage />,
			},
		],
	},
	{
		path: PATH.LOGIN,
		element: <LoginPage />,
	},
	{
		path: PATH.ERROR,
		element: <NotFoundPage />,
	},
])
