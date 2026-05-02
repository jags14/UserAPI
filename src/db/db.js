const fs = require('fs');
const path = require('path');

const initSQL = fs.readFileSync(path.join(__dirname, 'init.sql'), {encoding: 'utf-8'});
const dbPath = path.join(__dirname, '../../crudapi.db');

const Database = require('better-sqlite3');
const db = new Database(dbPath, {verbose: console.log});
db.pragma('journal_mode=WAL');
db.exec(initSQL);

module.exports = db;