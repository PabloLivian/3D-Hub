import { useAuth } from '../hooks/useAuth';
import CompleteProfile from './CompleteProfile';

const RoleChecker = () => {
    const { user } = useAuth();

    // Logic: If user is logged in (exists) AND valid (not null)
    // BUT missing the 'role' property in user_metadata
    // THEN show the CompleteProfile modal.
    //
    // Note: user_metadata is usually an object. If it's empty, role is undefined.

    if (user && !user.user_metadata?.role) {
        return <CompleteProfile user={user} />;
    }

    return null;
};

export default RoleChecker;
