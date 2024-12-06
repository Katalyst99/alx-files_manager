import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  static getStatus(req, res) {
    const redStatus = redisClient.isAlive();
    const dbStatus = dbClient.isAlive();
    res.status(200).send({
      redis: redStatus,
      db: dbStatus,
    });
  }

  static async getStats(req, res) {
    res.status(200).json({
      users: await dbClient.nbUsers(),
      files: await dbClient.nbFiles(),
    });
  }
}

module.exports = AppController;
