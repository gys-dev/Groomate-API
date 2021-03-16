/**
 * Create table `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTableIfNotExists('Group', function(table) {
    table.increments();
    table.string('name');
    table.text('description');
    table.string('img');
    table.string('owner');
    table.foreign('owner').references('User.id')
    table
      .timestamp('created_at');
  });
}

/**
 * Drop `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('Group');
}
