import { instance } from "common/axios-instance/instance"
import { BaseResponseType } from "common/types/types"
import { LoginType, UserType } from "features/login/api/authApi.types"

export const authAPI = {
	login(data: LoginType) {
		return instance.post<
			 BaseResponseType<{
				userId: number
			}>
		>("auth/login", data)
	},

	logout() {
		return instance.delete<BaseResponseType<{}>>("auth/login")
	},

	me() {
		return instance.get<BaseResponseType<UserType>>("auth/me")
	},
}
