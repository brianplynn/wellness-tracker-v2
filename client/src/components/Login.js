import React, { Component } from "react";
import "./Login.css";
import history from "../history";
import ErrorMessage from "./ErrorMessage.js";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GitHubLogin from "react-github-login";

class Login extends Component {
	responseFacebook = response => {
		const {
			setErrorMessage,
			logIn,
			syncNutritionFunc,
			syncSleepFunc,
			syncWorkoutsFunc
		} = this.props;
		setErrorMessage("Connecting...");
		if (response.name) {
			fetch("/api/login-fb", {
				method: "post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: response.id
				})
			})
				.then(res => res.json())
				.then(res => {
					if (res === "No such user. Please register")
						throw new Error(res);
					logIn({ id: res.id });
					syncWorkoutsFunc("fb_" + response.id);
					syncNutritionFunc("fb_" + response.id);
					syncSleepFunc("fb_" + response.id);
					history.push("/nutrition");
				})
				.catch(err => {
					if (err.message === "No such user. Please register") {
						fetch("/api/register-fb", {
							method: "post",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								id: response.id
							})
						})
							.then(res => res.json())
							.then(res => {
								logIn({ id: res[0] });
								history.push("/nutrition");
							})
							.catch(err => {
								console.log(err);
								setErrorMessage("Unable to login.");
							});
					} else {
						setErrorMessage("Unable to login.");
					}
				});
		} else {
			setErrorMessage("Unable to login.");
		}
	};

	onSuccess = response => {
		const {
			setErrorMessage,
			logIn,
			syncNutritionFunc,
			syncSleepFunc,
			syncWorkoutsFunc
		} = this.props;
		setErrorMessage("Connecting...");
		fetch("/api/login-gh", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				code: response.code
			})
		})
			.then(res => res.json())
			.then(res => {
				if (res.message === "No such user. Please register") {
					fetch("/api/register-gh", {
						method: "post",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							id: res.id
						})
					})
						.then(res => res.json())
						.then(res => {
							logIn({ id: res[0] });
							history.push("/nutrition");
						})
						.catch(err => console.log(err));
				} else {
					logIn({ id: res.id });
					syncWorkoutsFunc(res.id);
					syncNutritionFunc(res.id);
					syncSleepFunc(res.id);
					history.push("/nutrition");
				}
			})
			.catch(err => {
				console.log(err);
			});
	};
	onFailure = response => console.error(response);

	guestLogin = () => {
		const { setErrorMessage, logIn } = this.props;
		setErrorMessage("Connecting...");
		fetch("/api/guest", {
			method: "get",
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(res => {
				if (res.id === "guest") {
					logIn({ id: res.id });
					history.push("/nutrition");
				}
			});
	};

	render() {
		const { messageText } = this.props;
		return (
			<div className="login center flex flex-column justify-center ba ph3 pv3 pv4-ns ph4-m ph5-l">
				<h1 className="white tc">Welcome!</h1>
				<div className="facebook mt2">
					<FacebookLogin
						appId="513697765824552"
						fields="name,email"
						render={renderProps => (
							<button
								className="facebook-btn"
								onClick={renderProps.onClick}
							>
								Sign in with Facebook
							</button>
						)}
						callback={this.responseFacebook}
						version={3.2}
					/>
				</div>
				<GitHubLogin
					className="github"
					clientId="c7bdc63f0a88829cb6f2"
					buttonText="Sign in with Github"
					redirectUri=""
					onSuccess={this.onSuccess}
					onFailure={this.onFailure}
				/>
				<div className="guest-login tc" onClick={this.guestLogin}>
					Continue as Guest
				</div>
				{messageText !== "" ? (
					<ErrorMessage messageText={messageText} />
				) : (
					""
				)}
			</div>
		);
	}
}
export default Login;
