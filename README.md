# TooToDo - a Simple To-Do Web Application Project!

Hey there! Welcome to the To-Do Application project. This is a full-stack effort, meaning it's got three main parts:
- The **React** frontend (what you see in the browser).
- The **Spring Boot** backend (the API that handles all the data).
- The **MySQL** database (where all your tasks are saved).
We've even added some cool fade-in and fade-out animations to make using the task list feel super smooth.

## 🚀 Let's Get It Running!

If you like to run this application using **Docker**,
1. Make sure you are in the root directory of your project (where the `docker-compose.yml` and `.env` files are located).
2. Run the following command. The `--build` flag ensures that Docker first builds the necessary images (for your frontend and backend) before starting the services.
   ```bash
   docker-compose up --build
   ```
   This command will:
    - **Start the `mysql-db` container:** It uses the environment variables from your `.env` file and executes the `tootodo.sql` script to set up your database.
    - **Start the `backend` container:** It waits for the database to start, then runs your Spring Boot application, connecting it to the database using the service name (`mysql-db`).
    - **Start the `frontend` container:** It waits for the backend to start, then serves the React application using Nginx.

3. You will see a lot of output as Docker Compose starts all three services. Wait until you see confirmation that:
    - The MySQL database is ready (often indicated by a "ready for connections" message).
    - The Spring Boot application is running and listening on port 8080.
    - The Nginx server in the React container is running and serving on port 3000.

Else if you have not installed Docker, and you clike to run this project on your local machine,
Here's the quick and easy guide to getting this project set up on your machine.

### What You'll Need
Before you start, just make sure you have these installed:
- **Java (JDK 17+)**: Gotta have this for the Spring Boot part.
- **Node.js & npm (or Yarn)**: This runs the React app.
- **MySQL Server**: The spot where we keep all the tasks!
- **A MySQL Client**: Anything you use to talk to your database, like Workbench or the command line.
- **Git**: To clone this repository down, of course.


## 1. Database Setup (MySQL)

Since we've included the SQL setup file, getting the database ready is super easy!

### 1. Create the Database:
  First, hop into your MySQL tool and create the database where we'll store everything:
  ```sql
  CREATE DATABASE tootodo;
  ```

### 2. Run the SQL Setup File:
  The `tootodo.sql` file is already in the repository! Just run that script against the new tootodo using your MySQL client (like the command line or MySQL Workbench). This automatically creates the required tasks table.
  If you're using the command line, here's how you can run the file (remember to update the path and username!):
  ```bash
  mysql -u YOUR_MYSQL_USERNAME -p tootodo < tootodo.sql
  ```
  

## 2. Backend Setup (Spring Boot)

This is the server side that connects everything.
### 1. Jump into the Backend Folder named `tootodo_b`:
  ```bash
  cd tootodo_b
  ```

### 2. Tweak the Database Settings:
  Create `.env` file inside this folder. You need to plug in your credentials like below:
  ```env
  #MySQL Credentials
  DB_PORT=MYSQL_PORT
  DB_HOST=MYSQL_HOST
  DB_NAME=tootodo
  DB_USERNAME=YOUR_MYSQL_USERNAME
  DB_PASSWORD=YOUR_MYSQL_PASSWORD
  ```
  > **Note:** You should replace `MYSQL_PORT` and `MYSQL_HOST` with your preferences. (ex: MYSQL_PORT=3306, MYSQL_HOST=localhost)
  
  or Find the application.properties (or .yml) file inside src/main/resources. You need to plug in your actual MySQL username and password here:
  ```properties
  # application.properties example
  spring.datasource.url=jdbc:mysql://localhost:3306/tootodo?useSSL=false&allowPublicKeyRetrieval=true
  spring.datasource.username=YOUR_MYSQL_USERNAME
  spring.datasource.password=YOUR_MYSQL_PASSWORD
  spring.jpa.hibernate.ddl-auto=update
  server.port=8080
  
  ```
  > **Don't Forget**: Swap out those YOUR_MYSQL_USERNAME and YOUR_MYSQL_PASSWORD placeholders!
  > You can also customize url by changing preferred host and port.

### 3. Run the Backend!
  Use the Maven wrapper to build and launch the server:
  ```bash
  ./mvnw spring-boot:run
  ```
  The API should now be live and running on port 8080.


## 3. Frontend Setup (React)

Time to get the pretty user interface going!
### 1. Head to the Frontend Folder named `tootodo_f`:
  ```bash
  cd ../tootodo_f
  ```

### 2. Install All the Stuff:
  ```bash
  npm install
  # OR
  yarn install
  ```

### 3. Quick Check on the API URL:
  The React app is pre-set to talk to the backend at 'http://localhost:8080/api/tasks'. If you changed the port when setting up the backend, you'll need to update that URL in the React code (in a file `App.js`).

### 4. Start the App!
  ```bash
  npm start
  # OR
  yarn start
  ```
  Your browser should automatically pop up, usually at **http://localhost:3000**.


## What to Do!

You need both the Spring Boot server (port 8080) and the React app (port 3000) running at the same time.
1. Go to the app in your browser.
2. **Add a Task**: Use the form on the left! Once you hit "Add," the new task zips straight to the MySQL database and pops up in the list with a nice fade-in effect.
3. **Mark it Done**: Hit the "Done" button! This updates the status in the database, and the task then smoothly disappears from your list. Awesome!

If you hit any snags, don't worry, just check the steps again!
