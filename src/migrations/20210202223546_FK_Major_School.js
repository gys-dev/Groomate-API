/**
 * Create table `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.table('Major', function(table){
    table.foreign('school').references('School.id');
  })
}

/**
 * Drop `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.table('Major', function(table) {
    table.dropForeign('school');
  })
}
