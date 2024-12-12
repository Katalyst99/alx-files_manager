import crypto from 'crypto';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.status(400).json({ error: 'Missing email' });
      }
      if (!password) {
        return res.status(400).json({ error: 'Missing password' });
      }
      const user = await dbClient.collection('users').findOne({ email });
      if (user) {
        return res.status(400).json({ error: 'Already exist' });
      }
      const hashdPwd = crypto.createHash('sha1').update(password).digest('hex');
      const newUser = {
        email,
        password: hashdPwd,
      };
      await dbClient.collection('users').insertOne(newUser);
      return res.status(201).json({
        id: newUser._id,
        email: newUser.email,
      });
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = UsersController;
