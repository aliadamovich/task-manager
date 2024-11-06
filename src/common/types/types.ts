export type TestAction<T extends (...args: any) => any> = Omit<ReturnType<T>, "meta">

export type BaseResponseType<D = {}> = {
	data: D
	resultCode: number
	messages: Array<string>
	fieldsErrors: FieldErrorType[]
}

export type FieldErrorType = {
	error: string
	field: string
}
