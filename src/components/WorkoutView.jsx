function formatSetsReps(sets, reps) {
    const s = sets ?? "";
    const r = reps ?? "";
    const isNum = v => typeof v === "number";

    if(isNum(s) && isNum(r)) return `${s}x${r}`;
    if (!s && r) return String(r);
    if (s && !r) return String(s);
    return `${s}${s && r ? " x " : ""}${r}`;
}

export default function WorkoutView({ workout }) {
    if (!workout) return <p className="text-gray-500">Nessun allenamento per questo giorno</p>

    return (
        <div className="border rounded p-4">
            <h2 className="text-lg font-semibold mb-3">{workout.label}</h2>
            <ul className="space-y-2">
                {workout.exercises.map((ex, i) => (
                    <li key={i} className="flex items-baseline justify-between border-b pb-2">
                        <div>
                            <div className="font-medium">{ex.name}</div>
                            {ex.note && <div className="text-xs text-gray-500">{ex.note}</div>}
                        </div>
                        <div className="tex-sm text-gray-700">{formatSetsReps(ex.sets, ex.reps)}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}