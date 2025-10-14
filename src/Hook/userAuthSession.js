import { useEffect, useState } from "react";
import supabase from "../supabase/supabase-client";

export function useAuthSession() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        let mounted =true;
        supabase.auth.getSession().then(({ data }) => {
            if (!mounted) return;
            setSession(data.session ?? null);
            setLoading(false);
        });
        const { data: sub } =supabase.auth.onAuthStateChange((_e, s) => setSession(s ?? null));
        return () => { mounted = false; sub.subscription.unsubscribe(); };
    }, []);

    async function signOut() { await supabase.auth.signOut(); }

    return { session, loading, signOut };
}