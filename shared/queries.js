const runQuery = require('./runQuery')

const queries = {
  createUserTable: () =>
    runQuery(`CREATE TABLE IF NOT EXISTS Users (
    user_id int auto_increment PRIMARY KEY,
    email varchar(255) NOT NULL UNIQUE, 
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    CONSTRAINT full_name UNIQUE (first_name, last_name)
    )engine=innoDB;`),
  createUserEntry: (email, firstName, lastName, password) =>
    runQuery(
      `INSERT INTO Users(email, first_name, last_name, password) 
      VALUES ('${email}', '${firstName}', '${lastName}', '${password}');`
    ),
  findUserByEmail: email =>
    runQuery(`SELECT user_id FROM Users WHERE email='${email}';`),
  verifyCredentials: (email, password) =>
    runQuery(
      `SELECT user_id FROM Users WHERE email='${email}' AND password='${password}';`
    )
}

module.exports = queries
