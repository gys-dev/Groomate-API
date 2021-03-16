/**
 * Delete existing entries and seed values for `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function seed(knex) {
    return knex('MemberGroup')
      .del()
      .then(() => {
        return knex('MemberGroup').insert([
          {
            id_user: '100004904834872',
            id_group: 1
          },
          {
            id_user: '100004904834872',
            id_group: 2
          },
          {
            id_user: '100005549251294',
            id_group: 1
          },
          {
            id_user: '100005549251294',
            id_group: 3
          },
        ]);
      });
  }
  