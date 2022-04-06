const mongoose = require('mongoose');

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
    mongoose
      .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => console.log('Database successfully connected'));
  }
}

module.exports = Database;
