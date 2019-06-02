import { WORKOUT_SUCCESS } from "../constants/action-types.js"

const exerciseHasSynced = (state=false, action={}) => {
	switch (action.type) {
		case WORKOUT_SUCCESS:
			return true;
		default:
			return state;
	}
}

export default exerciseHasSynced;