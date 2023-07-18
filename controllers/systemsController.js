const newId = require('../utils/id_generator.js');
const pool = require('../db')
const newToken = require('../utils/token_generator.js');
// const newToken = require('../utils/token_generator.js');

class SystemController {
    async getSystems(res){
        try {
            const users = await pool.query('SELECT * FROM systems');
            return res.json(users.rows)
        } catch (err) {
            console.error(err.message);
        }
    }

    async createSystemToUser(req, res) {
        try { 
            const {name} = req.body
            const id = await newId()
            const newSystem = await pool.query(
                'INSERT INTO systems(system_id, system_name) VALUES ($1, $2) RETURNING *',
                [id, name]
            )
            return res.json(newSystem.rows)
        } catch (err) {
            console.error(err.message);
        }
    }

    async associateSystemToUserWithToken (req, res) {
        try {
            const {system_id, user_id} = req.body;
            // const userSystemToken = await newToken()
            // console.log(userSystemToken);
            await newToken()
                .then(response =>response.json())
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ error: 'Une erreur s\'est produite.' });
                });

            // const token =newToken()
            // console.log(token);

            const updateSystem = await pool.query(
                'UPDATE systems SET associated_to_user = $1, working_authorization_token+ $2 WHERE system_id = $3 RETURNING *',
                [user_id, ressult.token,  system_id]
            )
            return res.json(updateSystem.rows)
        } catch (err) {
            console.error(err.message);
        }
    }
}

module.exports = SystemController

// (async () => {
//         try {
//                 const r = await newToken()
//                 console.log(r);
//             } catch (error) {
//             console.error(error);
//             }
//     })(); 