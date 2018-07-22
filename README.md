# go-bar-app

### MySQL 8 error
If you use MySQL 8 and have ERROR: Client does not support authentication protocol requested by server;
Run the following command (or install MySQL version below 8.0):
```mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YourRootPassword';
-- or
CREATE USER 'foo'@'%' IDENTIFIED WITH mysql_native_password BY 'bar';
```