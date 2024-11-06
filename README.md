<h2>Note Taking Application</h2> <br>
This is a Note Taking application built using Express.js, Sequelize ORM, MySQL, and Redis. The application allows users to create, view, update, and delete notes, as well as register and log in. It also utilizes Redis for caching frequently accessed notes.

<h2>Requirements</h2> <br>
Before running the application, make sure you have the following prerequisites installed:

Node.js and npm
MySQL
Redis
Docker and Docker Compose (optional, for containerization)
Installation
Clone this repository to your local machine:

git clone https://github.com/SherefAbolmagd/note-taking-app.git
Navigate to the project directory:

cd note-taking-app
Install the project dependencies:

npm install --force
Configuration
Create an .env file in the project root directory based on the provided .env.example file. Update the configuration variables to match your environment.

Ensure that your MySQL and Redis servers are running, and the configuration in the .env file matches your server settings.

<h2>Usage</h2> <br>
To start the application, run the following command:

npm start
The application will be available at http://localhost:3000 by default. You can change the port in the .env file.

<h2>API Endpoints</h2> <br>
User registration: POST /api/register <br>
User login: POST /api/login <br>
Create a new note: POST /api/notes <br>
Retrieve all notes: GET /api/notes <br>
Retrieve a specific note: GET /api/notes/:id <br>
Update a note: PUT /api/notes/:id <br>
Delete a note: DELETE /api/notes/:id <br>

<h2>Database Schema</h2> <br>
The application uses a MySQL database with the following tables:

Users: Stores user information, including username and hashed password.
Notes: Stores notes with title, content, and a foreign key reference to the user who created the note.
Redis Caching
Redis is used as a caching mechanism to improve the performance of frequently accessed notes. Caching is implemented for the GET /api/notes endpoint.

<h2>Dockerization</h2> <br>
The application can be containerized using Docker and Docker Compose. Docker configuration files are included for both the application and the MySQL database. You can build and run the containers using docker-compose.

<h2>Design Patterns</h2> <br>
The project uses the following design patterns:

Singleton Pattern: Implemented for a logger class to ensure a single instance is used throughout the application.
Factory Method Pattern: Used to create instances of different types of notes (e.g., personal, work).

<h2>Contributing</h2> <br>
Contributions are welcome! Feel free to open issues or submit pull requests to help improve this project.

<h2>License</h2> <br>
This project is licensed under the MIT License.
