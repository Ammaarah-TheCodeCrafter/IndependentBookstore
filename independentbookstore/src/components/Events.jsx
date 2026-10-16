import { events } from '../data/events';
import { EventCard } from './EventCard';

export function Events() {
    
    return(
        <section id="events">
            <h2>Events</h2>
            <div>
                {events.map((event) => (
                    <EventCard key={event.id} event={event}/>
                ))}
            </div>
        </section>
    );
}