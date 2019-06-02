import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Exercise from "../containers/Exercise.js";
import Sleep from "../containers/Sleep.js";
import Nutrition from "../containers/Nutrition.js";

class Main extends React.Component {
	componentDidMount() {
		const { activeUser, syncWorkoutsFunc, syncNutritionFunc, syncSleepFunc } = this.props;
		syncNutritionFunc(activeUser.id);
		syncSleepFunc(activeUser.id);
		syncWorkoutsFunc(activeUser.id);
	}
	render() {
		return (
		<React.Fragment>
			<Switch>
				<Route exact path="/" component={Nutrition} />
				<Route path="/nutrition" component={Nutrition} />
				<Route path="/sleep" component={Sleep} />
				<Route path="/exercise" component={Exercise} />
			</Switch>
		</React.Fragment>
		)
	}
}

export default Main;