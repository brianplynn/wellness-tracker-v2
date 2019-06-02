import { ADD_ANOTHER_FOOD, CANCEL_SEARCH, SELECT_EDAMAME, EDAMAME_SUCCESS, EDAMAME_FAILURE, EDAMAME_PENDING } from "../constants/action-types.js"

const initialState = {
	isSearching: false,
	isPending: false,
	searchResults: [],
	error: false
}

const edamame = (state = initialState, action={}) => {
	switch(action.type) {
		case EDAMAME_PENDING: 
			return Object.assign({}, state, { isSearching: true, isPending: true, error: false });
		case EDAMAME_SUCCESS:
			return Object.assign({}, state, { searchResults: action.payload.hints.slice(0,5), isPending: false });
		case EDAMAME_FAILURE:
			return Object.assign({}, state, { error: true, isPending: false });
		case CANCEL_SEARCH:
			return Object.assign({}, state, { isSearching: false });
		case SELECT_EDAMAME:
			return Object.assign({}, state, { isSearching: false });
		case ADD_ANOTHER_FOOD:
			return initialState;
		default:
			return state;
	}
}
export default edamame;