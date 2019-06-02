import { SLEEP_SUCCESS } from "../constants/action-types.js"

const sleepHasSynced = (state=false, action={}) => {
	switch (action.type) {
		case SLEEP_SUCCESS:
			return true;
		default:
			return state;
	}
}

export default sleepHasSynced;