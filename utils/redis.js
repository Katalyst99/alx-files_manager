import { promisify } from 'util';
import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log(err));
    this.isClientConnected = false;
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  isAlive() {
    return this.isClientConnected;
  }

  async get(key) {
    return promisify(this.client.get).bind(this.client)(key);
  }

  async set(key, value, duration) {
    const set = promisify(this.client.set).bind(this.client);
    await set(key, value, 'EX', duration);
  }

  async del(key) {
    return promisify(this.client.set).bind(this.client)(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
