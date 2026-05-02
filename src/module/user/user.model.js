const db = require('../../db/db');

const getUsers = ({ limit, offset, whereClause, values }) => {
    const countQuery = `SELECT COUNT(*) as total FROM users ${whereClause} `;
    const totalResult = db.prepare(countQuery).get(...values);
    const total = totalResult.total;
    const query = `SELECT id, username, email, age, role FROM users ${whereClause} LIMIT ? OFFSET ?`;
    const users = db.prepare(query).all(...values, limit, offset);
    // const rows = db.prepare('SELECT * FROM users').all();
    return {users, total};
}
const getUserById = (id) => {
    const query = `SELECT * FROM users WHERE id = ?`;
    const row = db.prepare(query).get(id);
    return row;

}
const getUserByEmail = (email) => {
    const query = `SELECT * FROM users where email = ?`;
    const row = db.prepare(query).get(email);
    return row
}
const createUser = (username, email, age, password, role) => {
    const insert = db.prepare('INSERT INTO users (username, email, age, password, role) VALUES (?, ?, ?, ?, ?)');
    insert.run(username, email, age, password, role);
}
const updateUser = (id, data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map((key) => `${key} = ?`).join(' , ');
    const query = `UPDATE users SET ${setClause} WHERE id = ?`;
    return db.prepare(query).run(...values, id);
}
const deleteUser = (id) => {
    const query = `DELETE FROM users WHERE id = ?`;
    const stmt = db.prepare(query);
    return stmt.run(id);
}

const saveRefreshToken = (userId, refreshToken) => {
    const stmt = db.prepare(`UPDATE users SET refreshToken = ? WHERE id = ?`);
    return stmt.run(refreshToken, userId);
}

module.exports = {
    getUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
    saveRefreshToken
};