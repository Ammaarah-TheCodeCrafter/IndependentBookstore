const express = require('express');
const pool = require('./db');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(session({
    store: new pgSession({
        pool,
        createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: false, 
        sameSite: 'lax'
    },
}));

const PORT = 3000;

app.get('/', (req , res) => {
    res.send('Independent Bookstore API is running!');
});

app.get('/test-db', async (req , res) => {
    try{
        const result = await pool.query('SELECT version()');
        res.send('Database connected successfully!');
    }catch(error){
        console.error('Database connection failed.', error);
        res.status(500).send('Database connection failed. Check the terminal');
    }
});

app.get('/api/books', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM books ORDER BY title'
        );

        res.json(result.rows);
    }catch (error) {
        console.error('Error fetching books: ', error);
        res.status(500).json({
            message: 'Failed to fetch books',
        });
    }
});

app.get('/api/events', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM events ORDER BY date'
        );

        res.json(result.rows);
    }catch (error) {
        console.error('Error fetching events: ', error);
        res.status(500).json({
            message: 'Failed to fetch events',
        });
    }
});

app.post('/api/login', async (req, res) => {
    try{
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required.',
            });
        }

        const result = await pool.query(
            'SELECT id, name, email, password_hash FROM users WHERE email = $1',
            [email.trim().toLowerCase()]
        );

        const user = result.rows[0];
        if(!user || !(await bcrypt.compare(password, user.password_hash))){
            return res.status(401).json({
                message: 'Invalid email or password.',
            });
        }

        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        res.json({
            message: 'Login successful.',
            user: req.session.user,
        });

    }catch (error) {
        console.error('Login error: ', error.message);
        res.status(500).json({ message: 'Unable to log in.'});
    }
});

app.post('/api/logout', (req, res) => {
    req.session.destroy((error) => {
        if(error) {
            return res.status(500).json({
                message: 'Unable to log out.',
            });
        }

        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out successfully.'});
    });
});

app.get('/api/me', (req, res) => {
    if(!req.session.user){
        return res.status(401).json({
            message: 'Not logged in.',
        });
    }

    res.json({ user: req.session.user});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post('/api/signup', async (req, res) => {
    try{
        const { name, email, password } = req.body;

        if (!name || !email || !password){
            return res.status(400).json({
                message: 'All fields are required.',
            });
        }

        if (password.length < 8){
            return res.status(400).json({
                message: 'Password must be at least 8 characters.',
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);
        const result = await pool.query(
        `INSERT INTO users (name, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id, name, email`,
        [name.trim(), email.trim().toLowerCase(), passwordHash]
    );

    req.session.user = result.rows[0];

    res.status(201).json({
        message: 'Account created successfully.',
        user: result.rows[0],
    });
    } catch (error) {
        if(error.code ==='23505'){
            return res.status(409).json({
                message: 'Email is already registered.',
            });
        }

        console.error('Signup error: ', error.message);
        res.status(500).json({ message: 'Unable to create account'});
    }

});