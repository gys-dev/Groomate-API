import db from '../db';
import User from './user';
import Group from './group';

const TABLE_NAME = 'RequestJoinGroup';

/**
 * User model.
 */
class RequestJoinGroup extends db.Model {
/**
 * Get table name.
 */
get tableName() {
  return TABLE_NAME;
}

get user() {
  return this.belongsTo(User, 'id_user', 'id');
}

get group() {
  return this.belongsTo(Group, 'id_group');
}


}

export default RequestJoinGroup;
