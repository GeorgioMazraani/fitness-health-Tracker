// Importing required modules
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const ejs = require("ejs");
require('dotenv').config();
const cron = require('node-cron');
const { deleteMealsForAllUsers } = require('./controllers/mealController');
const {getUser}=require('./services/userService');

// Setting up the server port from environment variables
const port = process.env.APP_PORT;
const app = express();

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// Enabling CORS for all origins
app.use(cors({ origin: '*' }));

app.use(express.static('public'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000
    }
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport session setup
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {

    getUser(id, function (err, user) {
        if (err) { return done(err); }
        done(null, user);
    });
});


cron.schedule('0 0 * * *', async () => {
    try {
        await deleteMealsForAllUsers();
        console.log('Meals reset successfully.');
    } catch (error) {
        console.error('Error resetting meals:', error);
    }
});


// Importing route modules
const userRoute = require('./routes/user.route');
const friendRoute = require('./routes/friend.route');
const mealRoute = require('./routes/meal.route');
const goalRoute = require('./routes/goal.route');
const recipeRoute = require('./routes/recipe.route');
const settingsRoute = require('./routes/setting.route');
const workoutsRoute = require('./routes/workout.route');
const achievementRoute = require('./routes/achievement.route');
const feedbackRoute = require('./routes/feedback.route');
const notificationRoute = require('./routes/notification.route');
const dailyLogsRoute = require('./routes/dailyLogs.route');
// const mealCategoriesRoute = require('./routes/mealCategories.route');


// Registering API routes
app.use(userRoute);
app.use('/friends', friendRoute);
app.use(mealRoute);
app.use(goalRoute);
app.use(recipeRoute);
app.use(settingsRoute);
app.use(workoutsRoute);
app.use(achievementRoute);
app.use(feedbackRoute);
app.use('/api/notifications', notificationRoute);
app.use(dailyLogsRoute);





app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', { user: req.session.user });
    } else {
        res.redirect('/login');
    }
});


app.get('/', (req, res) => {
    if (req.session.user) {
        res.render('homePage', { user: req.session.user }); // Render with user data
    } else {
        res.render('homePage'); // Render without user data
    }
});



// Starting the server
app.listen(port, () => {
    console.log(`app is listening at port ${port}`);
});
