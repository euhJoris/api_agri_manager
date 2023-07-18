const newId = require('../utils/id_generator.js');
const pool = require('../db')

class UsersController {
    /**
     * The function `getUsers` retrieves all users from a database table named "users" using a SQL
     * query and returns the result as an array.
     * @returns The function `getUsers()` is returning an array of user objects.
     */
    async getUsers(req, res) {
        const users = await pool.query('SELECT * FROM users');
        return res.json(users.rows)
        // console.table(users.rows)
    } 


    /**
     * The function `createUser` is an asynchronous function that inserts a new user into a database
     * table and returns the newly created user's information.
     * @returns the rows of the newly created user from the database.
     */
    async createUser(req, res) {
        try {
            const id = await newId() //On attend qu la fonction newId() finisse d'être exécutée
            
            // AJOUTER DES CHECkS POUR L,EMAIL' HASHER LE PWD ET CONTROLER LE NUMÉRO

            const {name, surname, email, phone, pwd} = req.body;
            // const data = req.body
            const newUser = await pool.query(
                "INSERT INTO users (user_id, name, surname, email, phone_number, password) VALUES  ($1, $2, $3, $4, $5, $6) RETURNING *", 
                [id, name, surname, email, phone, pwd])
            ;
            // const {me} = req.body
            res.json(newUser.rows);
            // console.log(req.body);
        } catch (err) {
            console.error(err.message);
        }
    }
    


    /**
     * The function searches for a user in the database based on their ID and returns the user's
     * information in JSON format.
     * @returns The searchUser function is returning a JSON response containing the rows returned from
     * the database query.
     */
    async searchUser(req, res) {
        try {
            const id = req.params.id
            const searchUser = await pool.query(
                'SELECT * FROM users WHERE user_id = $1', 
                [id]
            );
            return res.json(searchUser.rows)
            console.table(searchUser.rows)
        } catch (err) {
            console.error(err.message);
        }   
    }

    /**
     * The `updateUser` function updates a user's information in a database table and returns the
     * updated user's data.
     * @returns the rows of the updated user from the database.
     */
    async updateUser(req, res) {
        try {
            // const data = JSON.parse(datas);
            const data = req.body; 
            const updatedUser = await pool.query(
                'UPDATE users SET name = $1, surname = $2, email = $3, phone_number = $4, password = $5 WHERE user_id = $6', 
                [data.name, data.surname, data.email, data.phone_number, data.pwd, data.id]
            );
            return res.json("User modified")
            console.table(updatedUser.rows)
        } catch (err) {
            console.error(err.message);
        }
    }


    /**
     * The above function deletes a user from a database table using their ID and returns the deleted
     * user's information.
     * @returns the rows of the deleted user from the database.
     */
    async deleteUser(req, res) {
        try {
            const id = req.params.id
            const deletedUser = await pool.query(
                'DELETE FROM users WHERE user_id = $1 RETURNING *', 
                [id]
            );
            return res.json("User " +id + " deleted")
        } catch (err) {
            console.error(err.message);
        }
    }
}

module.exports = UsersController;