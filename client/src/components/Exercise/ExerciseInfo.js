import React from 'react';
import "./ExerciseInfo.css";

const ExerciseInfo = ({ activeUser, currentDate, editingWorkout, editWorkout, cancelWorkoutEdit, workouts, workoutFields, changeWorkoutField, changeWorkoutTitle, addWorkout, deleteWorkout, saveChanges }) => {
	const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	const index = currentDate.getDay();
	return (
		<div className="w-70 center">
			<h1 className="tc white">{weekDays[index] + ", " + months[currentDate.getMonth()] + " " + currentDate.getDate()}</h1>
			<div className="white tc">
			{ editingWorkout ? 
				<div className="flex justify-center align-center w-100 mw8 center mb2">
				<div className="w-100">
				<input className="input-reset ba b--white pa2 f3 white bg-transparent center tc mr2"
					   data-day={index}
					   value={workoutFields[index].title}
					   placeholder="Workout Title"
					   onChange={changeWorkoutTitle} />
				</div>
				<div className="add-btn">	   
				<button className="b pv2 ph3 tc light-blue ba br2 b--light-blue bg-transparent grow pointer outline-0 f4"
								data-day={index} onClick={addWorkout}>+</button>  
				</div>
				</div>
			: 	<h2>{workouts[index].workoutList[0] ? 
						<div className="flex justify-center align-center w-100 mw8 center">
						<div className="w-100 f3 tc">{workouts[index].title}</div>
						<div className="edit-btn tr pa2 b tc dim b--transparent bg-transparent pointer f6"
								data-day={index}
								data-workout={workouts[index]} 
								onClick={editWorkout.bind(null, index, workouts[index])}>Edit Workout</div>
						</div> 
						: <div>
							<span>No workout scheduled today. Kick your feet up or </span>  
							<span className="b underline tc dim b--transparent bg-transparent pointer"
								  onClick={editWorkout.bind(null, index, workouts[index])} >add a workout!</span>
						  </div>
					}
				    
				  </h2>
			}
			</div>
			<div>{ editingWorkout ? 
				 ( <table className="w-30 mw8 center" cellSpacing="0">
			      <tbody className="lh-copy overflow-container">
			      { workoutFields[index].workoutList.map( (workout, i) => {
				        return (
				        <tr className="center"
				        	key={i}>
				        	<td className="pv3 b tc pr3">
				        		<input className="input-reset ba b--white f5 pa2 white bg-transparent center db tc mr2 mb2"
					   				   data-day={index}
				        			   data-row={i}
				        			   data-col="text"
				        			   value={workout.text}
				        			   onChange={changeWorkoutField}
				        			   placeholder="Description" />
				        	</td>
						    <td className="pv3 b tc pr3">
						    	<input className="input-reset ba b--white f5 pa2 white bg-transparent center db tc mr2 mb2"
					   				   data-day={index}
				        			   data-row={i}
				        			   data-col="weight"
				        			   value={workout.weight}
				        			   onChange={changeWorkoutField}
				        			   placeholder="Weight" />
						    </td>
						    <td className="pv3 b tc pr3">
						    	<input className="input-reset ba b--white f5 pa2 white bg-transparent center db tc mr2 mb2"
					   				   data-day={index}
				        			   data-row={i}
				        			   data-col="sets"
				        			   value={workout.sets}
				        			   onChange={changeWorkoutField}
				        			   placeholder="Sets" />
						    </td>
						    <td className="pv3 b tc pr3">
						    	<input className="input-reset ba b--white f5 pa2 white bg-transparent center db tc mr2 mb2"
					   				   data-day={index}
				        			   data-row={i}
				        			   data-col="reps"
				        			   value={workout.reps}
				        			   onChange={changeWorkoutField}
				        			   placeholder="Reps" />
						    </td>
						    <td>
						    <button className="br-100 bw1 mb2 b pointer ba b--washed-red bg-transparent washed-red"
			       	  			    data-day={index}
				        			data-row={i}
				        			onClick={deleteWorkout}>x</button></td>
				        </tr>
				        );
			      	}
			      )}
			      </tbody>
			    </table>
			    )
				:
				 ( <table className="f4 w-100 mw8 center" cellSpacing="0">
			      <tbody className="lh-copy">
			      { workouts[index].workoutList.map( (workout, i) => {
				        return (
				        <tr key={i}>
				        	<td className="pv3 b tc pr3 bt b--white">
				        		{workout.text}
				        	</td>
						    <td className="pv3 b tc pr3 bt b--white">
						    	{workout.weight} { Number(workout.weight) > 0 ? "lbs" : "" }
						    </td>
						    <td className="pv3 b tc pr3 bt b--white">
						    	{workout.sets} { workout.sets ? "sets" : ""}
						    </td>
						    <td className="pv3 b tc pr3 bt b--white">{ workout.sets && workout.reps ? "x" : ""}</td>
						    <td className="pv3 b tc pr3 bt b--white">
						    	{workout.reps} { workout.reps ? "reps" : ""}
						    </td>
				        </tr>
				        );
			      	}
			      )}
			      </tbody>
			    </table>
			    )
			}
			</div>
			<div> {editingWorkout ?
					<div className="flex justify-center">
						<button className="w4 b mr1 ph3 pv2 tc light-silver ba br2 b--light-silver bg-transparent grow pointer outline-0 f5"
								data-day={index} onClick={cancelWorkoutEdit}>Cancel</button> 
					    <button className="w4 b ml2 ph3 pv2 tc light-blue ba br2 b--light-blue bg-transparent grow pointer outline-0 f5"
								onClick={saveChanges.bind(null, activeUser.id, index, workoutFields[index])}>Save</button>
						</div>
					: ""}
			</div>
		</div>
		)
}

export default ExerciseInfo;