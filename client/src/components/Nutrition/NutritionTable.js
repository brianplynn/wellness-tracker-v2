import React from 'react';

const NutritionTable = ({ dailyFoods, deleteFood, addAnotherFood }) => {
	const sumNutrient = (nutrient) => {
		return dailyFoods[0] ? dailyFoods.map( food => Number(food[nutrient]))
						 .reduce( (acc, currVal) => acc + currVal)
					   : ""
	}
	return (
		<div className="pa4">
		  <div className="overflow-auto">
		  	<h1 className="tc white mb5">Your Daily Nutrition History</h1>
		    <table className="f6 w-100 mw8 center" cellSpacing="0">
		      <thead>
		        <tr>
		          <th className="fw6 tc white bb pb3 pr3">Food</th>
		          <th className="fw6 tc white bb pb3 pr3">Calories</th>
		          <th className="fw6 tc white bb pb3 pr3">Fat</th>
		          <th className="fw6 tc white bb pb3 pr3">Carbs</th>
		          <th className="fw6 tc white bb pb3 pr3">Protein</th>
		        </tr>
		      </thead>
		      <tbody className="lh-copy">
		        {dailyFoods.map( (food, i) => {
				       return <tr key={i}>
				          <td className="pv3 tc pr3 bb b--white">{food.food}</td>
				          <td className="pv3 tc pr3 bb b--white">{food.calories}</td>
				          <td className="pv3 tc pr3 bb b--white">{food.fat}</td>
				          <td className="pv3 tc pr3 bb b--white">{food.carbs}</td>
				          <td className="pv3 tc pr3 bb b--white">{food.protein}</td>
				       	  <td className="pv3 tc pr3">
				       	  <button className="br-100 bw1 b pointer ba b--washed-red bg-transparent washed-red"
			       	  			value={i}
			       	  			data-id={food.food_id} 
			       	  			onClick={deleteFood}>x</button></td>
				        </tr>
				        ;
		    		})
		        }
		        <tr>
		        	<td className="pv3 b tc pr3 bt b--white">Daily Total</td>
				    <td className="pv3 b tc pr3 bt b--white">
				    	{sumNutrient("calories")}
				    </td>
				    <td className="pv3 b tc pr3 bt b--white">
				    	{sumNutrient("fat")}
				    </td>
				    <td className="pv3 b tc pr3 bt b--white">
				    	{sumNutrient("carbs")}
				    </td>
				    <td className="pv3 b tc pr3 bt b--white">
				    	{sumNutrient("protein")}
				    </td>
		        </tr>
		      </tbody>
		    </table>
		    <p className="w4 b ph3 pv2 center tc light-blue ba br2 b--light-blue bg-transparent grow pointer f6"
		       onClick={addAnotherFood}>
		    	Add Food
		    </p>
		  </div>
		</div>
		);
}

export default NutritionTable;