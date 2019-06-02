import React, { Component } from "react";
import { connect } from "react-redux";
import ExerciseCalendar from "../components/Exercise/ExerciseCalendar.js"
import ExerciseInfo from "../components/Exercise/ExerciseInfo.js";
import { cancelWorkoutEdit, addWorkout, deleteWorkout, saveWorkoutChanges, changeDate, editWorkout, changeWorkoutField, changeWorkoutTitle } from "../actions";

const mapStateToProps = state => ({
	activeUser: state.activeUser,
	currentDate: state.currentDate,
	workouts: state.workouts,
	editingWorkout: state.editingWorkout,
	workoutFields: state.workoutFields,
	exerciseHasSynced: state.exerciseHasSynced
});

const mapDispatchToProps = dispatch => ({
	changeDate: (e) => 	dispatch(changeDate(e.target.dataset.key)),
	editWorkout: (day, workout) => dispatch(editWorkout(day, workout)),
	cancelWorkoutEdit: () => dispatch(cancelWorkoutEdit()),
	changeWorkoutField: (e) => dispatch(changeWorkoutField(e.target.dataset.day, e.target.dataset.row, e.target.dataset.col, e.target.value)),
	changeWorkoutTitle: (e) => dispatch(changeWorkoutTitle(e.target.dataset.day, e.target.value)),
	addWorkout: (e) => dispatch(addWorkout(e.target.dataset.day)),
	deleteWorkout: (e) => dispatch(deleteWorkout(e.target.dataset.day, e.target.dataset.row)),
	saveChanges: (user, day, fields) => {
		fields.workoutList = fields.workoutList.filter(workout => workout.text || workout.weight || workout.sets || workout.reps);
		fetch('/api/exercise-submit', {
			method: "post",
	        headers: {'Content-Type': 'application/json'},
	        body: JSON.stringify({
	          user: user,  
	          day: day,
	          fields: fields
	        })
		})
		.then(res => res.json())
		.then(res => console.log(res))
		.catch(err => console.log(err))
		return dispatch(saveWorkoutChanges(day, fields))
	}
});

class Exercise extends Component {
	render() {
		const { activeUser, currentDate, saveChanges, cancelWorkoutEdit, addWorkout, deleteWorkout, changeWorkoutField, changeWorkoutTitle, editingWorkout, editWorkout, workouts, workoutFields, changeDate, exerciseHasSynced } = this.props;
		return (
			<div>{ exerciseHasSynced ?
						<React.Fragment>
							<ExerciseCalendar currentDate={currentDate}
											  changeDate={changeDate}
											  workouts={workouts}  />
							<ExerciseInfo currentDate={currentDate}
										  addWorkout={addWorkout}
										  deleteWorkout={deleteWorkout}
										  cancelWorkoutEdit={cancelWorkoutEdit}
										  changeWorkoutField={changeWorkoutField}
										  changeWorkoutTitle={changeWorkoutTitle}
										  saveChanges={saveChanges}
										  editingWorkout={editingWorkout}
										  editWorkout={editWorkout}
										  workouts={workouts}
										  workoutFields={workoutFields}
										  activeUser={activeUser} />
						</React.Fragment> 
				:
				null
				}
			</div>
			);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Exercise);