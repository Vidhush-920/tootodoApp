-- CREATE DATABASE tootodo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tootodo;

CREATE TABLE task (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_done BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id)
);

-- Sample Tasks
INSERT INTO task (title, description)
VALUES 
('Buy groceries', 'Milk, eggs, bread, and fruits'),
('Finish project report', 'Compile data and finalize the draft'),
('Call plumber', 'Fix the leaking kitchen tap'),
('Workout session', '30-minute cardio and strength training'),
('Read a book', 'Start reading "Atomic Habits"'),
('Plan weekend trip', 'Look up places near Nuwara Eliya'),
('Clean workspace', 'Organize desk and wipe surfaces'),
('Pay electricity bill', 'Due by end of the week'),
('Update resume', 'Add recent projects and skills'),
('Attend team meeting', 'Discuss sprint progress and blockers');