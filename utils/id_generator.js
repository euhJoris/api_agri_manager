const { v4: build} = require("uuid")
const pool = require('../db');


const newId = () => {
    const idCheck = uuid()
    const checkId = pool.query(
        'SELECT * FROM users WHERE id = $1',
        [idCheck]
    )
    if (checkId.rowCount > 0) {
        return id()
    } else {
        return idCheck
    }
}
