import React from 'react';
import "./SleepInput.css";

const SleepInput = ({ activeUser, currentDate, sleepAddForm, changeSleepAddForm, addSleepToGraph }) => {
	return (
		<form className="form-sleep pa4 white center ba w-50 br2">
		  <h1 className="tc">Good {currentDate.getHours() < 12 ? "Morning" : (currentDate.getHours() < 18 ? "Afternoon" : "Evening")}!
		  </h1>
		  <h2 className="tc f3">Enter last night's sleep here:
		  </h2>
		  <div>
		    <label htmlFor="name" className="f4 fw7 tc center b db mt4 mb3">Time</label>
		    <div className="flex justify-center">
			    <input autoComplete="off" 
			    	   className="input-reset ba b--white pa2 white bg-transparent mb2 db w-20 mw3 mr2" 
			    	   type="text" 
			    	   aria-describedby="name-desc" 
			    	   placeholder="0"
			    	   data-field="hours"
			    	   value={sleepAddForm.hours}
			    	   onChange={changeSleepAddForm} />
			    <div className="f3"> : </div>
			    <input autoComplete="off" 
			    	   className="input-reset ba b--white pa2 white bg-transparent mb2 db w-20 mw3 ml1" 
			    	   type="text" 
			    	   aria-describedby="name-desc" 
			    	   placeholder="00"
			    	   data-field="minutes"
			    	   value={sleepAddForm.minutes}
			    	   onChange={changeSleepAddForm} />
		 	</div>
		  </div>
		  <fieldset className="mt4 mb4 w-60 center bn">
		    <legend className="center tc fw7 f4 mt5 mb3">Quality</legend>
		    <div className="flex quality justify-around">
			    <label className="container" data-field="quality" value={sleepAddForm.quality}>
			    	<div className="b mt1 ml1 f5">Good</div>
				  <input onClick={changeSleepAddForm} value="Good" data-field="quality" type="radio" name="quality" />
				  <span className="checkmark"></span>
				</label>

				<label className="container" data-field="quality" value={sleepAddForm.quality}>
					<div className="b mt1 ml1 f5">OK</div>
				  <input onClick={changeSleepAddForm} value="OK" data-field="quality" type="radio" name="quality" />
				  <span className="checkmark"></span>
				</label>

				<label className="container" data-field="quality" value={sleepAddForm.quality}>
					<div className="b mt1 ml1 f5">Bad</div>
				  <input onClick={changeSleepAddForm} value="Bad" data-field="quality" type="radio" name="quality" />
				  <span className="checkmark"></span>
				</label>
		    </div>
		  </fieldset>
		  <button type="submit" 
		  		  className="db w4 b ph3 pv2 center tc light-blue ba br2 b--light-blue bg-transparent grow pointer f6"
		  		  onClick={addSleepToGraph.bind(null, sleepAddForm, activeUser.id)}
		  		  >
		  	Submit
		  </button>
		</form>

	);
}

export default SleepInput;