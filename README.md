TooToDo - a Simple To-Do Web Application Project!

Hey there! Welcome to the To-Do Application project. This is a full-stack effort, meaning it's got three main parts:

The React frontend (what you see in the browser).

The Spring Boot backend (the API that handles all the data).

The MySQL database (where all your tasks are saved).

We've even added some cool fade-in and fade-out animations to make using the task list feel super smooth.

🚀 Let's Get It Running!

Here's the quick and easy guide to getting this project set up on your machine.

What You'll Need

Before you start, just make sure you have these installed:

Java (JDK 17+): Gotta have this for the Spring Boot part.

Node.js & npm (or Yarn): This runs the React app.

MySQL Server: The spot where we keep all the tasks!

A MySQL Client: Anything you use to talk to your database, like Workbench or the command line.

Git: To clone this repository down, of course.

1. Database Setup (MySQL)

Since we've included the SQL setup file, getting the database ready is super easy!

Create the Database:
First, hop into your MySQL tool and create the database where we'll store everything:

CREATE DATABASE todo_app_db;





Run the SQL Setup File:
The create_tasks_table.sql file is already in the repository! Just run that script against the new todo_app_db using your MySQL client (like the command line or MySQL Workbench). This automatically creates the required tasks table.

If you're using the command line, here's how you can run the file (remember to update the path and username!):

mysql -u YOUR_MYSQL_USERNAME -p todo_app_db < path/to/create_tasks_table.sql




(P.S. If the SQL file is located inside a sub-directory, update the path accordingly!)

2. Backend Setup (Spring Boot)

This is the server side that connects everything.

Jump into the Backend Folder:

cd backend




(Assuming your Spring Boot project is in a folder called backend)

Tweak the Database Settings:
Find the application.properties (or .yml) file inside src/main/resources. You need to plug in your actual MySQL username and password here:

# application.properties example
spring.datasource.url=jdbc:mysql://localhost:3306/todo_app_db
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
spring.jpa.hibernate.ddl-auto=update
server.port=8080




Don't Forget: Swap out those YOUR_MYSQL_USERNAME and YOUR_MYSQL_PASSWORD placeholders!

Run the Backend!
Use the Maven wrapper to build and launch the server:

./mvnw spring-boot:run




The API should now be live and running on port 8080.

3. Frontend Setup (React)

Time to get the pretty user interface going!

Head to the Frontend Folder:

cd ../frontend




(The React project should be in a folder called frontend)

Install All the Stuff:

npm install
# OR
yarn install




Quick Check on the API URL:
The React app is pre-set to talk to the backend at http://localhost:8080/api/tasks. If you changed the port when setting up the backend, you'll need to update that URL in the React code (probably in a file like TodoApp.jsx).

Start the App!

npm start
# OR
yarn start




Your browser should automatically pop up, usually at http://localhost:3000.

What to Do!

You need both the Spring Boot server (port 8080) and the React app (port 3000) running at the same time.

Go to the app in your browser.

Add a Task: Use the form on the left! Once you hit "Add," the new task zips straight to the MySQL database and pops up in the list with a nice fade-in effect.

Mark it Done: Hit the "Done" button! This updates the status in the database, and the task then smoothly disappears from your list. Awesome!

If you hit any snags, don't worry, just check the steps again!