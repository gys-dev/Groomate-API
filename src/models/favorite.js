import db from '../db';
import User from './user'
import UserFavorite from './userFavorite'

const TABLE_NAME = 'Favorite';

/**
 * User model.
 */
class Favorite extends db.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }
  
  get users() {
    return this.belongsToMany(User, 'UserFavorite', 'favorite', 'user');
  }


}

export default Favorite;
