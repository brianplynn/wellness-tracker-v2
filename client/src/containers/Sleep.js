import React, { Component } from "react";
import { connect } from "react-redux";
import SleepTable from "../components/Sleep/SleepTable.js";
import SleepInput from "../components/Sleep/SleepInput.js";
import SleepGraph from "../components/Sleep/SleepGraph.js";
import { cancelSleep, editSleep, saveSleepChanges, changeSleepField, addSleepToGraph, changeSleepAddForm } from  "../actions";

const mapStateToProps = state => ({
	activeUser: state.activeUser,
	currentDate: state.currentDate,
	sleepFields: state.sleepFields,
	sleepAddForm: state.sleepAddForm,
	sleepData: state.sleepData,
	addingSleep: state.addingSleep,
	editingSleepData: state.editingSleepData,
	sleepHasSynced: state.sleepHasSynced
});

const mapDispatchToProps = dispatch => ({
	changeSleepField: (row, col, e) => dispatch(changeSleepField(row, col, e.target.value)),
	saveSleepChanges: (data, user) => {
		fetch('/api/edit-sleep', {
			method: "put",
	        headers: {'Content-Type': 'application/json'},
	        body: JSON.stringify({  
	          data: data,
	          user: user
	        })
		})
		.then(res => res.json())
		.catch(err => console.log(err))
		return dispatch(saveSleepChanges(data));
	},
	changeSleepAddForm: (e) => dispatch(changeSleepAddForm(e.target.dataset.field, e.target.value)),
	addSleepToGraph: (data, user, e) => {
		e.preventDefault();
		fetch('/api/add-sleep', {
			method: "post",
	        headers: {'Content-Type': 'application/json'},
	        body: JSON.stringify({  
	          data: data,
	          user: user
	        })
		})
		.then(res => res.json())
		.catch(err => console.log(err))
		return dispatch(addSleepToGraph(data));
	},
	editSleep: (data) => dispatch(editSleep(data)),
	cancelSleep: () => dispatch(cancelSleep())
});

class Sleep extends Component {
	render() {
		const { activeUser, currentDate, cancelSleep, editSleep, sleepAddForm, changeSleepAddForm, addSleepToGraph, addingSleep, editingSleepData, sleepData, sleepFields, changeSleepField, saveSleepChanges, sleepHasSynced } = this.props;
		return (
			<div> {
				sleepHasSynced ?
				(addingSleep ? <SleepInput currentDate={currentDate}
														  changeSleepAddForm={changeSleepAddForm}
														  sleepAddForm={sleepAddForm}
														  activeUser={activeUser}
														  addSleepToGraph={addSleepToGraph}/>
								: ( editingSleepData ?
								<SleepTable currentDate={currentDate}
											activeUser={activeUser}
											sleepFields={sleepFields}
											sleepData={sleepData}
											changeSleepField={changeSleepField}
											saveSleepChanges={saveSleepChanges}
											cancelSleep={cancelSleep} />
								: <SleepGraph sleepData={sleepData}
											  editSleep={editSleep}/>
									))
				:
				null
				}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Sleep);