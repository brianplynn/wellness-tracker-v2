import { SET_ERROR, NUTRITION_SUCCESS, NUTRITION_FAILURE, NUTRITION_PENDING, SLEEP_SUCCESS, SLEEP_FAILURE, SLEEP_PENDING, WORKOUT_SUCCESS, WORKOUT_FAILURE, WORKOUT_PENDING, LOG_IN, SELECT_EDAMAME, CANCEL_FOOD, SET_EDAMAME_FIELD, EDAMAME_PENDING, EDAMAME_SUCCESS, EDAMAME_FAILURE, CANCEL_SLEEP, EDIT_SLEEP, CHANGE_SLEEP_ADD_FORM, ADD_SLEEP_TO_GRAPH, CANCEL_WORKOUT_EDIT, SAVE_SLEEP_CHANGES, CHANGE_SLEEP_FIELD, DELETE_WORKOUT, SAVE_WORKOUT_CHANGES, ADD_WORKOUT, CHANGE_WORKOUT_TITLE, CHANGE_WORKOUT_FIELD, EDIT_WORKOUT, CHANGE_DATE, ADD_ANOTHER_FOOD, DELETE_FOOD, ADD_DAILY_FOOD, SET_ACTIVE_SECTION, SET_FOOD_FIELD, SET_CALORIES_FIELD, SET_FAT_FIELD, SET_CARBS_FIELD, SET_PROTEIN_FIELD, AUTH_PENDING, AUTH_RESPONSE, AUTH_ERROR } from "../constants/action-types.js"

export const setActiveSection = (section) => ({
	type: SET_ACTIVE_SECTION,
	payload: section
});

export const setNutrientFields = (id, text) => {
	switch (id) {
		case "edamame":
			return ({
				type: SET_EDAMAME_FIELD,
				payload: text
			});
		case "food":
			return ({
				type: SET_FOOD_FIELD,
				payload: text
			});
		case "calories":
			return ({
				type: SET_CALORIES_FIELD,
				payload: text
			});
		case "fat":
			return ({
				type: SET_FAT_FIELD,
				payload: text
			});
		case "carbs":
			return ({
				type: SET_CARBS_FIELD,
				payload: text
			});
		default:
			return ({
				type: SET_PROTEIN_FIELD,
				payload: text
			});
	}
};

export const addDailyFoods = (food, id) => ({
	type: ADD_DAILY_FOOD,
	payload: {
		food,
		id
	}
});

export const deleteFood = (num) => ({
	type: DELETE_FOOD,
	payload: num
});

export const addAnotherFood = () => ({
	type: ADD_ANOTHER_FOOD
});

export const changeDate = (date) => ({
	type: CHANGE_DATE,
	payload: date
});

export const editWorkout = (day, workout) => ({
	type: EDIT_WORKOUT,
	payload: {
		day,
		workout
	}
});

export const cancelWorkoutEdit = (day, workout) => ({
	type: CANCEL_WORKOUT_EDIT
});

export const changeWorkoutField = (day, row, col, value) => ({
	type: CHANGE_WORKOUT_FIELD,
	payload: {
		day,
		row,
		col,
		value
	}
});

export const changeWorkoutTitle = (day, value) => ({
	type: CHANGE_WORKOUT_TITLE,
	payload: {
		day,
		value
	}
});

export const addWorkout = (day) => ({
	type: ADD_WORKOUT,
	payload: day
});

export const saveWorkoutChanges = (day, fields) => ({
	type: SAVE_WORKOUT_CHANGES,
	payload: {
		day,
		fields
	}
});

export const deleteWorkout = (day, row) => ({
	type: DELETE_WORKOUT,
	payload: {
		day,
		row
	}
});

export const changeSleepField = (row, col, value) => ({
	type: CHANGE_SLEEP_FIELD,
	payload: {
		row,
		col,
		value,
	}
});

export const saveSleepChanges = data => ({
	type: SAVE_SLEEP_CHANGES,
	payload: data
});

export const changeSleepAddForm = (field, val) => ({
	type: CHANGE_SLEEP_ADD_FORM,
	payload: {
		field,
		val
	}
});

export const addSleepToGraph = data => ({
	type: ADD_SLEEP_TO_GRAPH,
	payload: data
});

export const editSleep = data => ({
	type: EDIT_SLEEP,
	payload: data
});


export const cancelSleep = () => ({
	type: CANCEL_SLEEP
});

export const cancelFood = () => ({
	type: CANCEL_FOOD
});

export const selectEdamame = (food) => ({
	type: SELECT_EDAMAME,
	payload: food
})

export const logIn = (response) => ({
	type: LOG_IN,
	payload: response,
})

export const submitEdamameField = (text) => (dispatch) => {
	dispatch({ type: EDAMAME_PENDING, payload: text});
	fetch(`https://api.edamam.com/api/food-database/parser?nutrition-type=logging&ingr=${text}&app_id=512ac9bf&app_key=cb25735e5b566f1cb8a9cb5cd2f5f95b`)
		.then(res => res.json())
		.then(food => {
			if (!food.hints[0]) throw new Error("0 results");
			dispatch({ type: EDAMAME_SUCCESS, payload: food});
		})
		.catch(err => {
			dispatch({ type: EDAMAME_FAILURE, payload: err});
		})
}

export const syncWorkouts = (id) => (dispatch) => {
	dispatch({ type: WORKOUT_PENDING });
	fetch(`/api/exercise/${id}`, {
        method: "get",
        headers: {'Content-Type': 'application/json'}
    	})
		.then(res => res.json())
		.then(workouts => {
			dispatch({ type: WORKOUT_SUCCESS, payload: workouts});
		})
		.catch(err => {
			dispatch({ type: WORKOUT_FAILURE, payload: err});
		})
}

export const syncSleep = (id) => (dispatch) => {
	dispatch({ type: SLEEP_PENDING });
	fetch(`/api/sleep/${id}`, {
        method: "get",
        headers: {'Content-Type': 'application/json'}
    	})
		.then(res => res.json())
		.then(sleepData => {
			dispatch({ type: SLEEP_SUCCESS, payload: sleepData});
		})
		.catch(err => {
			dispatch({ type: SLEEP_FAILURE, payload: err});
		})
}

export const syncNutrition = (id) => (dispatch) => {
	dispatch({ type: NUTRITION_PENDING });
	fetch(`/api/nutrition/${id}`, {
        method: "get",
        headers: {'Content-Type': 'application/json'}
    	})
		.then(res => res.json())
		.then(dailyFoods => {
			dispatch({ type: NUTRITION_SUCCESS, payload: dailyFoods});
		})
		.catch(err => {
			dispatch({ type: NUTRITION_FAILURE, payload: err});
		})
}

export const setError = (msg) => ({
	type: SET_ERROR,
	payload: msg
})

export const authCheck = () => (dispatch) => {
	dispatch({ type: AUTH_PENDING });
	fetch(`/api/auth/`, {
        method: "get",
        credentials: 'include',
        headers: {'Content-Type': 'application/json'}
    	})
		.then(res => res.json())
		.then(userId => {
			dispatch({ type: AUTH_RESPONSE, payload: userId});
		})
		.catch(err => {
			dispatch({ type: AUTH_ERROR, payload: err});
		})
}