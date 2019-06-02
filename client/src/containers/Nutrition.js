import React, { Component } from "react";
import NutritionInput from "../components/Nutrition/NutritionInput.js"
import NutritionTable from "../components/Nutrition/NutritionTable.js"
import { selectEdamame, addAnotherFood, cancelFood, submitEdamameField, setNutrientFields, addDailyFoods, deleteFood } from "../actions"
import { connect } from "react-redux";
import { dateToString } from "../functions.js";

const mapStateToProps = state => ({
	activeUser: state.activeUser,
	nutrientFields: state.nutrientFields,
	edamame: state.edamame,
	dailyFoods: state.dailyFoods,
	displayTable: state.displayTable
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	onFieldChange: (e) => dispatch(setNutrientFields(e.target.id, e.target.value)),
	submitEdamameField: (text, e) => {
		e.preventDefault();
		return dispatch(submitEdamameField(text));
	},
	selectEdamame: (food) => dispatch(selectEdamame(food)),
	onSubmit: (food, id, formCorrect, e) => {
		if (formCorrect) {
			e.preventDefault();
			fetch('/api/nutrition-submit', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					food: food,
					id: id,
					date: dateToString(0)
				})
			})
			.then(res => res.json())
			.then(id => {
				return dispatch(addDailyFoods(food, id[0]));
			})
		}
	},
	deleteFood: (e) => {
		fetch('/api/nutrition-delete', {
				method: 'delete',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					id: e.target.dataset.id
				})
			})
			.then(res => res.json())
			dispatch(deleteFood(e.target.value));
	},
	cancelFood: () => dispatch(cancelFood()),
	addAnotherFood: () => dispatch(addAnotherFood())
});

class Nutrition extends Component {
	render() {
		const { activeUser, cancelFood, selectEdamame, submitEdamameField, addAnotherFood, displayTable, nutrientFields, dailyFoods, onFieldChange, onSubmit, deleteFood } = this.props;
		const { searchResults, isPending, isSearching, error } = this.props.edamame;
		return (
			<div className="nutrition">
				{ !displayTable ? 
				<NutritionInput nutrientFields={nutrientFields}
								activeUser={activeUser}
								submitEdamameField={submitEdamameField}
								selectEdamame={selectEdamame}
								searchResults={searchResults}
								isPending={isPending}
								isSearching={isSearching}
								error={error}
								onFieldChange={onFieldChange}
								cancelFood={cancelFood}
								onSubmit={onSubmit} /> :
				<NutritionTable dailyFoods={dailyFoods}
								deleteFood={deleteFood}
								addAnotherFood={addAnotherFood} /> }
			</div>
			)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Nutrition);