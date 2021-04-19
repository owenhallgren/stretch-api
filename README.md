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
1. `git clone git@github.com:owenhallgren/stretch-api.git`

2. `cd stretch-api`

3. `npm i`

### Run the following in terminal 
knex migrate:latest

knex seed: run

`cd reviews-express`

`node server.js`

