const runQuery = require('./runQuery')

const initializeDBQueries = {
  createUserTable: () =>
    runQuery(`CREATE TABLE IF NOT EXISTS Users (
      user_id int auto_increment PRIMARY KEY,
      email varchar(255) NOT NULL UNIQUE,
      first_name varchar(255) NOT NULL,
      last_name varchar(255) NOT NULL,
      password varchar(255) NOT NULL
      )engine=innoDB;`),
  createListsTable: () =>
    runQuery(`CREATE TABLE IF NOT EXISTS Lists (
      list_id int auto_increment UNIQUE NOT NULL,
      user_id int,
      genre_id int NOT NULL,
      name varchar(255) NOT NULL,
      date_published date NOT NULL,
      number_of_likes int NOT NULL,
      number_of_dislikes int NOT NULL,
      PRIMARY KEY (list_id),
      CONSTRAINT FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE SET NULL ON UPDATE CASCADE
      )engine=InnoDB`),
  createGenresTable: () =>
    runQuery(`CREATE TABLE IF NOT EXISTS Genres(
      genre_id int auto_increment UNIQUE NOT NULL PRIMARY KEY,
      name varchar(255) NOT NULL
      )engine=InnoDB`),
  createListItemsTable: () =>
    runQuery(`
    CREATE TABLE IF NOT EXISTS ListItems(
      list_item_id int auto_increment UNIQUE PRIMARY KEY,
      list_id int NOT NULL,
      genre_id int,
      name varchar(255) NOT NULL,
      rating float,
      image_link varchar(255),
      imbd_link varchar(255),
      release_date date,
      plot varchar(255),
      runtime varchar(255),
      FOREIGN KEY (list_id) REFERENCES Lists(list_id) ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY (genre_id) REFERENCES Genres(genre_id) ON DELETE SET NULL ON UPDATE CASCADE
      )engine=InnoDB
    `),
  createListGenresRelTable: () =>
    runQuery(`
    CREATE TABLE IF NOT EXISTS lists_genres(
      list_id int,
      genre_id int,
      PRIMARY KEY (list_id, genre_id),
      FOREIGN KEY (list_id) REFERENCES Lists (list_id) ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY (genre_id) REFERENCES Genres (genre_id) ON DELETE CASCADE ON UPDATE CASCADE
      )engine=InnoDB
    `),
  createListItemsGenreRelTable: () =>
    runQuery(
      `CREATE TABLE IF NOT EXISTS listItems_genres(
        list_item_id int,
        genre_id int,
        PRIMARY KEY (list_item_id, genre_id),
        FOREIGN KEY (list_item_id) REFERENCES ListItems (list_item_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (genre_id) REFERENCES Genres (genre_id) ON DELETE CASCADE ON UPDATE CASCADE
        )engine=InnoDB`
    )
}

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
  findAllLists: () => runQuery(`SELECT * FROM Lists;`),
  listDataById: id =>
    runQuery(
      `SELECT user_id, genre_id, date_published, number_of_likes, number_dislikes FROM Lists WHERE list_id=${id};`
    )
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
  initializeDBQueries,
  listQueries,
  listItemQueries
}
