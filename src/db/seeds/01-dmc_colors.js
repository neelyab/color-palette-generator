const colors = require("../fixtures/colors");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
  return knex
    .raw("TRUNCATE TABLE dmc_colors RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("dmc_colors").insert(colors);
    });
};
