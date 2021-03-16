/**
 * Create table `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('RequestJoinGroup', function(table) {
      table.increments();
      table.integer('id_group');
      table.string('id_user');
      table.date('date', { precision: 6 }).notNull();
      table.foreign('id_group').references('Group.id');
      table.foreign('id_user').references('User.id');
      table.integer('request_status').notNull(); // 1 approve, 2 denied, 0 default
  }); 
}

/**
 * Drop `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('RequestJoinGroup');
}
