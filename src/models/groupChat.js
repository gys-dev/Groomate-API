import db from '../db';
import Group from './group';
import Message from './message';

const TABLE_NAME = 'GroupChat';

/**
 * User model.
 */
class GroupChat extends db.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  get group() {
    return this.belongsTo(Group, 'group');
  }

  get message() {
    return this.belongsTo(Message, 'message');
  }

  get idAttribute() {
    return 'message'
  }
}

export default GroupChat;
