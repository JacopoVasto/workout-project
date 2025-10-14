import { useState } from "react";
import { usePrograms } from "../../Hook/usePrograms";

export default function Programs() {
    const { items, loading, creating, error, handleCreate } = usePrograms();
    const [name, setName] = useState("");

    return (
        <div className="max-w-xl mx-auto space-y-6 p-4">
            <h1 className="text-2xl font-bold"> Le mie Schede</h1>

            <div className="flex gap-2">
                <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome nuova scheda"
                    className="border p-2 rounded flex-1"
                />
                <button
                onClick={async () => { await handleCreate(name); setName(""); }}
                disabled={creating || !name.trim()}
                className="bg-teal-600 disabled:opacity-50 text-white px-4 rounded"
                >
                    {creating ? "..." : "+"}
                </button>
            </div>
            {loading && <p className="text-gray-500">Caricamento...</p>}
            {error && <p className="text-red-600 text-sm"> {String(error.message || error)}</p>}

            <ul className="space-y-2">
                {items.map((p) => (
                    <li key={p.id} className="border rounded p-2">
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-gray-500">
                            {new Date(p.created_at).toLocaleDateString()}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}