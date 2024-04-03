/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("embroidery_users", (table) => {
        table.increments("id").primary(); // Sets user_id as the primary key
        table.string("first_name");
        table.string("user_password");
        table.string("username");
      });
  };
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("embroidery_users");
};
