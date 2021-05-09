import knexJs from 'knex';
import bookshelf from 'bookshelf';
import knexConfig from './knexfile';

/**
 * Database connection.
 */
const knex = knexJs(knexConfig);
console.log(knexConfig.connection())
const db = bookshelf(knex);
db.plugin("pagination")

export default db;
export {
    knex
}
