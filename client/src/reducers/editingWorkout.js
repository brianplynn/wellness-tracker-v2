import { CANCEL_WORKOUT_EDIT, SET_ACTIVE_SECTION, EDIT_WORKOUT, CHANGE_DATE, SAVE_WORKOUT_CHANGES } from "../constants/action-types.js"

const editingWorkout = (state=false, action={}) => {
	switch (action.type) {
		case EDIT_WORKOUT:
			return true;
		case CANCEL_WORKOUT_EDIT:
			return false;
		case CHANGE_DATE:
			return false;
		case SAVE_WORKOUT_CHANGES:
			return false;
		case SET_ACTIVE_SECTION:
			return false;
		default:
			return state;
	}
}

export default editingWorkout;