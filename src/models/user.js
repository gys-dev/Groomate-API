import db from '../db';
import Major from './major';
import Favorite from './favorite'
import UserFavorite from './userFavorite'
import { Collection } from 'bookshelf';

const TABLE_NAME = 'User';

/**
 * User model.
 */
class User extends db.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  get major() {
    return this.belongsTo(Major, 'major'); 
  }

  get favorites() {
    return this.belongsToMany(Favorite).through(UserFavorite, 'user', 'favorite')
  }
  
  
}

export default User;
