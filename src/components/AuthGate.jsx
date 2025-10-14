import { useAuthSession } from "../Hook/userAuthSession";
import { Link } from "react-router";

export default function AuthGate({ children }) {
    const { session, loading } = useAuthSession();
    if (loading) return <div className="p-4 text-gray-500">Caricamento...</div>
    if (!session) return (
        <div className="p-6 text-center space-y-3">
            <p className="text-gray-700">Devi essere autenticato per vedere questa pagina</p>
            <Link to="/auth" className="inline-block bg-teal-600 text-white px-4 py-2">Vai al login</Link>
        </div>
    )
    return children;
}