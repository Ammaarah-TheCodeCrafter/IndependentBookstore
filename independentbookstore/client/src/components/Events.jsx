import { useState, useEffect } from "react";
import { EventCard } from './EventCard';

export function Events() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('https://independentbookstore-api.onrender.com/api/events').then((response) => {
            if(!response.ok) {
                throw new Error('Failed to fetch events');
            }
            return response.json();
        })
        .then((data) => setEvents(data))
        .catch((error) => {
            console.error('Error fetching events: ', error);
        });
    }, []);
    
    return(
        <section id="events">
            <h2 className="text-4xl font-bold">Events</h2>
            <div  className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 p-5">
                {events.map((event) => (
                    <EventCard key={event.id} event={event}/>
                ))}
            </div>
        </section>
    );
}