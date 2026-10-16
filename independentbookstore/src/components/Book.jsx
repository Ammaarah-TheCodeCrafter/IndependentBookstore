import { useState } from 'react';
import { books } from '../data/books';
import { BookCard } from './BookCard';
const genres = ['All', 'Fiction', 'Non-Fiction', 'Staff Picks'];

export function Book() {
    const [filter, setFilter] = useState("All");
    const filteredBooks = books.filter((book) => {
        return filter === "All" || book.genre === filter;
    });
    return(
        <section id="books" className="mx-auto max-w-[1100] px-5 py-10">
            <h2 className="text-4xl font-bold">Books</h2>
            <label htmlFor='genre'>Filter by genre: </label>
            <select id="genre" value={filter} onChange= {(event) => setFilter(event.target.value)} className={'rounded-full px-5 py-2.5 text-sm transition hover:bg-clay'}>
                <option value="All">All Books</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Staff Picks">Staff Picks</option>
            </select>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 p-5">
                {filteredBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </section>
    );
}
