export default function DaysDropdown({ value, onChange, options }) {
    return (
        <div>
            <select 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="border rounded p-2 w-full"
            >
            <option value="" disabled>Scegli il giorno</option>
            {Object.entries(options).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
            ))}
            </select>
        </div>
    );
}