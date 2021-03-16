import db from '../db';
import User from './user'
import Favorite from './favorite'

const TABLE_NAME = 'UserFavorite';

/**
 * User model.
 */
class UserFavorite extends db.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  get favorite() {
    return this.belongsTo(Favorite, 'favorite')
  }

  get user() {
    return this.belongsTo(User, 'user', 'id')
  }
  
}

export default UserFavorite;
