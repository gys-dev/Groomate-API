/**
 * Create table `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('RequestMergeGroup', table => {
    table.integer('id_group_source');
    table.integer('id_group_des');
    table.date('date', { precision: 6 }).notNull();
    table.foreign('id_group_source').references('Group.id');
    table.foreign('id_group_des').references('Group.id');
    table.primary(['id_group_source', 'id_group_des']);
    table.integer('request_status').notNull();
  });
}

/**
 * Drop `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('RequestMergeGroup');
}
