import db from '../db';
import User from './user';
import Group from './group';

const TABLE_NAME = 'InviteGroupRequest';

/**
 * User model.
 */
class InviteGroupRequest extends db.Model {
/**
 * Get table name.
 */
get tableName() {
  return TABLE_NAME;
}

get user() {
  return this.belongsTo(User, 'user_id', 'id');
}

get group() {
  return this.belongsTo(Group, 'group_id');
}


}

export default InviteGroupRequest;
