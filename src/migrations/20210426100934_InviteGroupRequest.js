/**
 * Create table `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('InviteGroupRequest', function (table){
    table.increments();
    table.integer('group_id');
    table.string('user_id');
    table.boolean('request_status');
    table
      .timestamp('created_at');

    table.foreign('group_id').references('Group.id');
    table.foreign('user_id').references('User.id');
    table.unique(['group_id', 'user_id'])
  });
}

/**
 * Drop `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('InviteGroupRequest');
}
