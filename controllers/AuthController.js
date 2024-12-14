import sha1 from 'sha1';
import { v4 as uuidv4 } from 'uuid';
import redisClient from '../utils/redis.js;
import dbClient from '../utils/db.js';

class AuthController {
  static async getConnect(req, res) {
    const authHeader = req.headers.authorization;
  }
}
