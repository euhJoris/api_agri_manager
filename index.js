const pool = require('./db');
const l = require('lodash');

// MODELS
const User = require('./models/users')

// CONTROLLERS
const UserController = require('./controllers/usersController')
// ROUTES
const userRoutes = require('./routes/usersRoutes')

// app.use(express.json()); // -> req body

// ROUTES

// show all users 
// app.get('/users', async (req, res) => {
//     try {
//         const allUsers = await pool.query("SELECT * FROM users");
//         res.json(allUsers.rows);

//         allUsers.rows.forEach(user => {
//             console.table(user);
//         });

//     } catch (err) {
//         console.error(err.message);
//     }
// });


// // add a new user
// app.post('/newUser', async (req, res) => {
//     try {
//         const {name, surname, email, phone, pwd} = req.body;
//         const newUser = await pool.query(
//             "INSERT INTO users (name, surname, email, phone_number, password) VALUES  ($1, $2, $3, $4, $5) RETURNING *", 
//             [name, surname,email, phone, pwd])
//         ;
//         console.log(req.body);
//         res.json(newUser.rows);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

// // get a user
// app.get('/users/:id', async(req, res) => {
//     const {id} = req.params;
//     try {
//         const user = await pool.query(
//             "SELECT * FROM users WHERE user_id = $1", 
//             [id]
//         );
//         res.json(user.rows);
//         console.table(user.rows)
//         console.log(req.params);
//     } catch (err) {
//         console.error(err.message);
//     }
// })

// // update user infos
// app.put('/users/:id', async(req, res) => {
//     const {id} = req.params;
//     const {name} = req.body;
//     try {
//         const updatedUser = await pool.query(
//             "UPDATE users SET name = $1 WHERE user_id = $2", 
//             [name, id]
//         );
//         res.json("user " + id +" updated");
//     } catch (err) {
//         console.error(err.message);
//     }
// });

app.listen(5000, () => {
    console.log("listening on port 5000");
});