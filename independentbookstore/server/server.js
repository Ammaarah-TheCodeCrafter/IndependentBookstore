const express = require('express');
const pool = require('./db');
const cors = require('cors');

const app = express();
app.use(cors());

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});