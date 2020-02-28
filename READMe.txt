If get error while connection

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
flush privileges;

Debug
node --inspect --debug index.js
