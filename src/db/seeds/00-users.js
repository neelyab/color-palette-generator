const users = require("../fixtures/users");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
  return knex
    .raw("TRUNCATE TABLE embroidery_users RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("embroidery_users").insert(users);
    });
};
