import { CANCEL_SLEEP, SET_ACTIVE_SECTION, SAVE_SLEEP_CHANGES, EDIT_SLEEP } from "../constants/action-types.js"

const editingSleepData = (state=false, action={}) => {
	switch (action.type) {
		case EDIT_SLEEP:
			return true;
		case SAVE_SLEEP_CHANGES:
			return false;
		case SET_ACTIVE_SECTION:
			return false;
		case CANCEL_SLEEP:
			return false;
		default:
			return state;
	}
}

export default editingSleepData;