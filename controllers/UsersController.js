import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({ error: 'Missing email' });
      res.end();
      return;
    }
    if (!password) {
      res.status(400).json({ error: 'Missing password' });
      res.end();
      return;
    }
    const users = dbClient.db().collection('users');
    const user = await users.findOne({ email });
    if (user) {
      res.status(400).json({ error: 'Already exist' });
      res.end();
      return;
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
  }
}

module.exports = UsersController;
