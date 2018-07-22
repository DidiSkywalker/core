/**
 * File managing configuration for the application
 * */
const dotenv = require('dotenv');
const fs = require('fs');

if (fs.existsSync('.env')) {
  dotenv.load();
}

const defaults = {
  HYPIXEL_API_KEY: '', // To get your API key, type '/api' on Hypixel
  HYPIXEL_API_LIMIT: 120, // API key throttle limit
  ROLE: '', // for specifying the file that should be run when entry point is invoked
  GROUP: '', // for specifying the group of apps that should be run when entry point is invoked
  NODE_ENV: 'development',
  PORT: '3000',
  MOJANG_STATUS_INTERVAL: 15000, // Interval between refreshing Mojang status in milliseconds
  MONGODB_URL: 'mongodb://localhost/slothpixel', // Url of the MongoDB database
  REDIS_URL: 'redis://127.0.0.1:6379/0', // connection string for Redis
  ENABLE_UUID_CACHE: true, // cache player stats
  ENABLE_DB_CACHE: true, // set to enable MongoDB cache
  UUID_CACHE_SECONDS: 21600, // number of seconds to cache username-uuid pairs
  GC_HEARTBEAT_TIMEOUT: 5000, // milliseconds to timeout if no heartbeat is reveived
  GC_HEARTBEAT_INTERVAL: 25000, // milliseconds between heartbeat packets to client
};

// ensure that process.env has all values in defaults, but prefer the process.env value
Object.keys(defaults).forEach((key) => {
  process.env[key] = (key in process.env) ? process.env[key] : defaults[key];
});
if (process.env.NODE_ENV === 'development') {
  // force PORT to null in development so we can run multiple web services without conflict
  // process.env.PORT = '';
}
if (process.env.NODE_ENV === 'test') {
  // process.env.PORT = ''; // use service defaults
  // process.env.REDIS_URL = process.env.REDIS_TEST_URL;
  process.env.SESSION_SECRET = 'testsecretvalue';
  process.env.FRONTEND_PORT = 80080;
}
// now processes can use either process.env or config
module.exports = process.env;
