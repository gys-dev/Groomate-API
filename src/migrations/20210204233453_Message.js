/**
 * Create table `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('Message', function(table) {
    table.increments();
    table.string('message').notNull();
    table.string('sender_id').notNull();
    table.foreign('sender_id').references('User.id');
    table.string('image');
  });
}

/**
 * Drop `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('Message');
}
