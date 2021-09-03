import {API_BASE_URL} from "../Components/Constants/apiConstants";


export let initialAuth = {}

// set timeout local storage 
const hours = 2
let saved = localStorage.getItem('savedAt')

if (saved && (new Date().getTime() - saved > hours * 60 * 60 * 1000)) {
	localStorage.clear()
	initialAuth = {
		isAuthenticated: false,
		isAdmin: false,
		user: null,
		token: null,
	}
} else if (JSON.parse(localStorage.getItem("isAuthenticated")) === true) { // Init initialAuth if already user in local storage
	initialAuth = {
		token: JSON.parse(localStorage.getItem("token")),
		email: JSON.parse(localStorage.getItem("email")),
		isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")),
		isAdmin: JSON.parse(localStorage.getItem("isAdmin")),
	}
} else {
	localStorage.clear()
	initialAuth = {
		isAuthenticated: false,
		isAdmin: false,
		token: null,
	}
}

// Action to do in case of
export const AuthReducer = (authState, action) => {


	switch (action.type) {
		case "LOGIN":
			// save user data
			localStorage.setItem("token", JSON.stringify(action.payload.token))
			localStorage.setItem("email", JSON.stringify(action.payload.email))
			localStorage.setItem("isAuthenticated", JSON.stringify(action.payload.isAuthenticated))
			localStorage.setItem("isAdmin", JSON.stringify(action.payload.isAdmin))
			localStorage.setItem('savedAt', new Date().getTime())

			return {
				...authState,
				token: action.payload.token,
				email: action.payload.email,
				isAuthenticated: action.payload.isAuthenticated,
				isAdmin: action.payload.isAdmin,
			}
		case "LOGOUT":
			localStorage.clear()
			return {
				isAuthenticated: false,
				isAdmin: false,
				token: null,
			}
		default:
			return authState
	}
}