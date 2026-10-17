import { events } from '../data/data';
import { EventCard } from './EventCard';

export function Events() {
    
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