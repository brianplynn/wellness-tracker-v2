const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const session = require('express-session');
const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URL);
const redisStore = require('connect-redis')(session);

const register = require('./controllers/register');
const login = require('./controllers/login');
const nutrition = require('./controllers/nutrition');
const sleep = require('./controllers/sleep');
const exercise = require('./controllers/exercise');

const app = express();
app.use(cors({credentials: true, origin: true}));
app.options('*', cors());
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static("public"));

redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});

const port = process.env.PORT || 5000;
const { SESS_NAME = 'sid', SESS_SECRET='asdfsecret' } = process.env;

app.use(session({
    name: SESS_NAME,
    secret: SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
    	maxAge: 30 * 24 * 60 * 60 * 1000,
    	httpOnly: false
    },
    // uncomment for local redis
    // store: new redisStore({
    //   host: 'localhost',
    //   port: 6379,
    //   client: redisClient,
    //   ttl: 86400
    // }),
    store: new redisStore({
      client: redisClient
    })

}))


const db = knex({
  client: 'pg',
  connection: {
    connectionString : 'postgres://nymfnuqgemkyjk:855d59ea5291d112c7a7a7033bddc65edf4c0b14b76642c33b0933949e20f5c8@ec2-75-101-147-226.compute-1.amazonaws.com:5432/d4bbvqp9e1u7c5',
    ssl: true,
  }
  // uncomment for local db
  // connection: {
  //   host : '127.0.0.1',
  //   port: '5432',
  //   user : 'postgres',
  //   database : 'wellness-tracker'
  // }
});

app.get('/api/auth', (req, res) => {
	return req.session.userId ? res.json(req.session.userId) : res.status(400).json('user id does not exist')
})

app.get('/api/logout', (req, res) => {
	req.session.destroy(err => {
		if (err) {
			return res.json({ message: 'failed to logout' });
		}
		res.clearCookie(SESS_NAME);
		return res.json({ message: 'logged out' });
	})
})

app.get("/api/nutrition/:id", (req, res) => { nutrition.getNutrition(req, res, db)});
app.post("/api/nutrition-submit", (req, res) => { nutrition.addNutrition(req, res, db)});
app.delete("/api/nutrition-delete", (req, res) => { nutrition.deleteNutrition(req, res, db)});

app.get("/api/sleep/:id", (req, res) => { sleep.getSleepData(req, res, db)});
app.post("/api/add-sleep", (req, res) => { sleep.addSleep(req, res, db)});
app.put("/api/edit-sleep", (req, res) => { sleep.editSleep(req, res, db)});

app.get("/api/exercise/:id", (req, res) => { exercise.getWorkouts(req, res, db)});
app.post("/api/exercise-submit", (req, res) => { exercise.submitWorkouts(req, res, db)});

app.post("/api/login-fb", (req, res) => { login.logInFB(req, res, db) });
app.post("/api/login-gh", (req, res) => { login.logInGithub(req, res, db) });
app.get("/api/guest", (req, res) => { login.guest(req, res, db) });

app.post("/api/register-fb", (req, res) => { register.registerFB(req, res, db) });
app.post("/api/register-gh", (req, res) => { register.registerGithub(req, res, db) });

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => {
    console.log(`${port}`)
})
