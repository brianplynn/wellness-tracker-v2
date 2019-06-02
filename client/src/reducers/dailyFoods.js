import { NUTRITION_SUCCESS, DELETE_FOOD, ADD_DAILY_FOOD } from "../constants/action-types.js"

const dailyFoods = (state=[], action={}) => {
	switch (action.type) {
		case ADD_DAILY_FOOD:
			return state.concat(Object.assign(action.payload.food, { food_id: action.payload.id }));
		case DELETE_FOOD:
			return state.slice(0,action.payload).concat(state.slice(Number(action.payload)+1))
		case NUTRITION_SUCCESS:
			return action.payload;
		default:
			return state;
	}
}

export default dailyFoods;