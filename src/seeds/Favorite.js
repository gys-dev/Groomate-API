/**
 * Delete existing entries and seed values for `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex('Favorite')
    .del()
    .then(() => {
      return knex('Favorite').insert([
        {
          id: 1,
          name: 'Code',
          match_point: 6
        },
        {
          id: 2,
          name: 'Xem Phim',
          match_point: 6
        },
        {
          id: 3,
          name: 'Viết lách',
          match_point: 6
        },
        {
          id: 4,
          name: 'Bóng đá',
          match_point: 8
        },
        {
          id: 5,
          name: 'Bóng chuyền',
          match_point: 8
        },
      ]);
    });
}
