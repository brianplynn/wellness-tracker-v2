import { SELECT_EDAMAME, SET_EDAMAME_FIELD, ADD_ANOTHER_FOOD, SET_FOOD_FIELD, SET_CALORIES_FIELD, SET_FAT_FIELD, SET_CARBS_FIELD, SET_PROTEIN_FIELD } from "../constants/action-types.js"

const nutrientFields = (state={ edamame: "", food: "", calories: "", fat:"", carbs:"", protein: "" }, action={}) => {
	switch (action.type) {
		case SET_EDAMAME_FIELD:
			return Object.assign({}, state, { edamame: action.payload });
		case SET_FOOD_FIELD:
			return Object.assign({}, state, { food: action.payload });
		case SET_CALORIES_FIELD:
			return Object.assign({}, state, { calories: action.payload });
		case SET_FAT_FIELD:
			return Object.assign({}, state, { fat: action.payload });
		case SET_CARBS_FIELD:
			return Object.assign({}, state, { carbs: action.payload });
		case SET_PROTEIN_FIELD:
			return Object.assign({}, state, { protein: action.payload });
		case SELECT_EDAMAME:
			const { label, nutrients } = action.payload;
			return { edamame: label, 
					 food: label, 
					 calories: (nutrients.ENERC_KCAL ? Math.round(nutrients.ENERC_KCAL) : 0), 
					 fat: (nutrients.FAT ? Math.round(nutrients.FAT) : 0), 
					 carbs: (nutrients.CHOCDF ? Math.round(nutrients.CHOCDF) : 0), 
					 protein: (nutrients.PROCNT ? Math.round(nutrients.PROCNT) : 0) }
		case ADD_ANOTHER_FOOD:
			return { edamame: "", food: "", calories: "", fat:"", carbs:"", protein: "" }
		default:
			return state;
	}
}

export default nutrientFields;