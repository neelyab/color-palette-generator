require("dotenv").config();
const path = require("path");
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const {
  NODE_ENV = "development",
  DEVELOPMENT_DATABASE_URL,
  PRODUCTION_DATABASE_URL,
} = process.env;
const URL =
  NODE_ENV === "production"
    ? PRODUCTION_DATABASE_URL
    : DEVELOPMENT_DATABASE_URL;

module.exports = {

  development: {
    client: 'pg',
    connection: DEVELOPMENT_DATABASE_URL,
    migrations: {
         directory: path.join(__dirname, "src", "db", "migrations"),
       },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },
  production: {
    client: 'pg',
    connection: process.env.PRODUCTION_DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  
};
