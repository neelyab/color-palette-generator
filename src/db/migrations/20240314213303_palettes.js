/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("palettes", (table) => {
    table.increments("palette_id").primary(); // Sets palette_id as the primary key
    table.string("palette_name");
    table.string("dmc_colors");
    table.integer("user_id").unsigned().notNullable();
    table
    .foreign("user_id")
    .references("id")
    .inTable("embroidery_users")
    .onDelete("cascade");
  });
};
/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function(knex) {
  return knex.schema.dropTable("palettes");
};
