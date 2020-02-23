INSERT INTO Users(email, first_name, last_name, password) 
      VALUES ('test@email.com', 'Mister', 'Test', 'password');

INSERT INTO Lists(user_id, genre_id, name, date_published, number_of_likes, number_of_dislikes) 
      VALUES ('1', '1', 'Favorite TV Shows', '02-21-2020', '0', '0');

INSERT INTO Lists(user_id, genre_id, name, date_published, number_of_likes, number_of_dislikes) 
      VALUES ('1', '3', 'Favorite Movies', '02-21-2020', '10', '1');


INSERT INTO Genres(name) 
      VALUES ('Sitcom');
INSERT INTO Genres(name) 
      VALUES ('Spy');
INSERT INTO Genres(name) 
      VALUES ('Action');

INSERT INTO ListItems(list_id, genre_id, name, rating, image_link, imbd_link, release_date, plot, runtime) 
      VALUES ('1', '1', 'Friends', '10.0', 'google.com', 'imbd.com', '02-21-2005', 'Plot Description', '30 min');
INSERT INTO ListItems(list_id, genre_id, name, rating, image_link, imbd_link, release_date, plot, runtime) 
      VALUES ('1', '1', 'How I Met Your Mother', '10.0', 'google.com', 'imbd.com', '02-21-2005', 'Plot Description', '30 min');
INSERT INTO ListItems(list_id, genre_id, name, rating, image_link, imbd_link, release_date, plot, runtime) 
      VALUES ('1', '2', 'Chuck', '10.0', 'google.com', 'imbd.com', '02-21-2005', 'Plot Description', '30 min');
INSERT INTO ListItems(list_id, genre_id, name, rating, image_link, imbd_link, release_date, plot, runtime) 
      VALUES ('1', '1', 'Parks and Recreation', '10.0', 'google.com', 'imbd.com', '02-21-2005', 'Plot Description', '30 min');
INSERT INTO ListItems(list_id, genre_id, name, rating, image_link, imbd_link, release_date, plot, runtime) 
      VALUES ('1', '1', 'Community', '10.0', 'google.com', 'imbd.com', '02-21-2005', 'Plot Description', '30 min');

INSERT INTO ListItems(list_id, genre_id, name, rating, image_link, imbd_link, release_date, plot, runtime) 
      VALUES ('2', '1', 'The Office Movie', '10.0', 'google.com', 'imbd.com', '02-21-2005', 'Plot Description', '30 min');
INSERT INTO ListItems(list_id, genre_id, name, rating, image_link, imbd_link, release_date, plot, runtime) 
      VALUES ('2', '2', 'James Bond', '10.0', 'google.com', 'imbd.com', '02-21-2005', 'Plot Description', '30 min');
INSERT INTO ListItems(list_id, genre_id, name, rating, image_link, imbd_link, release_date, plot, runtime) 
      VALUES ('2', '2', 'Mission Impossible', '10.0', 'google.com', 'imbd.com', '02-21-2005', 'Plot Description', '30 min');
INSERT INTO ListItems(list_id, genre_id, name, rating, image_link, imbd_link, release_date, plot, runtime) 
      VALUES ('2', '3', 'Top Gun', '10.0', 'google.com', 'imbd.com', '02-21-2005', 'Plot Description', '30 min');
INSERT INTO ListItems(list_id, genre_id, name, rating, image_link, imbd_link, release_date, plot, runtime) 
      VALUES ('2', '3', 'Avengers', '10.0', 'google.com', 'imbd.com', '02-21-2005', 'Plot Description', '30 min');

INSERT INTO lists_genres(list_id, genre_id) 
      VALUES ('1', '1');
INSERT INTO lists_genres(list_id, genre_id) 
      VALUES ('2', '1');

INSERT INTO listItems_genres(list_item_id, genre_id) 
      VALUES ('1', '1');
INSERT INTO listItems_genres(list_item_id, genre_id) 
      VALUES ('2', '1');
INSERT INTO listItems_genres(list_item_id, genre_id) 
      VALUES ('3', '2');
INSERT INTO listItems_genres(list_item_id, genre_id) 
      VALUES ('4', '1');
INSERT INTO listItems_genres(list_item_id, genre_id) 
      VALUES ('5', '1');
INSERT INTO listItems_genres(list_item_id, genre_id) 
      VALUES ('6', '1');
INSERT INTO listItems_genres(list_item_id, genre_id) 
      VALUES ('7', '2');
INSERT INTO listItems_genres(list_item_id, genre_id) 
      VALUES ('8', '2');
INSERT INTO listItems_genres(list_item_id, genre_id) 
      VALUES ('9', '3');
INSERT INTO listItems_genres(list_item_id, genre_id) 
      VALUES ('10', '3');
