# db_migrate_demo

This project was to demonstrate how db-migrate works.

* db-migrate
  * [SQL API](https://db-migrate.readthedocs.io/en/latest/API/SQL/)
  * [Usage](https://db-migrate.readthedocs.io/en/latest/Getting%20Started/usage/)
  * npm install `db-migrate` and `db-migrate-mysq
  * add `database.json` under root folder
  * npm install `mysql-promise` and define/export db object via `db.js`
  * create a `migrations` folder, and use `./node_modules/.bin/db-migrate create [filename]` to create migration files
  * use `co` and `db` in those migration files to do database operations
  * create a `migrate.js` and call `dbmigrate.up();` to start the migration process (technically we only need to implement `up` method in those migration files, since `dbmigrate.up()` only run up methods)
  * in index.js, add the following code to kick off the migration
  ```
  // run migrations
  if(process.env.NODE_ENV !== 'test') {
  	var migrate = require('./modules/migrate');
  }
  ```

* docker-compose
  * docker-compse file defined environment variables for database connection config
  * `"./schema:/docker-entrypoint-initdb.d/"` in docker-compse's mysql setting will import initial setting to mysql container
  * used version 2's network, so don't need to use `link`; of course, we need to create network first by using `docker network create jz_playground`

* db-query
  * see routes.js about how to use where clause in query
