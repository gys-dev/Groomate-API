/**
 * Create table `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('Major', function(table) {
    table.increments();
    table.string('name');
    table.integer('school');
    table.string('color'); // #color will display above badge in mobile side
  });
}

/**
 * Drop `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('Major');
}
