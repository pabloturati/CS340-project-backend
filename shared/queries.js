const runQuery = require('./runQuery')

const validateDB = () =>
  runQuery(`
  CREATE TABLE IF NOT EXISTS Users (
    user_id int auto_increment PRIMARY KEY,
    email varchar(255) NOT NULL UNIQUE,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    password varchar(255) NOT NULL
  ) engine = innoDB;
      
  CREATE TABLE IF NOT EXISTS Lists (
    list_id int auto_increment UNIQUE NOT NULL,
    user_id int,
    name varchar(255) NOT NULL,
    date_published date NOT NULL,
    number_of_likes int NOT NULL,
    number_of_dislikes int NOT NULL,
    PRIMARY KEY (list_id),
    CONSTRAINT FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
  ) engine = InnoDB;
    
  CREATE TABLE IF NOT EXISTS Genres(
    genre_id int auto_increment UNIQUE NOT NULL PRIMARY KEY,
    name varchar(255) NOT NULL
  ) engine = InnoDB;

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
  ) engine = InnoDB;

  CREATE TABLE IF NOT EXISTS listItems_genres(
    list_item_id int,
    genre_id int,
    PRIMARY KEY (list_item_id, genre_id),
    FOREIGN KEY (list_item_id) REFERENCES ListItems (list_item_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES Genres (genre_id) ON DELETE CASCADE ON UPDATE CASCADE
  ) engine = InnoDB;
  `)

const authQueries = {
  createUserEntry: (email, firstName, lastName, password) =>
    runQuery(
      `INSERT INTO Users(email, first_name, last_name, password) 
      VALUES ('${email}', '${firstName}', '${lastName}', '${password}');`
    ),
  findUserByEmail: email =>
    runQuery(`SELECT * FROM Users WHERE email='${email}';`),
  verifyCredentials: (email, password) =>
    runQuery(
      `SELECT user_id FROM Users WHERE email='${email}' AND password='${password}';`
    ),
  userDataById: id =>
    runQuery(
      `SELECT user_id, email, first_name, last_name FROM Users WHERE user_id=${id};`
    )
}

const listQueries = {
  createListEntry: (
    user_id,
    genre_id,
    name,
    date_published,
    number_of_likes,
    number_of_dislikes
  ) =>
    runQuery(
      `INSERT INTO Lists(user_id, genre_id, name, date_published, number_of_likes, number_of_dislikes) 
      VALUES ('${user_id}', '${genre_id}', '${name}', '${date_published}', '${number_of_likes}', '${number_of_dislikes}');`
    ),
  getAllLists: {
    noOrder: `SELECT L.list_id, L.name AS list_name, L.date_published, L.number_of_likes, L.number_of_dislikes, 
      RTRIM(CONCAT(LTRIM(RTRIM(U.first_name)) , ' ' , LTRIM(RTRIM(U.last_name)))) 
      AS 'owner_name' FROM Lists AS L 
      INNER JOIN Users AS U ON L.user_id=U.user_id;`,
    byLikes: `SELECT L.list_id, L.name AS list_name, L.date_published, L.number_of_likes, L.number_of_dislikes, 
      RTRIM(CONCAT(LTRIM(RTRIM(U.first_name)) , ' ' , LTRIM(RTRIM(U.last_name)))) AS 'owner_name' FROM Lists AS L 
      INNER JOIN Users AS U ON L.user_id=U.user_id ORDER BY number_of_likes DESC;`,
    byDates: `SELECT L.list_id, L.name AS list_name, L.date_published, L.number_of_likes, L.number_of_dislikes, 
      RTRIM(CONCAT(LTRIM(RTRIM(U.first_name)) , ' ' , LTRIM(RTRIM(U.last_name)))) 
      AS 'owner_name' FROM Lists AS L INNER JOIN Users AS U ON L.user_id=U.user_id ORDER BY L.date_published DESC;`
  },
  getUsersList: userId =>
    runQuery(`SELECT L.list_id, L.name AS list_name, L.date_published, L.number_of_likes, L.number_of_dislikes, 
  RTRIM(CONCAT(LTRIM(RTRIM(U.first_name)) , ' ' , LTRIM(RTRIM(U.last_name)))) AS 'owner_name' FROM Lists AS L 
  INNER JOIN Users AS U ON L.user_id=U.user_id WHERE U.user_id=${userId};`),
  listItemsPerList: listId =>
    runQuery(
      `SELECT LI.list_item_id, LI.name, rating, image_link, imbd_link, release_date, plot, runtime FROM Lists AS L INNER JOIN ListItems LI ON L.list_id=LI.list_id 
      WHERE LI.list_id=${listId};
      `
    ),
  genresPerListItem: listItemId =>
    runQuery(
      `  SELECT G.name FROM ListItems AS LI INNER JOIN listItems_genres AS LIG ON LIG.list_item_id = LI.list_item_id 
      INNER JOIN Genres AS G ON G.genre_id=LIG.genre_id WHERE LI.list_item_id=${listItemId};
      `
    ),
  listDetailsByListId: listId =>
    runQuery(
      `SELECT L.name, L.date_published, L.number_of_likes, L.number_of_dislikes,
      RTRIM(CONCAT(LTRIM(RTRIM(U.first_name)) , ' ' , LTRIM(RTRIM(U.last_name)))) AS 'owner_name' FROM Lists AS L 
      INNER JOIN Users AS U ON L.user_id=U.user_id
      WHERE L.list_id=${listId};

      SELECT LI.list_item_id, LI.name, rating, image_link, imbd_link, release_date, plot, runtime 
        FROM Lists AS L INNER JOIN ListItems LI 
        ON L.list_id=LI.list_id WHERE LI.list_id=${listId};      
      `
    )
}

const genreQueries = {
  allGenres: () =>
    runQuery(`
    SELECT G.name as genre_name, G.genre_id  FROM Genres as G ORDER BY G.genre_id;
    `),
  createNewGenre: newGenre =>
    runQuery(`
    INSERT INTO Genres(name) VALUES('${newGenre}');
    `),
  deleteGenre: genreId =>
    runQuery(`
    DELETE FROM Genres WHERE genre_id=${genreId};
    `),
  updateGenre: (genreId, newValue) =>
    runQuery(`
    UPDATE Genres SET name='${newValue}' WHERE genre_id=${genreId};
    `)
}

const listItemQueries = {
  createListItemEntry: (
    list_id,
    genre_id,
    name,
    rating,
    image_link,
    imbd_link,
    release_date,
    plot,
    runtime
  ) =>
    runQuery(
      `INSERT INTO ListItems(list_id, genre_id, name, rating, image_link, imbd_link, release_date, plot, runtime) 
      VALUES ('${list_id}', '${genre_id}', '${name}', '${rating}', '${image_link}', '${imbd_link}', '${release_date}', '${plot}', '${runtime}');`
    ),
  randomListItemData: limit_num =>
    runQuery(`SELECT * FROM ListItems ORDER BY RAND() LIMIT ${limit_num};`),
  listItemDataByListId: id =>
    runQuery(`SELECT * FROM ListItems WHERE list_id=${id};`),
  listItemDataByGenreId: id =>
    runQuery(`SELECT * FROM ListItems WHERE genre_id=${id};`)
}

module.exports = {
  authQueries,
  listQueries,
  listItemQueries,
  validateDB,
  genreQueries
}
