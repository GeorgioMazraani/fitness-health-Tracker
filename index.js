const express = require('express');
const http = require('http');
const socketModule = require('./socket');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const port = process.env.APP_PORT;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({ origin: '*' }));

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
const mealCategoriesRoute = require('./routes/mealCategories.route');

app.get("/", (req, res) => {
    res.status(200).json({ message: "this is the index page" })
});

app.use('/api/users', userRoute);
app.use('/api/friends', friendRoute);
app.use('/api/meals', mealRoute);
app.use('/api/goals', goalRoute);
app.use('/api/recipes', recipeRoute);
app.use('/api/settings', settingsRoute);
app.use('/api/workouts', workoutsRoute);
app.use('/api/achievements', achievementRoute);
app.use('/api/feedback', feedbackRoute);
app.use('/api/notifications', notificationRoute);
app.use('/api/dailylogs', dailyLogsRoute);
app.use('/api/meal/categories', mealCategoriesRoute);

const server = http.createServer(app);
socketModule.init(server);
const io = socketModule.getIO();

io.on('connection', (socket) => {
    console.log('A user connected to WebSocket');

    socket.on('disconnect', () => {
        console.log('A user disconnected from WebSocket');
    });


});

server.listen(port, () => {
    console.log(`app is listening at port ${port}`);
});
