# Stretch (Pear) API


## Installation

### Run the following in terminal
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
#### Clone the repo
1. `cd stretch-api`

2. `npm i`

### Run the following in terminal 
knex migrate:latest

knex seed: run

`cd reviews-express`

`node server.js`

