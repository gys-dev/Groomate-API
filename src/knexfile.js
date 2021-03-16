require('dotenv').config({ path: __dirname + '/../.env' });

// Default configuration for database connection
let connection = () => ({
  filename: process.env.SQLITE_FILENAME
})

/**
 * Database configuration.
 */
module.exports = {
  debug: process.env.NODE_ENV == 'development',
  connection,
  client: process.env.DB_CLIENT,
  migrations: {
    tableName: 'migrations',
    directory: './migrations',
    stub: './stubs/migration.stub'
  },
  seeds: {
    directory: './seeds',
    stub: './stubs/seed.stub'
  },
  useNullAsDefault: true
};
