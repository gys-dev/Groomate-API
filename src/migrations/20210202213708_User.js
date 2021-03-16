/**
 * Create table `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTableIfNotExists('User', function(table) {
    table.string('id').primary();
    table.string('email', 100);
    table.string('first_name', 50);
    table.string('last_name', 50);
    table.string('picture');
    table.boolean('active');
    table.boolean('gender');
    table.string('location'); // #JSON
    table
      .timestamp('created_at')
  });
}

/**
 * Drop `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('User');
}
