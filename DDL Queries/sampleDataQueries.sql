-- MySQL
-- Team 18 - Section: 400 - Sample Data Queries
-- Symon Peter Ramos - Computer Scientist and Team Member
--  Pablo Turati - Computer Scientist and Team Member
-- ------------------------------------------------------

-- This file contains sample queries and their capabilities to implement in the backend.

-- Users
  -- Create new user entry.
  INSERT INTO Users(email, first_name, last_name, password) VALUES 
    (
      :email_from_form_input, 
      :firstName_from_form_input, 
      :lastName_from_form_input, 
      :password_from_form_input
    );

  --Find a user by email (to obtain user data)
  SELECT * FROM Users WHERE email=:email_from_form;

  --Find user id when email and passwords match (for login)
  SELECT user_id FROM Users WHERE 
    email=:email_from_login_form 
    AND password=:password_from_login_form;

  -- To delete a user's own account (only by the user himself, requires backend session validation for security)
  -- This delete creates cascade delete on Lists per the table constraint definition
  DELETE FROM Users WHERE user_id=:user_id_from_session_data;

-- Lists

  -- Create new list entry
  INSERT INTO Lists(user_id, genre_id, name, date_published, number_of_likes, number_of_dislikes) VALUES 
    (
      :user_id, 
      :genre_id_from_form_drop_down, 
      :name_from_form_input, 
      :date_published_from_form_input, 
      :number_of_likes_from_form_input, 
      :number_of_likes_from_form_input
    );

  -- Find all lists, sort by likes.  To display all lists in homepage. Most likes go to the top
  SELECT * FROM Lists ORDER BY number_of_likes DESC;

  -- Display all lists that belong to a specific user (by user_id)
  SELECT L.name, L.date_published, L.number_of_likes, L.number_of_dislikes, RTRIM(CONCAT(LTRIM(RTRIM(U.first_name)) , ' ' , LTRIM(RTRIM(U.last_name)))) 
    AS 'owner_name' FROM Lists AS L INNER JOIN Users AS U ON L.user_id=U.user_id;

  -- Display all list data by list_id
  SELECT L.name, L.date_published, L.number_of_likes, L.number_of_dislikes, RTRIM(CONCAT(LTRIM(RTRIM(U.first_name)) , ' ' , LTRIM(RTRIM(U.last_name)))) AS 'owner_name' 
    FROM Lists AS L 
    INNER JOIN Users AS U 
    ON L.user_id=U.user_id WHERE L.list_id=:list_id_param;

  -- Display all ListItems per List
  SELECT LI.name, rating, image_link, imbd_link, release_date, plot, runtime FROM Lists AS L 
    INNER JOIN ListItems LI ON L.list_id=LI.list_id WHERE LI.list_id=:LI.list_id

  -- Return all lists that belong to a user. To be used to diplay the lists owned by the private user to be displayed in the user's private section of the app.
  SELECT * FROM Lists WHERE user_id=:user_id_from_session_data;

  -- Update list table data - direct fields
  UPDATE Lists SET
    name=:name_from_form,
    date_published=:date_published_from_form
    WHERE list_id=:list_id_from_form

  -- For the user to delete a list (which the user must own, requires backend session validation for security)
  DELETE FROM Lists WHERE user_id=:user_id_from_session_data AND list_id=:list_id_from_delete_button;

  -- Add new genre to list (will have backend error handling if duplicate entry)
  INSERT INTO lists_genres(list_id, genre_id) 
    VALUES (:list_id_from_frontend_list, :new_genre_id_from_frontend_drop_down)

  -- Update entry value Lists Genres M:M relationship.
  UPDATE Lists l INNER JOIN lists_genres lg ON lg.list_id=l.list_id 
    SET lg.genre_id=:new_genre_id_from_change_request_form
    WHERE l.list_id=:list_id_from_change_request_form
    AND l.user_id=:user_id_from_session_to_validate_authority

-- ListsItems. Capabilities: create entry, read all, update entry and delete entry.

  --Show all list items from a specific list
  SELECT * FROM ListItems WHERE list_id=:list_id_from_fetch

  --Create a new list item
  INSERT INTO ListItems(list_id, genre_id, name, rating, image_link, imbd_link, release_date, plot, runtime) VALUES 
    (
      :list_id_from_the_list_being_edited_or_created, 
      :name_from_form_input_or_API,
      :rating_from_form_input_or_API_data,
      :image_link_from_form_input_or_API_data, 
      :imbd_link_from_form_input_or_API_data,
      :release_date_from_form_input_or_API_data,
      :plot_from_input_from_form_input_or_API_data,
      :runtime_from_form_input_or_API_data
    );
  
  -- Update table values
  UPDATE ListItems
    SET(
        name:name_from_form_input_or_API,
        rating:rating_from_form_input_or_API_data,
        image_link:image_link_from_form_input_or_API_data, 
        imbd_link:imbd_link_from_form_input_or_API_data,
        release_date:release_date_from_form_input_or_API_data,
        plot:plot_from_input_from_form_input_or_API_data,
        runtime:runtime_from_form_input_or_API_data
      )
    WHERE list_id:list_id_from_the_list_being_edited_or_created; 

  -- Add new genre to listItem (will have backend error handling if duplicate entry)
  INSERT INTO listItems_genres(list_item_id, genre_id) 
    VALUES (:list_item_id_from_frontend_list, :new_genre_id_from_frontend_drop_down)

  -- Update entry value ListsItems Genres M:M relationship
  UPDATE ListsItem l INNER JOIN listsItems_genres lg ON lg.list_id=l.list_id 
    SET lg.genre_id=:new_genre_id_from_change_request_form
    WHERE l.list_item_id=:list_item_id_from_change_request_form; 

-- Genres.
  -- Provides a list of Genres to populate the genre dropdown in the List and ListItem forms.
  -- Returns genre_id and name.
  SELECT * FROM Genres;

  -- Insert new values.  Handle error for attempted duplicate entries since names must be unique
  INSERT INTO Genres(name) 
    VALUES(:name_from_input_in_form);

  -- Update Genre names.  Handle error for attempted duplicate entries since names must be unique
  UPDATE Genres
    SET name=:new_genre_name_from_form_input
    WHERE genre_id=:genre_id_from_fron_end;

  -- Delete Genres
  DELETE FROM Genres WHERE genre_id=1

