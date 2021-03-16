/**
 * Delete existing entries and seed values for `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function seed(knex) {
    return knex('Group')
      .del()
      .then(() => {
        return knex('Group').insert([
         {
             id: 1,
             name: 'Y Groups', 
             description: 'Một group của lớp A gang',
             img: 'https://fb.com',
             owner: '100004904834872'
         },
         {
            id: 2,
            name: 'Chong Groups', 
            description: 'Một group của lớp B gang',
            img: 'https://fb.com',
            owner: '100005549251294'
         },
         {
            id: 3,
            name: 'Lam Groups', 
            description: 'Một group của lớp B gang',
            img: 'https://fb.com',
            owner: '100007073926022'
         },
         {
            id: 4,
            name: 'Y Groups 2', 
            description: 'Một group của lớp A gang',
            img: 'https://fb.com',
            owner: '100004904834872'
         },
        ]);
      });
  }
  