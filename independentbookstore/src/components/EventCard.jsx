import { useState } from "react";
import { QuantityStepper } from "./QuantityStepper";

export function EventCard({ event }) {
    const [qty, setQty] = useState(1);
    
    return(
        <article className="border border-(--clay) rounded-lg transition duration-150 hover:shadow-xl/30 ">
            <div>
                <h3>{event.title}</h3>
                <p>Date: {event.date}</p>
                <p>Description: {event.description}</p>
                <div>
                    <QuantityStepper value={qty} onChange={setQty} />
                </div>
            </div>
        </article>
    );
}