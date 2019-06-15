import React from "react";
import "./ExerciseInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const ExerciseInfo = ({
	activeUser,
	currentDate,
	editingWorkout,
	editWorkout,
	cancelWorkoutEdit,
	workouts,
	workoutFields,
	changeWorkoutField,
	changeWorkoutTitle,
	addWorkout,
	deleteWorkout,
	saveChanges,
	changeDate
}) => {
	const weekDays = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	];
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];
	const index = currentDate.getDay();
	return (
		<div className="center exercise-list-container">
			<div className="date-container-einfo">
				<div
					className="left-right-icon"
					onClick={changeDate.bind(null, index - 1)}
				>
					<FontAwesomeIcon
						icon={faAngleLeft}
						color="white"
						size="2x"
					/>
				</div>
				<h1 className="tc white">
					{weekDays[index] +
						", " +
						months[currentDate.getMonth()] +
						" " +
						currentDate.getDate()}
				</h1>
				<div
					className="left-right-icon"
					onClick={changeDate.bind(null, index + 1)}
				>
					<FontAwesomeIcon
						icon={faAngleRight}
						color="white"
						size="2x"
					/>
				</div>
			</div>
			<div className="white tc">
				{editingWorkout ? (
					<div className="title-container-editing w-90 mw7 center mb2">
						<div className="filler-div-editing" />
						<div className="w-100">
							<input
								className="input-reset ba b--white pa2 f3 white bg-transparent center tc mr2"
								data-day={index}
								value={workoutFields[index].title}
								placeholder="Workout Title"
								onChange={changeWorkoutTitle}
							/>
						</div>
						<div className="add-btn">
							<button
								className="b pv2 ph3 tc light-blue ba br2 b--light-blue bg-transparent grow pointer outline-0 f4"
								data-day={index}
								onClick={addWorkout}
							>
								+
							</button>
						</div>
					</div>
				) : (
					<h2>
						{workouts[index].workoutList[0] ? (
							<div className="flex justify-center align-center w-90 mw7 center">
								<div className="filler-div-non-editing" />
								<div className="w-100 f3 tc">
									{workouts[index].title}
								</div>
								<div
									className="edit-btn tr pa2 b tc dim b--transparent bg-transparent pointer f6"
									data-day={index}
									data-workout={workouts[index]}
									onClick={editWorkout.bind(
										null,
										index,
										workouts[index]
									)}
								>
									{window.innerWidth > 500
										? "Edit Workout"
										: "Edit"}
								</div>
							</div>
						) : (
							<div>
								<span>
									No workout scheduled today. Kick your feet
									up or{" "}
								</span>
								<span
									className="b underline tc dim b--transparent bg-transparent pointer"
									onClick={editWorkout.bind(
										null,
										index,
										workouts[index]
									)}
								>
									add a workout!
								</span>
							</div>
						)}
					</h2>
				)}
			</div>
			<div>
				{editingWorkout ? (
					<table
						id="workout-edit-table"
						className="center"
						align="center"
						cellSpacing="0"
					>
						<tbody className="lh-copy overflow-container">
							{workoutFields[index].workoutList.map(
								(workout, i) => {
									return (
										<tr
											className="center edit-workout-row"
											key={i}
										>
											<td className="pv3 b tc pr3">
												<input
													className="input-reset ba b--white f5 pa2 white bg-transparent center db tc mr2 mb2"
													data-day={index}
													data-row={i}
													data-col="text"
													value={workout.text}
													onChange={
														changeWorkoutField
													}
													placeholder="Description"
												/>
											</td>
											<td className="pv3 b tc pr3">
												<input
													className="input-reset ba b--white f5 pa2 white bg-transparent center db tc mr2 mb2"
													data-day={index}
													data-row={i}
													data-col="weight"
													value={workout.weight}
													onChange={
														changeWorkoutField
													}
													placeholder="Weight"
												/>
											</td>
											<td className="pv3 b tc pr3">
												<input
													className="input-reset ba b--white f5 pa2 white bg-transparent center db tc mr2 mb2"
													data-day={index}
													data-row={i}
													data-col="sets"
													value={workout.sets}
													onChange={
														changeWorkoutField
													}
													placeholder="Sets"
												/>
											</td>
											<td className="pv3 b tc pr3">
												<input
													className="input-reset ba b--white f5 pa2 white bg-transparent center db tc mr2 mb2"
													data-day={index}
													data-row={i}
													data-col="reps"
													value={workout.reps}
													onChange={
														changeWorkoutField
													}
													placeholder="Reps"
												/>
											</td>
											<td>
												<button
													className="del-btn"
													data-day={index}
													data-row={i}
													onClick={deleteWorkout}
												>
													{window.innerWidth > 770
														? "x"
														: "Delete"}
												</button>
											</td>
										</tr>
									);
								}
							)}
						</tbody>
					</table>
				) : (
					<table
						id="workout-table"
						className="f4 w-100 mw8 center"
						cellSpacing="0"
					>
						<tbody className="lh-copy">
							{workouts[index].workoutList.map((workout, i) => {
								return (
									<tr key={i}>
										<td
											className="pv3 b pr3"
											id="workout-text"
										>
											{workout.text}
										</td>
										<td className="pv3 b tc pr3 workout-data">
											{workout.weight}{" "}
											{Number(workout.weight) > 0
												? "lbs"
												: ""}
										</td>
										<td className="pv3 b tc pr3 workout-data">
											{workout.sets}{" "}
											{workout.sets ? "sets" : ""}
										</td>
										<td className="pv3 b tc pr3 workout-data">
											{workout.sets && workout.reps
												? "x"
												: ""}
										</td>
										<td className="pv3 b tc pr3 workout-data">
											{workout.reps}{" "}
											{workout.reps ? "reps" : ""}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				)}
			</div>
			<div>
				{" "}
				{editingWorkout ? (
					<div className="flex justify-center save-cancel-btns">
						<button
							className="w4 b mr1 ph3 pv2 tc light-silver ba br2 b--light-silver bg-transparent grow pointer outline-0 f5"
							data-day={index}
							onClick={cancelWorkoutEdit}
						>
							Cancel
						</button>
						<button
							className="w4 b ml2 ph3 pv2 tc light-blue ba br2 b--light-blue bg-transparent grow pointer outline-0 f5"
							onClick={saveChanges.bind(
								null,
								activeUser.id,
								index,
								workoutFields[index]
							)}
						>
							Save
						</button>
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default ExerciseInfo;
