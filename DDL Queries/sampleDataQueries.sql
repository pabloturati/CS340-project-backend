INSERT INTO Users(email, first_name, last_name, password) 
      VALUES ('test@email.com', 'Mister', 'Test', 'password');

INSERT INTO Lists(user_id, genre_id, name, date_published, number_of_likes, number_of_dislikes) 
      VALUES ('1', '1', 'Sample List', '02-21-2020', '10', '1');

INSERT INTO Lists(user_id, genre_id, name, date_published, number_of_likes, number_of_dislikes) 
      VALUES ('1', '1', 'Sample List 2', '02-21-2020', '10', '1');

INSERT INTO ListItems(list_id, genre_id, name, rating, image_link, imbd_link, release_date, plot, runtime) 
      VALUES ('1', '1', 'List Item 1', '10.0', 'google.com', 'imbd.com', '02-21-2005', 'Plot Description', '120 min');