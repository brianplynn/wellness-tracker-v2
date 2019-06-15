import React from "react";
import "./NutritionInput.css";

const NutritionInput = ({
	activeUser,
	selectEdamame,
	error,
	isSearching,
	isPending,
	searchResults,
	cancelFood,
	submitEdamameField,
	nutrientFields,
	onFieldChange,
	onSubmit
}) => {
	const { edamame, food, calories, fat, carbs, protein } = nutrientFields;
	const formCorrect =
		food && calories !== "" && fat !== "" && carbs !== "" && protein !== "";
	return (
		<div className="z-1 form-foods center white shadow-3 ma3">
			<form>
				<h1 className="ml6 ml-shrink">
					Search over 700,000 foods in our database...
				</h1>
				<div className="z-1 flex flex-column justify-between">
					<div className="flex search-field flex-wrap">
						<div className="z-1 mt2 ml6 ml-shrink measure nutrient-container-l flex-column">
							<input
								id="edamame"
								className="food-input input-reset bg-transparent white ba b--white pa2 db w-100"
								type="text"
								aria-describedby="food-desc"
								autoComplete="off"
								value={edamame}
								onChange={onFieldChange}
							/>
							{!isSearching ? (
								""
							) : isPending ? (
								<div className="pending-container bg-white w-100">
									<div className="lds-css ng-scope center pa1 w-10">
										<div
											className="lds-gear"
											style={{ height: "100%" }}
										>
											<div>
												<div />
												<div />
												<div />
												<div />
												<div />
												<div />
												<div />
												<div />
											</div>
										</div>
									</div>
								</div>
							) : error ? (
								<div className="error bg-white pa2 w-100 tl">
									No results found.
								</div>
							) : (
								<div className="results-container bg-white w-100">
									{searchResults.map((result, i) => (
										<div
											key={i}
											onClick={selectEdamame.bind(
												null,
												searchResults[i].food
											)}
											className="result pa2 hover-bg-light-gray pointer bg-white w-100"
										>
											<span className="dark-green">
												{result.food.brand
													? result.food.brand + " "
													: ""}
											</span>
											{result.food.label + " "}
											<span className="purple">
												(
												{Math.round(
													result.food.nutrients
														.ENERC_KCAL
												)}{" "}
												kcal)
											</span>
										</div>
									))}
								</div>
							)}
						</div>
						<div className="flex mt2 flex-column search-container align-center">
							<button
								className="search-btn w4 b ph3 pv2 ml3 tc ba br2 bg-transparent grow pointer outline-0 f6"
								onClick={submitEdamameField.bind(null, edamame)}
							>
								Search
							</button>
							<img
								className="edamame mb1"
								alt="attribute"
								src="https://developer.edamam.com/images/badge.png"
							/>
						</div>
					</div>
				</div>
			</form>
			<form>
				<h1 className="ml6 ml-shrink">...or enter your meal here:</h1>
				<div className="z-1 ml6 ml-shrink measure nutrient-container-l">
					<input
						id="food"
						className="food-input input-reset bg-transparent white ba b--white pa2 mb2 db w-100"
						type="text"
						aria-describedby="food-desc"
						autoComplete="off"
						value={food}
						required
						onChange={onFieldChange}
					/>
				</div>
				<div className="z-1 measure ml6 ml-shrink nutrient-container">
					<div className="nutrient-container-md">
						<label
							htmlFor="calories"
							className="center f6 b db mb2"
						>
							Calories
						</label>
						<input
							id="calories"
							className="food-input-cal input-reset bg-transparent white center ba b--white pa2 mb2 db w-100"
							type="number"
							aria-describedby="calories-desc"
							autoComplete="off"
							value={calories}
							required
							onChange={onFieldChange}
						/>
					</div>
					<div className="nutrient-container-sm">
						<label htmlFor="fat" className="center f6 b db mb2">
							Fat
						</label>
						<input
							id="fat"
							className="food-input input-reset bg-transparent white center ba b--white pa2 mb2 db w-100"
							type="number"
							aria-describedby="fat-desc"
							autoComplete="off"
							value={fat}
							required
							onChange={onFieldChange}
						/>
					</div>
					<div className="nutrient-container-sm">
						<label htmlFor="carbs" className="center f6 b db mb2">
							Carbs
						</label>
						<input
							id="carbs"
							className="food-input input-reset bg-transparent white center ba b--white pa2 mb2 db w-100"
							type="number"
							aria-describedby="carbs-desc"
							autoComplete="off"
							value={carbs}
							required
							onChange={onFieldChange}
						/>
					</div>
					<div className="nutrient-container-sm">
						<label htmlFor="protein" className="center f6 b db mb2">
							Protein
						</label>
						<input
							id="protein"
							className="food-input white input-reset bg-transparent center ba b--white pa2 mb2 db w-100"
							type="number"
							aria-describedby="protein-desc"
							autoComplete="off"
							value={protein}
							required
							onChange={onFieldChange}
						/>
					</div>
				</div>
				<div className="flex mt3 ml-auto mr3 mb3 w-60 justify-center">
					<div
						className="w4 b ph3 pv2 mr1 tc light-silver ba br2 b--light-silver bg-transparent grow pointer outline-0 f6"
						onClick={cancelFood}
					>
						Cancel
					</div>
					<button
						className="w4 b ph3 pv2 ml1 tc light-blue ba br2 b--light-blue bg-transparent grow outline-0 pointer f6"
						type="submit"
						onClick={onSubmit.bind(
							null,
							{
								food: food,
								calories: calories,
								fat: fat,
								carbs: carbs,
								protein: protein
							},
							activeUser.id,
							formCorrect
						)}
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default NutritionInput;
