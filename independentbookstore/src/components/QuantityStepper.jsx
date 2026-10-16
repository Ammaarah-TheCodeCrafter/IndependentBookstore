export function QuantityStepper({ value, onChange, min = 1, max = 20 }) {
    return(
        <div>
            <button onClick={() => onChange(Math.max(min, value -1))}> - </button>
            <span>{value}</span>
            <button onClick={() => onChange(Math.min(max, value +1))}> + </button>
        </div>
    );
}