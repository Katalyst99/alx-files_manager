import sha1 from 'sha1';
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
      const users = dbClient.db().collection('users');
      const user = await users.findOne({ email });
      if (user) {
        return res.status(400).json({ error: 'Already exist' });
      }
      const hashdPwd = sha1(password);
      const newUser = {
        email,
        password: hashdPwd,
      };
      const output = await users.insertOne(newUser);
      return res.status(201).json({
        id: output.insertedId,
        email,
      });
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = UsersController;
