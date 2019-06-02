import { LOG_IN, AUTH_RESPONSE } from "../constants/action-types.js"

const initialState = {
	id: ''
}

const activeUser = (state=initialState, action={}) => {
	switch (action.type) {
		case LOG_IN:
			return action.payload;
		case AUTH_RESPONSE:
			return { id: action.payload };
		default:
			return state;
	}
}

export default activeUser;
