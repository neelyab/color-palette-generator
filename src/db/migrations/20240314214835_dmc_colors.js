/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("dmc_colors", (table) => {
        table.increments("color_id").primary(); // Sets palette_id as the primary key
        table.string("color_name");
        table.string("color_code");
        table.string("hex_code");
        table.string("rgb");
      });
  };
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("dmc_colors");
};
