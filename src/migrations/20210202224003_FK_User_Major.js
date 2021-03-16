/**
 * Create table `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.table('User', function(table){
    table.string('major');
    table.foreign('major').references('Major.id');
  })
}

/**
 * Drop `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.table('User', function(table) {
    table.dropForeign('major');
  })
}
