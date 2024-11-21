import { baseApi } from "app/baseApi"
import { instance } from "common/axios-instance/instance"
import { BaseResponseType } from "common/types/types"
import { LoginType, UserType } from "features/login/api/authApi.types"


export const authAPI = baseApi.injectEndpoints({
	endpoints: (build) => ({
		login: build.mutation<BaseResponseType<{ userId: number }>, LoginType>({
			query: (data) => {
				return {
					url: "auth/login",
					method: "POST",
					body: data
				}
			},
		}),
		logout: build.mutation<BaseResponseType, void>({
			query: () => {
				return {
					url: "auth/login",
					method: "DELETE",
				}
			},
		}),
		me: build.query<BaseResponseType<UserType>, void>({
			query: () => "auth/me",
		}),
	}),
})
export const {useLoginMutation, useLogoutMutation, useMeQuery} = authAPI

