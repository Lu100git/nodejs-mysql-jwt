-- this creates the database and the table neeed
-- so you can store registered users and hashed passwords in MySQL
-- you'll need to run this manually after installing mysql on your server
-- I already fried my brain coding the back end,using a lame static front end
-- and deploying the database, so oviously I'm exausted and I don't want to create
-- a bash script, but in theory, if you know linux and bash scripting you can automate all this stuff

create database registry;

use registry;

create table users(
    id int not null AUTO_INCREMENT,
    username varchar(40),
    password varchar(255),
    primary key (id)
);

-- you don't really need this line, I scrwed up the create table process
-- so I did it this way, plus t helps you to remember how to modify the table columns
alter table users modify column username varchar(40) unique;