# Fitness and Diet Tracker API

Welcome to the Fitness and Diet Tracker API repository! This repository contains the backend code for the Fitness and Diet Tracker web application. The backend is developed using Node.js, Express, and other technologies to handle server-side operations and provide API services for the application.

## Table of Contents

- [Project Setup Instructions](#project-setup-instructions)
- [API Endpoints and Usage](#api-endpoints-and-usage)
- [Database Schema Description](#database-schema-description)
- [Third-Party Libraries or Tools](#third-party-libraries-or-tools)
- [Running and Testing Application from Postman](#running-and-testing-application-from-postman)
- [Code Documentation](#code-documentation)

## Project Setup Instructions

- **Clone the Repository**: `git clone https://github.com/GeorgioMazraani/fitness-health-Tracker.git`
- **Install Dependencies**: Navigate to the project directory and run `npm install`.
- **Environment Setup**: Configure the required environment variables as outlined in the `.env` file.
- **Database Setup**: Set up your MySQL database using MySQL Workbench or similar tools. Import the `fitness.sql` file to create and initialize the database schema.
- **Starting the Server**: Run `npm run dev` to start the API server.

## API Endpoints and Usage

#### Feedback Service
- **Get Feedback**: `GET /feedback` - Retrieves feedback entries.
- **Submit Feedback**: `POST /feedback` - Submits new feedback.
- **Delete Feedback**: `DELETE /feedback` - Deletes a feedback entry.

#### Friend Service
- **Get All Friends**: `GET /friends` - Retrieves a list of all friends.
- **Get Blocked Friends**: `GET /blocked` - Retrieves a list of blocked friends.
- **Get Pending Friends**: `GET /pending` - Retrieves a list of pending friend requests.
- **Add Friend**: `POST /add` - Sends a friend request.
- **Accept Friend Request**: `PUT /accept` - Accepts a friend request.
- **Block Friend**: `PUT /block` - Blocks a user.
- **Remove Friend**: `DELETE /remove` - Removes a friend from the list.

#### Goal Service
- **Get Goals**: `GET /goals` - Retrieves a list of goals.
- **Get Goal**: `GET /goal` - Retrieves a specific goal.
- **Insert Goal**: `POST /goal` - Adds a new goal.
- **Update Goal**: `PUT /goal` - Updates an existing goal.
- **Delete Goal**: `DELETE /goal` - Deletes a goal.

#### Meal Service
- **Get Meals**: `GET /meals` - Retrieves a list of meals.
- **Get Meal**: `GET /meal` - Retrieves a specific meal.
- **Save Meal**: `POST /meal` - Saves a new meal.
- **Modify Meal**: `PUT /meal` - Modifies an existing meal.
- **Delete Meal**: `DELETE /meal` - Deletes a meal.

#### Meal Categories Service
- **Get All Categories**: `GET /categories` - Retrieves all meal categories.
- **Get Category by ID**: `GET /category` - Retrieves a specific meal category by ID.

#### Notification Service
- **Get Notification**: `GET /notification` - Retrieves notifications.
- **Add Notification**: `POST /notification` - Adds a new notification.
- **Delete Notification**: `DELETE /notification` - Deletes a notification.

#### Recipe Service
- **Get Recipes**: `GET /recipes` - Retrieves a list of recipes.
- **Get Recipe**: `GET /recipe` - Retrieves a specific recipe.
- **Insert Recipe**: `POST /recipe` - Adds a new recipe.
- **Update Recipe**: `PUT /recipe` - Updates an existing recipe.
- **Delete Recipe**: `DELETE /recipe` - Deletes a recipe.

#### Setting Service
- **Get Settings**: `GET /settings` - Retrieves user settings.
- **Save Settings**: `POST /settings` - Saves or updates user settings.

#### User Service
- **Get All Users**: `GET /users` - Retrieves all users.
- **Get User**: `GET /user` - Retrieves a specific user.
- **Insert User**: `POST /user` - Adds a new user.
- **Update User**: `PUT /user` - Updates an existing user.
- **Delete User**: `DELETE /user` - Deletes a user.

#### Workout Service
- **Get Workouts**: `GET /workouts` - Retrieves a list of workouts.
- **Get Workout**: `GET /workout` - Retrieves a specific workout.
- **Insert Workout**: `POST /workout` - Adds a new workout.
- **Update Workout**: `PUT /workout` - Updates an existing workout.
- **Delete Workout**: `DELETE /workout` - Deletes a workout.

#### Achievement Service
- **Get Achievements**: `GET /achievements` - Retrieves a list of achievements.
- **Add Achievement**: `POST /achievement` - Adds a new achievement.

#### Daily Logs Service
- **Get Daily Logs**: `GET /dailylogs` - Retrieves all daily logs.
- **Get Daily Log**: `GET /dailylog` - Retrieves a specific daily log.
- **Save Daily Log**: `POST /dailylog` - Saves a new daily log.
- **Delete Daily Log**: `DELETE /dailylog` - Deletes a daily log.

## Database Schema Description

#### Users Table
- **userID (INT)**: Unique identifier for each user.
- **username (VARCHAR(255))**: The user's chosen username.
- **password (VARCHAR(255))**: Encrypted password for user authentication.
- **email (VARCHAR(255))**: User's email address.
- **age (INT)**: User's age.
- **weight (DECIMAL(5,2))**: User's weight.
- **height (DECIMAL(5,2))**: User's height.
- **gender (ENUM)**: User's gender.
- **goal (VARCHAR(255))**: User's fitness goal.

#### Goals Table
- **goalID (INT)**: Unique identifier for each goal.
- **userID (INT)**: Reference to the user this goal belongs to.
- **startDate (DATE)**: The start date of the goal.
- **endDate (DATE)**: The end date of the goal.
- **initialWeight (DECIMAL(5,2))**: Weight of the user at the start of the goal.
- **targetWeight (DECIMAL(5,2))**: Target weight to achieve.
- **progress (TEXT)**: Descriptive progress logged towards the goal.

#### Workouts Table
- **workoutID (INT)**: Unique identifier for each workout session.
- **userID (INT)**: Reference to the user who logged the workout.
- **workoutName (VARCHAR(255))**: Name or type of the workout.
- **workoutDate (DATE)**: Date when the workout was performed.
- **duration (DECIMAL(5,2))**: Duration of the workout in hours/minutes.
- **caloriesBurned (DECIMAL(5,2))**: Estimated calories burned during the workout.

#### Meals Table
- **mealID (INT)**: Unique identifier for each meal entry.
- **userID (INT)**: Reference to the user who logged the meal.
- **categoryID (INT)**: Reference to the meal category.
- **mealName (VARCHAR(255))**: Name of the meal.
- **mealDate (DATE)**: Date when the meal was consumed.
- **calories (DECIMAL(5,2))**: Caloric content of the meal.
- **proteins (DECIMAL(5,2))**: Protein content of the meal.
- **carbs (DECIMAL(5,2))**: Carbohydrate content of the meal.
- **fats (DECIMAL(5,2))**: Fat content of the meal.

#### Meal Categories Table
- **categoryID (INT)**: Unique identifier for each meal category.
- **categoryName (VARCHAR(255))**: Name of the category, such as 'Breakfast', 'Lunch', 'Dinner', etc.

#### Daily Logs Table
- **logID (INT)**: Unique identifier for each daily log entry.
- **userID (INT)**: Reference to the user who created the log.
- **logDate (DATE)**: Date for the daily log.
- **totalCaloriesConsumed (DECIMAL(5,2))**: Total calories consumed on that day.
- **totalCaloriesBurned (DECIMAL(5,2))**: Total calories burned on that day through activities and workouts.
- **summary (TEXT)**: A textual summary or notes for the day.

#### Achievements Table
- **achievementID (INT)**: Unique identifier for each achievement.
- **userID (INT)**: Reference to the user who achieved it.
- **badgeName (VARCHAR(255))**: The name of the achievement or badge earned.
- **dateEarned (DATE)**: Date when the achievement was earned.

#### Recipes Table
- **recipeID (INT)**: Unique identifier for each recipe.
- **categoryID (INT)**: Reference to the category this recipe belongs to.
- **mealName (VARCHAR(255))**: Name of the recipe.
- **ingredients (TEXT)**: Ingredients required for the recipe.
- **preparation (TEXT)**: Preparation instructions for the recipe.
- **servingSize (VARCHAR(255))**: Recommended serving size for the recipe.
- **caloriesPerServing (DECIMAL(5,2))**: Calories per serving of the recipe.

#### User Settings Table
- **settingID (INT)**: Unique identifier for each user setting entry.
- **userID (INT)**: Reference to the user to whom the settings belong.
- **theme (ENUM)**: The theme setting for the user interface.
- **notificationsEnabled (TINYINT(1))**: Flag indicating if notifications are enabled.

#### Notifications Table
- **notificationID (INT)**: Unique identifier for each notification.
- **userID (INT)**: Reference to the user to whom the notification is sent.
- **content (TEXT)**: Content of the notification message.
- **dateCreated (TIMESTAMP)**: Timestamp when the notification was created.

#### User Feedback Table
- **feedbackID (INT)**: Unique identifier for each feedback entry.
- **userID (INT)**: Reference to the user who provided the feedback.
- **content (TEXT)**: Content of the feedback.
- **dateSubmitted (TIMESTAMP)**: Timestamp when the feedback was submitted.

#### Friends Table
- **friendshipID (INT)**: Unique identifier for each friendship or friend request.
- **userID1 (INT)**: Reference to one user in the friendship.
- **userID2 (INT)**: Reference to the other user in the friendship.
- **status (ENUM)**: Status of the friendship, such as 'pending', 'accepted', 'blocked', etc.

## Third-Party Libraries or Tools

- **body-parser**: Middleware for parsing incoming request bodies in a middleware before your handlers, available under the `req.body` property.
- **cors**: Package for providing a Connect/Express middleware that can be used to enable CORS (Cross-Origin Resource Sharing).
- **dotenv**: Loads environment variables from a `.env` file into `process.env`, allowing you to separate secrets from your source code.
- **express**: Fast, unopinionated, minimalist web framework for Node.js, which is the backbone of your server.
- **express-validator**: Middleware that wraps validator.js, a library that provides validator and sanitizer functions, for validating and sanitizing request data.
- **moment**: A JavaScript date library for parsing, validating, manipulating, and formatting dates.
- **mysql2**: A MySQL client for Node.js with focus on performance. It supports the MySQL protocol and all MySQL features.
- **nodemon**: A utility that will monitor for any changes in your source and automatically restart your server, perfect for development.
- **socket.io**: Enables real-time bidirectional event-based communication between web clients and servers.

## Running and Testing Application from Postman

Postman is a popular API client that makes it easy to create, share, test, and document APIs. To test the Fitness and Diet Tracker API using Postman, follow these steps:

1. **Install Postman**: If you don't already have Postman installed, download and install it from the [official Postman website](https://www.postman.com/downloads/).

2. **Import the API Collection**:
   - Launch Postman.
   - Click on the 'Import' button at the top left corner.
   - You can import the collection by selecting the file, pasting a URL, or directly copying the JSON content.
   - If you have an API collection file (`*.json`), select 'File' and upload it.
   - After importing, you should see the collection in the left sidebar.

3. **Set Up Environment Variables**:
   - Create a new environment by clicking on the gear icon in the upper right corner and selecting 'Manage Environments'.
   - Add environment variables such as the base URL of the API, any authentication tokens, user IDs, etc., which you can reference in your API requests.

4. **Sending Requests**:
   - Select an API request from the imported collection.
   - Make sure you have selected the appropriate environment from the environment dropdown.
   - If the request requires parameters or a body payload, enter the necessary data.
   - Click the 'Send' button to make the request.

5. **Reviewing Responses**:
   - After sending the request, you will receive a response in the lower pane.
   - Check the status code, response body, and headers.
   - Ensure the response is as expected based on the API documentation.

6. **Testing and Validation**:
   - You can write test scripts for your requests in Postman to validate the response automatically.
   - Click on the 'Tests' tab inside the request and write your JavaScript tests.
   - When you send the request, Postman will run these tests against the response.

7. **Automated Testing**:
   - Use Postman's 'Runner' feature to run a series of requests automatically and view aggregated results.
   - This is useful for regression testing and ensuring that your API's behavior is consistent over time.

Remember to regularly update your Postman collection as your API evolves. This ensures that your tests remain relevant and accurate.

## Code Documentation

Our codebase is thoroughly documented to ensure that both current and future developers can easily understand and work with the code. Here's how we approach documentation:

1. **Inline Comments**: We use inline comments to explain complex logic or important decisions made in the code. This helps anyone reading the code to follow along with the thought process of the original developer.

2. **Function and Method Descriptions**: Each function or method is accompanied by a comment block that describes what it does, its parameters, and what it returns. For example:

   ```javascript
   /**
    * Calculates the total calories burned based on the workout duration and intensity.
    * @param {number} duration - The duration of the workout in minutes.
    * @param {string} intensity - The intensity level of the workout ('low', 'medium', 'high').
    * @return {number} The total calories burned.
    */
   function calculateCaloriesBurned(duration, intensity) {
       // ...function implementation...
   }
   ```

3. **Class Descriptions**: For each class, we document the purpose of the class, its properties, and its methods.

4. **Code Structure**: We provide a high-level overview of the code structure in the documentation, explaining how different modules and components interact.

5. **API Documentation**: Our API endpoints are documented with details on the request and response structures, making it easy for developers to understand how to interact with the API.

6. **Database Schema**: The database schema is documented, with descriptions of tables and relationships, which is crucial for understanding how data is stored and retrieved.

7. **Error Handling**: We document our approach to error handling, including how errors are logged and how custom error responses are structured.

We encourage contributors to maintain and update documentation as the code evolves. This ensures that the documentation remains useful and relevant.
