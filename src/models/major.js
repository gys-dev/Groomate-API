import db from '../db';
import School from './school'
const TABLE_NAME = 'Major';

/**
 * User model.
 */
class Major extends db.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  get school() {
      return this.belongsTo(School, 'school');
  }

}

export default Major;
