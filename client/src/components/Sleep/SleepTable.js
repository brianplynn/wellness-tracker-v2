import React from 'react';
import "./SleepTable.css";
const SleepTable = ({ activeUser, sleepFields, cancelSleep, sleepData, currentDate, changeSleepField, saveSleepChanges }) => {
	return (
		<div className="pa4 z-1">
		  <div className="z-inherit">
		    <table className="f6 w-30 mw8 center z-inherit" cellSpacing="0">
		      <thead>
		        <tr>
		          <th className="fw6 tc white bb pb3 pr3">Date</th>
		          <th className="fw6 tc white bb pb3 pr3">Hours</th>
		          <th className="fw6 tc white bb pb3 pr3">Minutes</th>
		          <th className="fw6 tc white bb pb3 pr3">Quality</th>
		        </tr>
		      </thead>
		      <tbody className="lh-copy z-inherit">
		       {sleepFields.map( (item, i) => {
		       		return (
		       	        		<tr key={i}>
		       		        		<td className="pv3 b tc pr3 mb2 bt white b--white">
		       		        			{sleepData.dates.slice().reverse()[i]}
		       		        		</td>
		       		        		<td className="pv3 b tc pr3 bt b--white">
		       					    <input autoComplete="off" 
		       					    	   onChange={changeSleepField.bind(null, i, "hours")}
		       					    	   type="number"
		       					    	   value={sleepFields[i].hours}
		       					    	   className="input-reset ba b--white pa2 white bg-transparent mb2 w3 mw4"
		       					    	    /></td>
		       					    <td className="pv3 b tc pr3 bt b--white">
		       					    <input autoComplete="off" 
		       					    	   onChange={changeSleepField.bind(null, i, "minutes")}
		       					    	   type="number"
		       					    	   value={sleepFields[i].minutes} 
		       					    	   className="input-reset ba b--white pa2 white bg-transparent mb2 w3 mw4"
		       					    	    /></td>
		       					    <td className="pv3 b tc pr3 bt b--white z-inherit">
		       					    <select onChange={changeSleepField.bind(null, i, "quality")}
		       					    		className="center b white tc pa1 br2 mb2 bg-transparent shadow-3">
		       						  <option value={sleepFields[i].quality} className="b hid z-inherit dropbtn">{sleepFields[i].quality}</option>
		       						    <option className="dropdown-option black-60 bg-light-gray br2 z-2 pv2 ph0 pointer bw0"
		       					    	   	 value="Good">Good</option>
		       						    <option className="dropdown-option black-60 bg-light-gray br2 z-2 pv2 ph0 pointer bw0"
		       					    	   	 value="OK">OK</option>
		       						    <option className="dropdown-option black-60 bg-light-gray br2 z-2 pv2 ph0 pointer bw0"
		       					    	   	 value="Bad">Bad</option>
		       						</select>
		       						</td>
		       					</tr>
		       					)
		       	        	}
	        	)}
		      </tbody>
		    </table>
		    <div className="flex justify-center">
				  <button className="w4 b ph3 pv2 mr1 tc light-silver ba br2 b--light-silver bg-transparent grow pointer outline-0 f6"
						  type="submit"
						  onClick={cancelSleep}
						  >Cancel</button> 
				  <button className="w4 b ph3 pv2 ml1 tc light-blue ba br2 b--light-blue bg-transparent grow outline-0 pointer f6"
				  		  onClick={saveSleepChanges.bind(null, sleepFields, activeUser.id)}>
				  		  Submit
				  </button>
			</div>
		  </div>
		</div>
	);
}

export default SleepTable;