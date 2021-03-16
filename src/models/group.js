import db from '../db';
import MemberGroup from './memberGroup';
import User from './user'
const TABLE_NAME = 'Group';

/**
 * User model.
 */
class Group extends db.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  get owner() {
      return this.belongsTo(User, 'owner', 'id');
  }
  get users() {
      return this.belongsToMany(User).through(MemberGroup, 'id_group', 'id_user')
  }
  

}

export default Group;
