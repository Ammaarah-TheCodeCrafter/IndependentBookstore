import { userState } from "react";

export function EventCard({ event }) {
    return(
        <article>
            <div>
                <h3>{event.title}</h3>
                <p>{event.date}</p>
                <p>{event.description}</p>
            </div>
        </article>
    );
}