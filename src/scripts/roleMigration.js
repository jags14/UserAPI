const db = require('../db/db');

db.prepare(`ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'user'`).run();

console.log(`added role column to users table`);