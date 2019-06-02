import { LOG_IN, SET_ACTIVE_SECTION } from "../constants/action-types.js"

const activeSection = (state="", action={}) => {
	switch (action.type) {
		case SET_ACTIVE_SECTION:
			return action.payload;
		case LOG_IN:
			return "nutrition";
		default:
			return state;
	}
}

export default activeSection;
