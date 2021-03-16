/**
 * Create table `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('UserFavorite', function (table) {
    table.integer('user');
    table.foreign('user').references('User.id');
    table.integer('favorite');
    table.foreign('favorite').references('Favorite.id');
    table.primary(['user', 'favorite']);
  });
}

/**
 * Drop `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('UserFavorite');
}
