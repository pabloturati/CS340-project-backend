-- MySQL
-- Team 18 - Section: 400 - DDL Queries
-- Symon Peter Ramos - Computer Scientist and Team Member
--  Pablo Turati - Computer Scientist and Team Member
-- ------------------------------------------------------

-- This file contains queries to start the database tables.  

-- STEP 1. Runs queries to cleanup the DB and remove previous versions of each table, if they exist.
-- NOTES: The order of the remove table (drop) process is fundamental to avoid relational errors while removing existing linked tables

DROP TABLE IF EXISTS lists_genres;
DROP TABLE IF EXISTS listItems_genres;
DROP TABLE IF EXISTS ListItems;
DROP TABLE IF EXISTS Lists;
DROP TABLE IF EXISTS Genres;
DROP TABLE IF EXISTS Users;

-- ------------------------------------------------------

-- STEP 2. Runs queries to create new tables
-- NOTES: The order of this process is fundamental since table existance is fundamental when creating related tables

--
-- Table structure for table: Users
--
CREATE TABLE IF NOT EXISTS Users (
  user_id int auto_increment PRIMARY KEY,
  email varchar(255) NOT NULL UNIQUE,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  password varchar(255) NOT NULL
  )engine=innoDB;

--
-- Table structure for table: Lists
--
CREATE TABLE IF NOT EXISTS Lists (
  list_id int auto_increment UNIQUE NOT NULL,
  user_id int, 
  name varchar(255) NOT NULL,
  date_published date NOT NULL,
  number_of_likes int NOT NULL,
  number_of_dislikes int NOT NULL,
  PRIMARY KEY (list_id),
  CONSTRAINT FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
  )engine=InnoDB;

--
-- Table structure for table: Genres
--
CREATE TABLE IF NOT EXISTS Genres(
  genre_id int auto_increment UNIQUE NOT NULL PRIMARY KEY,
  name varchar(255) NOT NULL
  )engine=InnoDB;

--
-- Table structure for table: ListItems
--
CREATE TABLE IF NOT EXISTS ListItems(
  list_item_id int auto_increment UNIQUE PRIMARY KEY,
  list_id int NOT NULL,
  name varchar(255) NOT NULL,
  rating float,
  image_link varchar(255),
  imbd_link varchar(255),
  release_date date,
  plot varchar(255),
  runtime varchar(255),
  FOREIGN KEY (list_id) REFERENCES Lists(list_id) ON DELETE CASCADE ON UPDATE CASCADE
  )engine=InnoDB;

--
-- Table structure for M:M relational link table: lists_genres
--   
CREATE TABLE IF NOT EXISTS lists_genres(
  list_id int,
  genre_id int,
  PRIMARY KEY (list_id, genre_id),
  FOREIGN KEY (list_id) REFERENCES Lists (list_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (genre_id) REFERENCES Genres (genre_id) ON DELETE CASCADE ON UPDATE CASCADE
  )engine=InnoDB;

--
-- Table structure for M:M relational link table: listItems_genres
--
CREATE TABLE IF NOT EXISTS listItems_genres(
  list_item_id int,
  genre_id int,
  PRIMARY KEY (list_item_id, genre_id),
  FOREIGN KEY (list_item_id) REFERENCES ListItems (list_item_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (genre_id) REFERENCES Genres (genre_id) ON DELETE CASCADE ON UPDATE CASCADE
  )engine=InnoDB;

-- ------------------------------------------------------

-- STEP 3. Populates the Database with initial values
-- NOTES:  All values here used are representative of real values and initial population is to provide a correct user experiecnce. 

-- Populate Users with initial mock entries
INSERT INTO Users(email, first_name, last_name, password) VALUES
  ('john@email.com', 'John', 'Ledger', 'secret'),
  ('pablo@email.com', 'Pablo', 'Turati', 'secret'),
  ('symon@email.com', 'Symon', 'Ramos', 'secret');

-- Populate Lists with initial entries
INSERT INTO Lists(user_id, name, date_published, number_of_likes, number_of_dislikes) VALUES 
  (1, 'Favorite TV Shows', STR_TO_DATE('02-21-2020', '%m-%d-%Y'), 0, 0),
  (1, 'Favorite Movies', STR_TO_DATE('02-22-2020', '%m-%d-%Y'), 10, 1);

-- Populate Genres with initial entries for basic genres
INSERT INTO Genres(name) VALUES
  ('Sitcom'),
  ('Spy'),
  ('Action');

-- Populate ListItems with initial entries for basic genres
INSERT INTO ListItems(list_id, name, rating, image_link, imbd_link, release_date, plot, runtime) VALUES 
  (1, 'Friends', '10.0', 'google.com', 'imbd.com', STR_TO_DATE('02-21-2005', '%m-%d-%Y'), 'Plot Description', '30 min'),
  (1, 'How I Met Your Mother', '10.0', 'google.com', 'imbd.com', STR_TO_DATE('02-21-2005', '%m-%d-%Y'), 'Plot Description', '30 min'),
  (1, 'Chuck', '10.0', 'google.com', 'imbd.com', STR_TO_DATE('01-21-2005', '%m-%d-%Y'), 'Plot Description', '30 min'),
  (1, 'Parks and Recreation', '10.0', 'google.com', 'imbd.com', STR_TO_DATE('04-21-2005', '%m-%d-%Y'), 'Plot Description', '30 min'),
  (1, 'Community', '10.0', 'google.com', 'imbd.com', STR_TO_DATE('12-21-2005', '%m-%d-%Y'), 'Plot Description', '30 min'),
  (2, 'The Office Movie', '10.0', 'google.com', 'imbd.com', STR_TO_DATE('02-21-2005', '%m-%d-%Y'), 'Plot Description', '30 min'),
  (2, 'James Bond', '10.0', 'google.com', 'imbd.com', STR_TO_DATE('06-21-2005', '%m-%d-%Y'), 'Plot Description', '30 min'),
  (2, 'Mission Impossible', '10.0', 'google.com', 'imbd.com', STR_TO_DATE('02-21-2005', '%m-%d-%Y'), 'Plot Description', '30 min'),
  (2, 'Top Gun', '10.0', 'google.com', 'imbd.com', STR_TO_DATE('07-21-2005', '%m-%d-%Y'), 'Plot Description', '30 min'),
  (2, 'Avengers', '10.0', 'google.com', 'imbd.com', STR_TO_DATE('02-21-2005', '%m-%d-%Y'), 'Plot Description', '30 min');

-- Assign Lists their genres
INSERT INTO lists_genres(list_id, genre_id) VALUES
  (1, 1),
  (2, 1);

-- Assign ListsItems their genres
INSERT INTO listItems_genres(list_item_id, genre_id) VALUES
  (1, 1),
  (2, 1),
  (3, 2),
  (4, 1),
  (5, 1),
  (6, 1),
  (7, 2),
  (8, 2),
  (9, 3),
  (10, 3);

-- ------------------------------------------------------
