/**
 * Delete existing entries and seed values for `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex('School')
    .del()
    .then(() => {
      return knex('School').insert([
        {
          id: 1,
          name: 'Đại học ngoại ngữ'
        },
        {
          id: 2,
          name: 'Đại học khoa học'
        },
        {
          id: 3,
          name: 'Đại học kinh tế'
        },
        {
          id: 4,
          name: 'Khoa thể chất'
        },
        {
          id: 5,
          name: 'Đại học luật'
        }
      ]);
    });
}
