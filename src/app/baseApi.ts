import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
	reducerPath: "todolistsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_BASE_URL,
		credentials: "include",
		prepareHeaders: (headers) => {
			headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`)
			headers.set("Authorization", `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`)
		},
	}),
	endpoints: () => ({}),
	tagTypes: ["Todolist", "Tasks"],
})
