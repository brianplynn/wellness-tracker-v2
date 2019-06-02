import { ADD_SLEEP_TO_GRAPH, SLEEP_SUCCESS } from "../constants/action-types.js"
import { dateToString } from "../functions.js";

const addingSleep = (state=true, action={}) => {
	switch (action.type) {
		case ADD_SLEEP_TO_GRAPH:
			return false;
		case SLEEP_SUCCESS:
			const formattedPayload = action.payload.map(item => {
				return item.sleep_date.slice(0,10);
			})
			for (let date of formattedPayload) {
				if (date === dateToString(0)) {
					return false;
				}
			}
			return true;		
		default:
			return state;
	}
}

export default addingSleep;