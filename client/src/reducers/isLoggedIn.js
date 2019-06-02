import { LOG_IN, AUTH_RESPONSE } from "../constants/action-types.js"

const isLoggedIn = (state=false, action={}) => {
	switch (action.type) {
		case LOG_IN:
			return true;
		case AUTH_RESPONSE:
			if (action.payload !== 'user id does not exist') {
				return true;
			}
			break;
		default:
			return state;
	}
}

export default isLoggedIn;