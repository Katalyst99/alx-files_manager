import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || '27017';
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbUrl = `mongodb://${host}:${port}/${database}`;

    this.client = new MongoClient(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.client.connect();
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const users = this.client.db().collection('users');
    return users.countDocuments();
  }

  async nbFiles() {
    const files = this.client.db().collection('files');
    return files.countDocuments();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
