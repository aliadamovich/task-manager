import axios from "axios";

export const instance = axios.create({
	// baseURL: "https://social-network.samuraijs.com/api/1.1/",
	baseURL: process.env.REACT_APP_BASE_URL,
	withCredentials: true,
	headers: {
		// "API-KEY": "18ed5bfc-0aae-47f2-8e6a-4b855e26e81b",
		Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
		"API-KEY": process.env.REACT_APP_API_KEY,
	},
})
