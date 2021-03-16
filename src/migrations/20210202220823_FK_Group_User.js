/**
 * Create table `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.table('Group', function(table) {
    table.foreign('owner').references('User.id');
  })
}

/**
 * Drop `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.table('Group', function(table) {
    table.dropForeign('owner');
  })
}
