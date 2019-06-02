import { SLEEP_SUCCESS, SET_ACTIVE_SECTION, SAVE_SLEEP_CHANGES, ADD_SLEEP_TO_GRAPH } from "../constants/action-types.js"
import { dateToString } from "../functions.js";

const initialSleepState = {
	coordinates: [
		{
			realDate: dateToString(6),
			date: 1,
			hours: 0,
			quality: ""
		},
		{
			realDate: dateToString(5),
			date: 2,
			hours: 0,
			quality: "",

		},
		{
			realDate: dateToString(4),
			date: 3,
			hours: 0,
			quality: "",
		},
		{
			realDate: dateToString(3),
			date: 4,
			hours: 0,
			quality: "",
		},
		{
			realDate: dateToString(2),
			date: 5,
			hours: 0,
			quality: "",
		},
		{
			realDate: dateToString(1),
			date: 6,
			hours: 0,
			quality: "",
		}],
	dates: []
}


const sleepData = (state=initialSleepState, action={}) => {
	switch (action.type) {
		case SAVE_SLEEP_CHANGES:
			return Object.assign({}, state, 
				{ coordinates: action.payload.slice().reverse().map( (item, i) => ({
													    realDate: item.date, 
														date: i+1, 
														hours: Number(item.hours)+Number(item.minutes)/60, 
														quality: item.quality 
													}))
			});
		case ADD_SLEEP_TO_GRAPH:
			return Object.assign({}, state, 
								{ coordinates: state.coordinates.concat({
									realDate: dateToString(0),
									date: 7,
									hours: Number(action.payload.hours)+Number(action.payload.minutes)/60,
									quality: action.payload.quality
								})});
		
		case SET_ACTIVE_SECTION: 
			const dateArr = [];
			const d = new Date();
			for (let i = 6; i >=0; i--) {
				let date = new Date(d.getYear(), d.getMonth(), d.getDate() - i)
				dateArr.push((date.getMonth() + 1) +"/" + date.getDate());
			}
			return Object.assign({}, state, { dates: dateArr })
		case SLEEP_SUCCESS:
			const formattedPayload = action.payload.map(item => {
				return {
					realDate: item.sleep_date.slice(0,10),
					hours: item.hours,
					quality: item.quality
				}
			})
			for (let item of formattedPayload) {
				if (item.realDate === dateToString(0)) {
					state.coordinates.push({
						realDate: dateToString(0),
						date: 7,
						hours: 0,
						quality: "",
					})
				}
			}
			return Object.assign(state, 
								{ coordinates: state.coordinates.map((coord) => {
									return Object.assign(coord, formattedPayload.filter(item => coord.realDate === item.realDate)[0])
									})
								}
								);
		default:
			return state;
	}
}

export default sleepData;
