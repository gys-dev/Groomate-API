/**
 * Create table `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('MemberGroup', function(table){

    table.integer('id_group');
    table.string('id_user');
    table.foreign('id_group').references('Group.id');
    table.foreign('id_user').references('User.id');
    table.date('date_join', { precision: 6 });
    table.primary(['id_group', 'id_user'])
  });
}

/**
 * Drop `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('MemberGroup');
}
