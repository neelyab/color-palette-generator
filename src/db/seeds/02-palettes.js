const palettes = require("../fixtures/palettes");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
  return knex
    .raw("TRUNCATE TABLE palettes RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("palettes").insert(palettes);
    });
};
