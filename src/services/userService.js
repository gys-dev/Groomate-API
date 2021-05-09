import Boom from '@hapi/boom';

import {User, Favorite, UserFavorite} from '../models';
import {compareHash} from '../utils/genHash'
import Utils from '../utils/utils'
import fetch from 'node-fetch';

export function login(userId, accessToken) {
  let cacheUser;
  return new User({id: `${userId}`})
  .fetch()
  .then(user => {
    cacheUser = user;
    return verifyAccessToken(accessToken);
  })
  .then(responseToken => {
    if (!responseToken) {
      throw Boom.notFound('Access Token Invalid');
    }

    if (responseToken.email != cacheUser.attributes.email) {
      console.log(responseToken.email + '|' + cacheUser.email)
      throw Boom.notFound('Access Token Not Match User');
    }
    return Promise.resolve(accessToken)
  })
  .then(acccessToken => {
    return updateAccessToken(cacheUser.attributes.id, acccessToken)
  })
  .then(() => {
    return getUser(cacheUser.id)
  })
  .catch(User.NotFoundError, () => {
      throw Boom.notFound('Incorect user');
  });
}

export async function updateAccessToken(userId, accessToken) {
  return new User({id: userId}).save({access_token: accessToken});
}

export async function verifyAccessToken(accessToken) {
  const url = 'https://graph.facebook.com/me?fields=email,gender&access_token=';
  const response = await fetch(url + accessToken);
  const jsonResponse = await response.json();

  if (jsonResponse.error) {
    return false
  } else {
    return jsonResponse;
  }
}

/**
 * Get all users.
 *
 * @returns {Promise}
 */
export function getAllUsers() {
  return User.fetchAll();
}

/**
 * Get a user.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getUser(id) {
  return new User({ id })
    .fetch()
}

export function checkUserEmail(email) {
  return new User({email})
    .fetch()
}

/**
 * Create new user.
 *
 * @param   {Object}  user
 * @returns {Promise}
 */
export function createUser(userInfo) {
  return new User(userInfo).save(null, {method: 'insert'});
}

/**
 * Update a user.
 *
 * @param   {Number|String}  id
 * @param   {Object}         user
 * @returns {Promise}
 */
export function updateUser(id, user) {
  return new User({ id }).save(user);
}

/**
 * Delete a user.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deleteUser(id) {
  return new User({ id }).fetch().then(user => user.destroy());
}

export function getUserByFavorite(favoriteId) {
  return new Favorite({id: favoriteId}).users.fetch()
}

export const getUsersWithFavoriteRelate = async (page, limit, userId) => {
    const fieldsRandom = ['email', 'first_name', 'last_name', 'major', 'created_at'];
    const fieldSort = Utils.getRandomField(fieldsRandom);
    const sortAxis = Utils.getRandomInRange(0, 1) ? 'DESC' : 'ASC';
    const totalUser = await new User().count();
    const page2 = Number.parseInt(totalUser / 30) == 0 ? 1 : Number.parseInt(totalUser / 30)
    const randomPage = Utils.getRandomInRange(1, page2);

    const paginUsers = await new User().where('id', '<>', userId)
      .orderBy(fieldSort, sortAxis)
      .fetchPage({
        pageSize: 30,
        page: randomPage
      });

    const users = paginUsers.map(async row => {
      const favorites = await row.favorites.fetch();
      const major = await row.major.fetch() || undefined;
      const rawFavorites = JSON.stringify(favorites);
      const jsonFavorites = JSON.parse(rawFavorites);
      delete row.attributes.access_token;
      delete row.attributes.major;
      return Object.assign({favorites: jsonFavorites, major: major.attributes}, row.attributes)
    })

    return Promise.all(users)
}

export const getUserViaLocationMatch = async (page, limit, userId) => {
  const fieldsRandom = ['email', 'first_name', 'last_name', 'major', 'created_at'];
  const fieldSort = Utils.getRandomField(fieldsRandom);
  const sortAxis = Utils.getRandomInRange(0, 1) ? 'DESC' : 'ASC';
  const totalUser = await new User().count();
  const page2 = Number.parseInt(totalUser / 30) == 0 ? 1 : Number.parseInt(totalUser / 30)
  const randomPage = Utils.getRandomInRange(1, page2);

  console.log(randomPage)
  const paginUsers = await new User().where('id', '<>', userId)
    .orderBy(fieldSort, sortAxis)
    .fetchPage({
      pageSize: 30,
      page: randomPage,
      
    });

  const users = paginUsers.map(async row => {
      const major = await row.major.fetch();
      console.log(major)
      delete row.attributes.access_token;
      delete row.attributes.major;
      return Object.assign({major: major.attributes}, row.attributes)
  })
  
  
    return Promise.all(users)
}
