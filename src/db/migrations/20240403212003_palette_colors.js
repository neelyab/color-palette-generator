/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("palette_colors", (table) => {
        table.increments("id").primary(); // Sets id as the primary key
        table.integer("palette_id").unsigned().notNullable();
        table
        .foreign("palette_id")
        .references("palette_id")
        .inTable("palettes")
        .onDelete("cascade");
        table.integer("color_id").unsigned().notNullable();
        table
        .foreign("color_id")
        .references("color_id")
        .inTable("dmc_colors")
        .onDelete("cascade");

      });
  };
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("palette_colors");
};