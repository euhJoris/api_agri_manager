const express = require('express');
const app = express();
const pool = require('../db');
const newId = require('../utils/id_generator.js');

app.use(express.json()); 

class UserController {
    /**
     * The function `getUsers` retrieves all users from a database table named "users" using a SQL
     * query and returns the result as an array.
     * @returns The function `getUsers()` is returning an array of user objects.
     */
    async getUsers() {
        const users = await pool.query('SELECT * FROM users');
        return res.json(users.rows)
    }


    /**
     * The function `createUser` is an asynchronous function that inserts a new user into a database
     * table and returns the newly created user's information.
     * @param data - The `data` parameter is an object that contains the following properties:
     * @returns the rows of the newly created user from the database.
     */
    async createUser(data) {
        try {
            const id = newId(); // create userId which not exist in database
            const newUser = await pool.query(
                'INSERT INTO users (user_id, firstName, surName, email, phone, password) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
                [id, data.firstName, data.surName, data.email, data.phone, data.password]
            );
            return res.json(newUser.rows)
        } catch (err) {
            console.error(err.message);
        }
    }
    
    /**
     * The `updateUser` function updates a user's information in a database table and returns the
     * updated user's data.
     * @param data - The `data` parameter is an object that contains the updated user information. It
     * should have the following properties:
     * @returns the rows of the updated user from the database.
     */
    async updateUser(datas) {
        try {
            const data = JSON.parse(datas);
            const updatedUser = await pool.query(
                'UPDATE users SET firstName = $1, surName = $2, email = $3, phone = $4, password = $5 WHERE id = $6 RETURNING *', 
                [data.firstName, data.surName, data.email, data.phone, data.password, data.id]
            );
            return res.json("User", data.id, "modified")
        } catch (err) {
            console.error(err.message);
        }
    }


    /**
     * The above function deletes a user from a database table using their ID and returns the deleted
     * user's information.
     * @param id - The `id` parameter is the unique identifier of the user that you want to delete from
     * the database.
     * @returns the rows of the deleted user from the database.
     */
    async deleteUser(id) {
        try {
            const deletedUser = await pool.query(
                'DELETE FROM users WHERE id = $1 RETURNING *', 
                [id]
            );
            return res.json("User", data.id, "deleted")
        } catch (err) {
            console.error(err.message);
        }
    }
}