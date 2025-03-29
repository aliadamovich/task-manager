import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setAppError } from "./appSlice"
import { ResultCode } from "common/enums/enum"
import { handleError } from "common/utils/handleErrors"

// export const baseApi = createApi({
// 	reducerPath: "todolistsApi",
// 	baseQuery: fetchBaseQuery({
// 		baseUrl: process.env.REACT_APP_BASE_URL,
// 		credentials: "include",
// 		prepareHeaders: (headers) => {
// 			headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`)
// 			headers.set("Authorization", `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`)
// 		},
// 	}),
// 	endpoints: () => ({}),
// 	tagTypes: ["Todolist", "Tasks"],
// })

// export const baseApi = createApi()(args, api, extraOptions)

// 		return result
// 	},
// })

export const baseApi = createApi({
	baseQuery: async (args, api, extraOptions) => {
		const result = await fetchBaseQuery({
			baseUrl: process.env.REACT_APP_BASE_URL,
			credentials: "include",
			prepareHeaders: (headers) => {
				headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`)
				headers.set("Authorization", `Bearer ${process.env.REACT_APP_AUTH_TOKEN2}`)
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