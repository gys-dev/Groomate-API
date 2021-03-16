import db from '../db';
import User from './user';
import Message from './message';

const TABLE_NAME = 'PersonalChat';

/**
 * User model.
 */
class PersonChat extends db.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  get sender() {
    return this.belongsTo(User, 'id_sender', 'id');
  }

  get receiver() {
    return this.belongsTo(User, 'id_', 'id');
  }

  get message() {
    return this.belongsTo(Message, 'message');
  }

  get idAttribute() {
    return 'message'
  }

}

export default PersonChat;
