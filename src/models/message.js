import db from '../db';
import User from './user';
import MessageType from './messageType'

const TABLE_NAME = 'Message';

/**
 * User model.
 */
class Message extends db.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  get sender() {
      return this.belongsTo(User, 'sender_id', 'id');
  }

  get type() {
      return this.belongsTo(MessageType, 'type');
  }

}

export default Message;
