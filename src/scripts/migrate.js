const db = require('../db/db');

db.prepare(`ALTER TABLE users ADD COLUMN password TEXT NOT NULL DEFAULT ''`).run();

console.log("Add password column Migration Complete");
