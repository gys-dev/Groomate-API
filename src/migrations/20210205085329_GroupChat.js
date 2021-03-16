/**
 * Create table `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('GroupChat', function(table) {
    table.integer('group');
    table.integer('message');
    table.foreign('group').references('Group.id');
    table.foreign('message').references('Message.id');
    table.date('date_send', { precision: 6 }).notNull();
    table.primary(['group', 'message']);
  });
}

/**
 * Drop `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('GroupChat');
}
