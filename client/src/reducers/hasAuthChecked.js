import { LOG_IN, AUTH_RESPONSE, AUTH_ERROR } from "../constants/action-types.js"

const hasAuthChecked = (state=false, action={}) => {
	switch (action.type) {
		case LOG_IN:
			return true;
		case AUTH_RESPONSE:
			return true;
		case AUTH_ERROR:
			return true;
		default:
			return state;
	}
}

export default hasAuthChecked;