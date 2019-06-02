import { EDIT_WORKOUT, DELETE_WORKOUT, ADD_WORKOUT, CHANGE_WORKOUT_TITLE, CHANGE_WORKOUT_FIELD } from "../constants/action-types.js"
import { arrayReplace } from "../functions.js";

const emptyWorkout = {
 			text: "",
			weight: "", 	
 			reps: "",
 			sets: ""		
 		}

const initialWorkoutFieldsState = [
	{ 
			title: "",
			workoutList: []
	 	}, 
	{
	 		title: "",
	 		workoutList: []
	 	}, 
	{
	 		title: "",
	 		workoutList: []
	 	}, 
	{
	 		title: "",
	 		workoutList: []
	 	}, 
	{
	 		title: "",
	 		workoutList: []
	 	}, 
	{
	 		title: "",
	 		workoutList: []
	 	}, 
	{
	 		title: "",
	 		workoutList: []
	 	}, 
 	];

export const workoutFields = (state=initialWorkoutFieldsState, action={}) => {
	switch (action.type) {
		case EDIT_WORKOUT:
			const workoutObj = Object.assign({}, action.payload.workout)
			if (workoutObj.title === "Rest" || workoutObj.title === "Untitled Workout") { 
				workoutObj.title = "";				
			}
			workoutObj.workoutList = workoutObj.workoutList.concat(emptyWorkout);
			return arrayReplace(state, workoutObj, action.payload.day);
		case CHANGE_WORKOUT_TITLE:
			return arrayReplace(state, { title: action.payload.value, workoutList: state[action.payload.day].workoutList }, action.payload.day);
		case CHANGE_WORKOUT_FIELD:
			const { col, day, row, value } = action.payload;
			return arrayReplace(state, 
								{ title: state[day].title, 
								  workoutList: arrayReplace(state[day].workoutList, 
								 						Object.assign({}, 
								 									  state[day].workoutList[row], 
								 									  { [col]: value }),
								 						row) },
								day);
		case ADD_WORKOUT:
			return arrayReplace(state, { title: state[action.payload].title, workoutList: state[action.payload].workoutList.concat(emptyWorkout) }, action.payload);
		case DELETE_WORKOUT:
			return arrayReplace(state, { title: state[action.payload.day].title, workoutList: arrayReplace(state[action.payload.day].workoutList, [], action.payload.row) }, action.payload.day);
		default:
			return state;
	}
}