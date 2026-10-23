const pool = require('./db');

async function seedDatabase(){
    try {
        const { books, events } = await import('../src/data/data.js');

        for(const book of books) {
            await pool.query(
                `INSERT INTO books (id, title, author, genre, price, description)
                VALUES ($1, $2, $3, $4, $5, $6) 
                ON CONFLICT (id) DO NOTHING`,
                [
                    book.id,
                    book.title,
                    book.author,
                    book.genre,
                    book.price,
                    book.description,
                ]
            );
        }

        for(const event of events){
            await pool.query(
                `INSERT INTO events (id, title, date, description)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (id) DO NOTHING`,
                [
                    event.id,
                    event.title,
                    event.date,
                    event.description,
                ]
            );
        }

        console.log(`Successfully seede ${books.length} books and ${events.length} events.`);
    } catch (error){
        console.error('Error seeding database: ', error);
        process.exitCode = 1;
    } finally {
        await pool.end();
    }
}

seedDatabase();