# go-bar-app

Install project
--------------
- Install npm packages

```sh
$ npm install
```

Config project
--------------

```sh
cp config.json.dist config.json
```

-  For development
```sh
cp -r env.dist development
```

-  For production
```sh
cp -r env.dist production
```

-  For test
```sh
cp -r env.dist test

Run Migrations
--------------

 - For production
```sh
$ node_modules/.bin/sequelize db:migrate --env production
```

 - For development
```sh
$ node_modules/.bin/sequelize db:migrate --env development
```

- For undo
```sh
$ node_modules/.bin/sequelize db:migrate:undo --env development
```

### MySQL 8 error
--------------
If you use MySQL 8 and have ERROR: Client does not support authentication protocol requested by server;
Run the following command (or install MySQL version below 8.0):
```mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YourRootPassword';
-- or
CREATE USER 'foo'@'%' IDENTIFIED WITH mysql_native_password BY 'bar';
```

Run Project
--------------
- npm

```sh
$ npm start
```

Run Project in production mode
------------------------------
- npm

```sh
$ NODE_ENV=production npm start
```