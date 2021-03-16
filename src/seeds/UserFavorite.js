/**
 * Delete existing entries and seed values for `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex('UserFavorite')
    .del()
    .then(() => {
      return knex('UserFavorite').insert([
        {
          user: '100004904834872',
          favorite: 1
        },
        {
          user: '100004904834872',
          favorite: 2
        },
        {
          user: '100005549251294',
          favorite: 1
        },
        {
          user: '100005549251294',
          favorite: 3
        },
      ]);
    });
}
