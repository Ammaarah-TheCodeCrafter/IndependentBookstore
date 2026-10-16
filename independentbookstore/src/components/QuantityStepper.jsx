export function QuantityStepper({ value, onChange, min = 1, max = 20 }) {
    return(
        <div>
            <button type="button" onClick={() => onChange(Math.max(min, value -1))} disabled={value <= min} className="w-8 h-8 rounded-full border border-(--line)"> - </button>
            <span>  {value}  </span>
            <button onClick={() => onChange(Math.min(max, value +1))} disabled={value >= max} className="w-8 h-8 rounded-full border border-(--line)"> + </button>
        </div>
    );
}