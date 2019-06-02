import { CHANGE_SLEEP_ADD_FORM } from "../constants/action-types.js"

const sleepAddForm = (state={ hours: "", minutes: "", quality: "" }, action={}) => {
	switch (action.type) {
		case CHANGE_SLEEP_ADD_FORM:
			return Object.assign({}, state, { [action.payload.field]: action.payload.val });
		default:
			return state;
	}
}

export default sleepAddForm;