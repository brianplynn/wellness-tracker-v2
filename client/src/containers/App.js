import React, { Component } from 'react';
import { connect } from "react-redux"
import './App.css';
import Navbar from "../components/Navbar.js";
import Main from "../components/Main.js";
import Login from "../components/Login.js";
import { setError, syncNutrition, syncSleep, syncWorkouts, setActiveSection, logIn, addDailyFoods, authCheck } from "../actions"

const mapStateToProps = state => {
	return {
		activeUser: state.activeUser,
		activeSection: state.activeSection,
		isLoggedIn: state.isLoggedIn,
		messageText: state.messageText,
		hasAuthChecked: state.hasAuthChecked
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setSection: (e) => dispatch(setActiveSection(e.target.title)),
		logIn: (response) => dispatch(logIn(response)),
		addDailyFoods: (foods) => dispatch(addDailyFoods(foods)),
		syncWorkoutsFunc: (id) => dispatch(syncWorkouts(id)),
		syncNutritionFunc: (id) => dispatch(syncNutrition(id)),
		syncSleepFunc: (id) => dispatch(syncSleep(id)),
		setErrorMessage: (msg) => dispatch(setError(msg)),
		authCheck: () => dispatch(authCheck())
	}
};


class App extends Component {

	componentDidMount() {
		const { authCheck } = this.props;
		authCheck();
	}

	render() {
		const { activeUser, setErrorMessage, messageText, syncNutritionFunc, syncSleepFunc, syncWorkoutsFunc, logIn, setSection, isLoggedIn, hasAuthChecked } = this.props;
	    return (
	      hasAuthChecked ?
	      ( isLoggedIn ?
	      <div className="App">
			   <Navbar setSection={setSection} />
			   <Main isLoggedIn={isLoggedIn}
			   		 activeUser={activeUser}
			   		 syncWorkoutsFunc={syncWorkoutsFunc}
			   		 syncSleepFunc={syncSleepFunc}
			   		 syncNutritionFunc={syncNutritionFunc} />
	      </div>
	      : <React.Fragment><Login logIn={logIn}
	      		   addDailyFoods={addDailyFoods}
	      		   syncWorkoutsFunc={syncWorkoutsFunc}
	      		   syncSleepFunc={syncSleepFunc}
	      		   syncNutritionFunc={syncNutritionFunc}
	      		   setErrorMessage={setErrorMessage}
	      		   messageText={messageText} />
	      	</React.Fragment>
	      )
	      :
	      <div className="App">
	      	<h1 className="loading-msg">Loading....</h1>
	      </div>
	    );
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

