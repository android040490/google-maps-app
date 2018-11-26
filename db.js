const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);
db.set( "markers", [])
  .write()
db.set( "users" , [{
    id: 1,
    name: 'Vasya',
    surname: 'Pupkin',
    email: 'user@gmail.com',
    password: '1234',
    avatar: 'assets/images/Vasya.png'
    }])
    .write()

module.exports = db;