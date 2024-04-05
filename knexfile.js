require("dotenv").config();
const path = require("path");
const { DATABASE_URL } = process.env;
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: DATABASE_URL,
    migrations: {
         directory: path.join(__dirname, "src", "db", "migrations"),
       },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  }
};
