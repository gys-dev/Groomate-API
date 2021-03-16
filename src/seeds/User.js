/**
 * Delete existing entries and seed values for `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex('User')
    .del()
    .then(() => {
      return knex('User').insert([
        {
          id: '100004904834872',
          email: 'ducyk41cntt@gmail.com',
          first_name: 'Tran',
          last_name: 'DucY',
          active: 1,
          gender: 1,
          picture: 'https://scontent.fdad3-3.fna.fbcdn.net/v/t1.0-9/152135780_1872758149564328_9052406186773706567_n.jpg?_nc_cat=109&ccb=3&_nc_sid=09cbfe&_nc_ohc=6cpLv76GFgEAX8f0Nb6&_nc_ht=scontent.fdad3-3.fna&oh=9c28f2f46ff7c4309bf38f38b36e9ff8&oe=60569317',
          location: JSON.stringify({latitude: 16.320139, longitude: 107.576580}),
          access_token: "EAAPEmqsVg3EBALGz72oVB9zcdkZAfTigGywoTZCmHoXAOtAGqu2H1eF5toqf4LkNSEqIi3jx9O5ZB5b688yyKnrRn6RzMbhw9Lm3Ggvjt6zZAtgNyd4i1wzQwmEhnIlK0TDJkQuc6BuNXpXf2pLfQXVma1ZCMKNoLvbRCyGJZBFBrcKsoe81ZAew0kKGYiaZCqG0LHbHvDKTKZBTBdKZB0NiTw8ud0NWubfPGAWKh5QyDsBr4nKmrAdUM6",
        },
        {
          id: '100005549251294',
          email: 'phungducchong@gmail.com',
          first_name: 'Phung Duc',
          last_name: 'Chong',
          active: 1,
          gender: 1,
          picture: 'https://scontent.fdad3-3.fna.fbcdn.net/v/t1.0-9/144966344_1558087391052888_5948329097218966063_o.jpg?_nc_cat=111&ccb=3&_nc_sid=8bfeb9&_nc_ohc=oS1pZoZ2pi0AX-EVMko&_nc_ht=scontent.fdad3-3.fna&oh=7f563e8066954114218fe6386db85e58&oe=6059D12B',
          location: JSON.stringify({latitude: 16.589870, longitude: 107.208390}),
        },
        {
          id: '100007073926022',
          email: 'hxlam@gmail.com',
          first_name: 'Lam',
          last_name: 'Ho Xuan',
          active: 1,
          gender: 1,
          picture: 'https://scontent.fdad3-3.fna.fbcdn.net/v/t1.0-9/144966344_1558087391052888_5948329097218966063_o.jpg?_nc_cat=111&ccb=3&_nc_sid=8bfeb9&_nc_ohc=oS1pZoZ2pi0AX-EVMko&_nc_ht=scontent.fdad3-3.fna&oh=7f563e8066954114218fe6386db85e58&oe=6059D12B',
          location: JSON.stringify({latitude: 16.589870, longitude: 107.208390}),
        },
      ]);
    });
}
