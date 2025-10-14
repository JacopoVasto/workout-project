import { useCallback, useEffect, useState } from "react";
import { listMyPrograms, createProgram } from "../API/programs";

export function usePrograms() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState(null);
    
    const refresh = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await listMyPrograms();
            setItems(data);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }, []);
    
    const handleCreate = useCallback(async (name) => {
        if (!name?.trim()) return;
        setCreating(true);
        setError(null);
        try {
            // crea un oggetto "fittizio" per feedback immediato
            const optimistic = { id: `tmp-${Date.now()}`, name, created_at: new Date().toISOString() };
            setItems((prev) => [optimistic, ...prev]);
            
            // crea davvero la scheda sul DB
            const created = await createProgram(name.trim());
            
            // sostituisce quella fittizia con quella reale
            setItems((prev) => [created, ...prev.filter(p => p.id !== optimistic.id)]);
        } catch (e) {
            setError(e);
            // rimuove eventuale oggetto fittizio in caso di errore
            setItems((prev) => prev.filter(p => !String(p.id).startsWith("tmp-")));
            throw e;
        } finally {
            setCreating(false);
        }
    }, []);
    
    useEffect(() => { refresh(); }, [refresh]);
    
    return { items, loading, creating, error, refresh, handleCreate };
    
}