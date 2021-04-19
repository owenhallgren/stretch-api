# Stretch (Pear) API


## Installation

### 1. PostgreSQL Setup
#### Run the following in terminal
```
brew install postgresql

brew services start postgresql

psql postgres

CREATE ROLE <username>

ALTER ROLE <username> CREATEDB

\q

psql -d postgres -U <username>

CREATE DATABASE reviews; 
```
### 2. Clone the repo
1. `$ git clone git@github.com:owenhallgren/stretch-api.git`

2. `$ cd stretch-api`

3. `$ npm i`

### 3. Initialize and Run the DB

knex migrate:latest

knex seed: run

`cd reviews-express`

`node server.js`

Your all set!

## Technologies Used

![js](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

![express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

![node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)


![psql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
