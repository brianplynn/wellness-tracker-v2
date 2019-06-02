import { CANCEL_FOOD, SET_ACTIVE_SECTION, ADD_DAILY_FOOD, ADD_ANOTHER_FOOD } from "../constants/action-types.js"

const displayTable = (state=true, action={}) => {
	switch (action.type) {
		case ADD_DAILY_FOOD:
			return true;
		case ADD_ANOTHER_FOOD:
			return false;
		case SET_ACTIVE_SECTION:
			return true;
		case CANCEL_FOOD:
			return true;
		default:
			return state;
	}
}

export default displayTable;