import React from "react";
import "./NutritionTable.css";

const NutritionTable = ({ dailyFoods, deleteFood, addAnotherFood }) => {
	const sumNutrient = nutrient => {
		return dailyFoods[0]
			? dailyFoods
					.map(food => Number(food[nutrient]))
					.reduce((acc, currVal) => acc + currVal)
			: "";
	};
	return (
		<div className="table-container">
			<div className="overflow-auto">
				<h1 className="tc white mb5">Your Daily Nutrition History</h1>
				<table className="f6 w-100 mw8 center" cellSpacing="0">
					<thead>
						<tr>
							<th className="fw6 tc white pb3 pr3 nutrition-table-header">
								Food
							</th>
							<th className="fw6 tc white pb3 pr3 nutrition-table-header">
								Calories
							</th>
							<th className="fw6 tc white pb3 pr3 nutrition-table-header">
								Fat
							</th>
							<th className="fw6 tc white pb3 pr3 nutrition-table-header">
								Carbs
							</th>
							<th className="fw6 tc white pb3 pr3 nutrition-table-header">
								Protein
							</th>
						</tr>
					</thead>
					<tbody className="lh-copy">
						{dailyFoods.map((food, i) => {
							return (
								<tr key={i}>
									<td className="pv3 tc pr3 nutrition-row">
										{food.food}
									</td>
									<td className="pv3 tc pr3 nutrition-row">
										{food.calories}
									</td>
									<td className="pv3 tc pr3 nutrition-row">
										{food.fat}
									</td>
									<td className="pv3 tc pr3 nutrition-row">
										{food.carbs}
									</td>
									<td className="pv3 tc pr3 nutrition-row">
										{food.protein}
									</td>
									<td className="pv3 tc pr3">
										<button
											className="br-100 bw1 b pointer ba b--washed-red bg-transparent washed-red"
											value={i}
											data-id={food.food_id}
											onClick={deleteFood}
										>
											x
										</button>
									</td>
								</tr>
							);
						})}
						<tr>
							<td className="pv3 b tc pr3 bt total-row">
								Daily Total
							</td>
							<td className="pv3 b tc pr3 bt total-row">
								{sumNutrient("calories")}
							</td>
							<td className="pv3 b tc pr3 bt total-row">
								{sumNutrient("fat")}
							</td>
							<td className="pv3 b tc pr3 bt total-row">
								{sumNutrient("carbs")}
							</td>
							<td className="pv3 b tc pr3 bt total-row">
								{sumNutrient("protein")}
							</td>
						</tr>
					</tbody>
				</table>
				<p
					className="w4 b ph3 pv2 center tc light-blue ba br2 b--light-blue bg-transparent grow pointer f6"
					onClick={addAnotherFood}
				>
					Add Food
				</p>
			</div>
		</div>
	);
};

export default NutritionTable;
