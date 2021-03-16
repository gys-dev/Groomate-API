/**
 * Delete existing entries and seed values for `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex('Major')
    .del()
    .then(() => {
      return knex('Major').insert([
        {
          id: 1,
          name: 'Công nghệ thông tin',
          school: 2,
          color: '#32a84e'
        },
        {
          id: 2,
          name: 'Báo chí',
          school: 2,
          color: '#4287f5'
        },
        {
          id: 3,
          name: 'Đông phương học',
          school: 2,
          color: '#eb4034'
        },
      ]);
    });
}
