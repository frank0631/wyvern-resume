#!/bin/bash

#sudo apt-get install -y mysql-client


#mysql -u root -proot -h mysql -P 3306 mysql -e "SELECT TABLE_SCHEMA, TABLE_NAME FROM INFORMATION_SCHEMA.TABLES;"
mysql -u root -proot -h mysql -P 3306 mysql -e "CREATE DATABASE IF NOT EXISTS girros;"
mysql -u root -proot -h mysql -P 3306 girros -e "CREATE USER IF NOT EXISTS 'girros'@'%' IDENTIFIED BY 'girros';"
mysql -u root -proot -h mysql -P 3306 girros -e "GRANT ALL PRIVILEGES ON girros.* TO 'girros';"