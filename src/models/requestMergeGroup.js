import db from '../db';
import Group from './group';

const TABLE_NAME = 'RequestMergeGroup';

/**
 * User model.
 */
class RequestMergeGroup extends db.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  get groupSource() {
    return this.belongsTo(Group, 'id_group_source');
  }

  get group() {
    return this.belongsTo(Group, 'id_group_des');
  }

}

export default RequestMergeGroup;
