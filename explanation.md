# Problem to be solved :
We have to create one game named as "Cool Kid Network" that allows login, registration functionality and has role based access of it's dashboard.

# ---->>>>> Technical Specification of design:
  ## Frontend side:
   1. /src/components/
    Home.js: The homepage with buttons for logging in or signing up. Based on the role fetched from the backend, users are redirected to the appropriate dashboard.

    Dashboard.js: Displays user details and other user's details as per role.

    MaintainerDashboard.js: A maintainer dashboard to manage user roles. It lists all users with an update button that opens a modal to change roles.

    UserCard.js: Displays user information (name, email, etc.) in a card-like UI component.
   2. /src/api/ 
    api.js : This file contains all the API calls.
   3. /src/styles: In this folder css files are created for each component like Home Page, Login Page etc.
   4. App.js:  Handles the app’s main logic, including state management for user role and authentication token. Renders the Home page or dashboards (Dashboard, MaintainerDashboard) based on the user’s role.

  ## Backend side: 
    1. /controllers/
    userController.js: Contains the logic for interacting with the database (e.g., updating user roles, fetching user data). It includes functions like:
        getUserData: Fetches details of the logged-in user.
        getAllUsers: Retrieves all users for the "Maintainer" role.
        updateUserRole: Updates the role of a user based on their id.

   2. /routes/
       userRoutes.js: Defines the routes for user-related actions such as updating roles (/role/update), logging out, and fetching user data.

   3. app.js: Sets up the backend Express application, including middleware for authentication and routing.



# ------>>>>>> How It Works:
 # Frontend (React):
   When a user logs in, the role is fetched from the backend and stored in the app's state (role and token).
   Based on the role (Cool Kid, Cooler Kid, or Coolest Kid), the app redirects the user to the appropriate dashboard usin   react-router-dom.
   The MaintainerDashboard allows the maintainer to view all users and update their roles through a modal.
   When a role is updated, the updateUserRole API is called to send the new role to the backend.
   The logout function clears the role and token from the state and redirects the user to the homepage.
 # Backend (Node.js & Express):
   The backend exposes routes to get user data (/me), fetch all users (/all), update user roles (/roles/update).
   The updateUserRole function checks if the new role is valid and updates the user's role in the database.
   The backend also handles authentication (checking the token) and ensures only authorized users can access certain endpoints (e.g.   only the "Maintainer" can update roles).




# ---->>>>> Key Technical Decisions:
  # State Management: 
  Used useState in React to manage user authentication and role across components, making it easy to control the flow of user data and behavior.
  # API Design: 
  Chose axios for handling HTTP requests due to its simplicity and support for promises. It also handles token-based authentication.
  # Modal UI: 
  For role updates, used a modal that pops up when the "Update" button is clicked, allowing the maintainer to select a new role and update it.
  # Role-Based Access: 
  Built the app to check roles on both the frontend (React) and backend (Node.js), ensuring that users can only access features and data that are relevant to their role.




# ---->>>> Achieving the Desired Outcome of Admin User Story:  
This solution ensures that the "Maintainer" can easily update user roles and manage user data. The maintainer can see the users, their roles, and update them as needed. The logout functionality is intuitive and accessible.



# ----->>>> How did I approach this problem?
I followed the following steps to achieve this problem:
1. First I wrote down the requirements that I understood that were four roles are there in total: three roles of user(cool Kid, cooler kid and coolest kid) and fourth role of admin that is "Maintainer".
2. I Created frontend components one by one and provided role based access of it.
3. I created APIs and intergrated with frontend based on this requirement.
4. Tested whether it is meeting the requirement or not.




## Instructions for local setup:

# 1. Clone the repo using the url :
 GitHub - https://github.com/anjali-sharma3/cool-kids-network--app.git
# 2. Frontend setup: 
 # Use the following commands for the frontend setup
   cd frontend
   npm install
   Now run command  npm start command to run the frontend App.
# 3. Backend setup: Use the following commands for the backend setup
   cd backend
   npm install
   Now run node app.js command to run the backend server.
# 4. Database setup: Follow the given steps
   Install pgadmin and create a server .
   Create a database.
   Install Dbeaver and use the credentials of the created database to connect a postgresql database.
   Create one table in the database named as "users".

Kindly use the following given SQL script to create this table so that column names can be the same.

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'Cool Kid'
);


Copy and paste these scripts in the SQL editor of Dbeaver and everything is good to go.


