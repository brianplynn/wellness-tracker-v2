import React from "react";
import "./ExerciseCalendar.css";

const ExerciseCalendar = ({ changeDate, currentDate, workouts }) => {
	const weekDays = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	];
	return (
		<div className="date-container center">
			{" "}
			{weekDays.map((day, i) => {
				return i === currentDate.getDay() ? (
					<article id="date" key={i} className="center tc w4 ba mv4">
						<h1 className="pink-background f4 pointer br--top black-60 mv0 pv2 ph3">
							{day}
						</h1>
						<div className="pa3 ba pink-border title-card">
							<p className="f6 f5-ns white lh-copy measure">
								{workouts[i].title}
							</p>
						</div>
					</article>
				) : (
					<article
						id="date"
						key={i}
						onClick={changeDate.bind(null, i)}
						className="pointer center tc w4 ba mv4 mh0"
					>
						<h1
							data-key={i}
							className="f4 bg-near-white br--top black-60 mv0 pv2 ph3"
						>
							{day}
						</h1>
						<div
							data-key={i}
							className="pa3 ba b--white title-card"
						>
							<p
								data-key={i}
								className="f6 f5-ns white lh-copy measure"
							>
								{workouts[i].title}
							</p>
						</div>
					</article>
				);
			})}
		</div>
	);
};

export default ExerciseCalendar;
