const { v4: uuid} = require("uuid")
const pool = require('../db');

/**
 * The function generates a new unique ID by checking if it already exists in the database and
 * recursively calling itself if necessary.
 * @returns The function `newId` returns a unique ID generated by the `uuid()` function if it is not
 * already present in the `users` table. If the generated ID already exists in the table, the function
 * recursively calls itself to generate a new ID.
 */
async function newId (){
    const idCheck = uuid()
    const checkId = await pool.query(
        'SELECT * FROM users WHERE user_id = $1',
        [idCheck]
    )
    if (checkId.rowCount > 0) {
        return newId()
    } else {
        return idCheck
    }
}

module.exports = newId