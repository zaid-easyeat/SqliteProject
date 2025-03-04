import SQLite from 'react-native-sqlite-storage';

// Enable debugging for SQLite
SQLite.DEBUG(true);
SQLite.enablePromise(true);

// Open the database (Creates if it doesn't exist)
const getDBConnection = async () => {
  return SQLite.openDatabase(
    {name: 'app.db', location: 'default'},
    () => console.log('Database opened!'),
    error => console.error('Error opening database:', error),
  );
};

// Create a table
const createTable = async () => {
  const db = await getDBConnection();
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL
    );
  `);
  console.log('Table created');
};

// Insert a user
const insertUser = async (name, age) => {
  const db = await getDBConnection();
  await db.executeSql('INSERT INTO users (name, age) VALUES (?, ?);', [
    name,
    age,
  ]);
  console.log('User added:', name);
};

// Fetch all users
const getUsers = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql('SELECT * FROM users;');
  let users = [];
  results.forEach(result => {
    for (let i = 0; i < result.rows.length; i++) {
      users.push(result.rows.item(i));
    }
  });
  return users;
};

// Delete a user by ID
const deleteUser = async id => {
  const db = await getDBConnection();
  await db.executeSql('DELETE FROM users WHERE id = ?;', [id]);
  console.log(`User with ID ${id} deleted.`);
};

export {createTable, insertUser, getUsers, deleteUser};
