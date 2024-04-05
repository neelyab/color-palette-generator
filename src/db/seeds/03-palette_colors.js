const palettes = require("../fixtures/palette_colors");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
  return knex
    .raw("TRUNCATE TABLE palette_colors RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("palette_colors").insert(palettes);
    });
};
