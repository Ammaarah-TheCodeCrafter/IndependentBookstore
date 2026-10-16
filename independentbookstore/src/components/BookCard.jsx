import { userState } from "react";
import { QuantityStepper } from "./QuantityStepper";

export function BookCard({ book }) {
    
    return(
        <article>
            <div>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>{book.description}</p>
                <p>R{book.price}</p>
                <div>
                    <QuantityStepper value={book.quantity} onChange={book.setQuantity} />
                </div>
            </div>
        </article>
    );
}