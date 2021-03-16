import db from '../db';
const TABLE_NAME = 'MessageType';

/**
 * User model.
 */
class MessageType extends db.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

}

export default MessageType;
