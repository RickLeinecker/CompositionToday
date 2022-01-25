import { useState } from 'react';
import { useAuthContext } from '../../FirebaseAuth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function useLogout() {
    // Note: remove the below comments when you use error and currentUser somewhere
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState<string>("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { currentUser, logoutUser } = useAuthContext();
    const navigate = useNavigate();

    async function handleLogout() {
        setError('');
        try {
            await logoutUser();
            navigate("/registration");
        } catch {
            setError("Failed to log out");
        }
    }

    return { handleLogout };
}