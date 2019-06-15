import { SET_ERROR, LOG_IN } from "../constants/action-types.js";

const messageText = (state = "", action = {}) => {
	switch (action.type) {
		case LOG_IN:
			return "";
		case SET_ERROR:
			return action.payload;
		default:
			return state;
	}
};

export default messageText;
