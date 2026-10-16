import { useState } from "react";
import { QuantityStepper } from "./QuantityStepper";

export function BookCard({ book }) {
    const [qty, setQty] = useState(1);
    
    return(
        <article  className="border border-(--clay) rounded-lg transition duration-150 hover:shadow-xl/30 ">
            <div>
                <h3 className="text-2xl font-bold">{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>Description: {book.description}</p>
                <p>R{book.price}</p>
                <div>
                    <QuantityStepper value={qty} onChange={setQty} />
                </div>
            </div>
        </article>
    );
}