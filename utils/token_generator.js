const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const pool = require('../db')

/**
 * The function generates a new token and secret key pair for a user and system, ensuring that the
 * token is unique in the database.
 * @param user_id - The `user_id` parameter represents the ID of the user for whom the token is being
 * generated. It is used to identify the user associated with the token.
 * @param system_id - The `system_id` parameter is used to identify the system for which the token is
 * being generated. It could be a unique identifier or a reference to a specific system in your
 * application.
 * @returns an object with two properties: "token" and "key". The "token" property contains the
 * generated JWT token, and the "key" property contains the secret key used to sign the token.
 */
async function newToken (user_id, system_id){
    const secretKey = crypto.randomBytes(8).toString('hex');
    const token = jwt.sign({user_id, system_id}, secretKey)
    const tokenCheck = await pool.query(
        'SELECT * FROM systems WHERE working_authorisation_token = $1',
        [token]
    );
    if (tokenCheck.rowCount > 0){
        return newToken()
    }else {
        return token
    }
}

/* `(async () => { ... })();` is an immediately invoked async function expression (IIFE). It is a way
to define and immediately execute an asynchronous function. */
// (async () => {
//     try {
//         console.log(await newToken("fg14hhg1h3g2h", "hgj17c6"));
//         } catch (error) {
//         console.error(error);
//         }
// })(); 

module.exports = newToken