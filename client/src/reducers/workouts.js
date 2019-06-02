import { arrayReplace } from "../functions.js";
import { SAVE_WORKOUT_CHANGES, WORKOUT_SUCCESS } from "../constants/action-types.js"

const initialWorkoutState = [
	{ 
			title: "Rest",
			workoutList: []
	 	}, 
	{
	 		title: "Rest",
	 		workoutList: []
	 	}, 
	{
	 		title: "Rest",
	 		workoutList: []
	 	}, 
	{
	 		title: "Rest",
	 		workoutList: []
	 	}, 
	{
	 		title: "Rest",
	 		workoutList: []
	 	}, 
	{
	 		title: "Rest",
	 		workoutList: []
	 	}, 
	{
	 		title: "Rest",
	 		workoutList: []
	 	}, 
 	];

const workouts = (state=initialWorkoutState, action={}) => {
	switch (action.type) {
		case SAVE_WORKOUT_CHANGES:
			let { day, fields } = action.payload;
			if (!fields.title) { 
				if (!fields.workoutList[0]) {
					fields.title = "Rest";
				} else {
					fields.title = "Untitled Workout";
				}
			} else if (fields.title && !fields.workoutList[0]) {
					fields.title = "Rest";
			}
			return arrayReplace(state, fields, day);
		case WORKOUT_SUCCESS:
			action.payload.map(workout => {
				state[workout.weekday] = Object.assign(state[workout.weekday], { title: workout.workout_title })
				state[workout.weekday].workoutList
				.push({
					text: workout.text,
					weight: workout.weight,
					reps: workout.reps,
					sets: workout.sets
				})
				return workout;
			})
			return state;
		default:
			return state;
	}
}

export default workouts;
