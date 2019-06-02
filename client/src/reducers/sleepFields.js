import { EDIT_SLEEP, CHANGE_SLEEP_FIELD } from "../constants/action-types.js"
import { arrayReplace } from "../functions.js";

const sleepFields = (state=[], action={}) => {
	switch (action.type) {
		case CHANGE_SLEEP_FIELD:
			return arrayReplace(state, Object.assign(state[action.payload.row], { [action.payload.col]: action.payload.value }), action.payload.row);
		case EDIT_SLEEP:
			return action.payload.map( item => ({ date: item.realDate,
												  hours: Math.floor(Number(item.hours)), 
												  minutes: Math.round((Number(item.hours) - Math.floor(Number(item.hours))) * 60), 
												  quality: item.quality })).slice().reverse();
		default:
			return state;
	}
}

export default sleepFields;
