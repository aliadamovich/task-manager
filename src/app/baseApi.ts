import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { handleError } from "common/utils/handleErrors"

export const baseApi = createApi({
	baseQuery: async (args, api, extraOptions) => {
		const result = await fetchBaseQuery({
			baseUrl: process.env.REACT_APP_BASE_URL,
			credentials: "include",
			prepareHeaders: (headers) => {
				const token = localStorage.getItem('token')
				if (token) {
					headers.set("Authorization", `Bearer ${token}`)
				}
				headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`)
			},
		})(args, api, extraOptions)
		
		handleError(api, result)

		return result
	},
	endpoints: () => ({}),
	tagTypes: ["Todolist", "Tasks"],
	keepUnusedDataFor: 60,
	refetchOnFocus: true,
	refetchOnReconnect: true
})