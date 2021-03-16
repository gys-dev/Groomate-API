/**
 * Create table `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('Favorite', function(table) {
    table.increments();
    table.string('name');
    table.int('match_point').unsigned() // common favorite will have less point than rare favorite
  });
}

/**
 * Drop `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('Favorite');
}
