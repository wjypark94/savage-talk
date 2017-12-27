CREATE DATABASE chatInfo;
USE chatInfo;

CREATE TABLE users (
  id  VARCHAR(200) NOT NULL,
  name VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE messages (

);

CREATE TABLE rooms (

);