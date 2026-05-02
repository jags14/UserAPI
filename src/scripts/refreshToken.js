const db = require('../db/db');

db.prepare(`ALTER TABLE users ADD COLUMN refreshToken TEXT`).run();
console.log(`Added Column refreshToken`);