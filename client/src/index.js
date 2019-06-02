import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Router } from 'react-router-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from "./reducers"
import history from "./history";
import './index.css';
import App from './containers/App';
import "tachyons";
import Particles from 'react-particles-js';
import * as serviceWorker from './serviceWorker';

const logger = createLogger();
const store = 
	createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

const particlesOptions = {
  particles: {
    number: {
      value: 20,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

ReactDOM.render(
                
          				<Provider store={store}>
          					<Particles className="particles" params={particlesOptions}/>
          					<Router history={history}>
                      <Switch>
                        <Route path="/" component={App} />
                      </Switch>
                    </Router>
          				</Provider>, document.getElementById('root')
                );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
