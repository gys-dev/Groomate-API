import db from '../db';
import Major from './major'

const TABLE_NAME = 'School';

/**
 * User model.
 */
class School extends db.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  get majors() {
    return this.hasMany(Major, 'school') 
  }
}

export default School;
