/**
 * Create table `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('PersonalChat', function(table) {
    table.string('id_sender');
    table.string('id_receiver');
    table.integer('message');
    table.foreign('id_sender').references('User.id');
    table.foreign('id_receiver').references('User.id');
    table.foreign('message').references('Message.id');
    table.primary(['id_sender', 'id_receiver', 'message']);
  });
}

/**
 * Drop `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('PersonalChat');
}
