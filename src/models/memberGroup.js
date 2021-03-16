import db from '../db';
import Group from './group'
import User from './user'

const TABLE_NAME = 'MemberGroup';

/**
 * User model.
 */
class MemberGroup extends db.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  get group() {
      return this.belongsTo(Group, 'id_group', 'id');
  }

  get member() {
      return this.belongsTo(User, 'id_user', 'id');
  }

  get idAttribute() {
    return 'id_user';
  }

}

export default MemberGroup;
