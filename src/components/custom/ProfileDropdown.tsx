import { useState, useRef, useEffect } from 'react';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { MdCardTravel } from 'react-icons/md';
import userImage from '../../assets/user.png'
import { useNavigate } from 'react-router-dom';

// Define types for user
interface User {
    id: string;
    picture?: string;
    name?: string;
    email?: string;
    family_name: string;
    given_name: string;
    verified_email: boolean;
}

// Define props interface if needed
interface ProfileDropdownProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, setUser }) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = (): void => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className="cursor-pointer w-10 h-10"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                {user?.picture ?
                    <img
                        src={user?.picture}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                    /> :

                    <img
                        src={userImage}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                    />
                }
            </div>

            {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold">{user?.name || "User name"}</p>
                        <p className="text-xs text-gray-500">{user?.email || "user@email.com"}</p>
                    </div>

                    <div className="py-2">
                        <button
                            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                            onClick={() => { navigate('/my-trips') }}
                        >
                            <MdCardTravel className="text-gray-500" />
                            My trip
                        </button>

                        <button
                            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                            onClick={() => { navigate('/profile-settings') }}
                        >
                            <FiSettings className="text-gray-500" />
                            Settings
                        </button>

                        <button
                            onClick={handleLogout}
                            className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-3"
                        >
                            <FiLogOut className="text-red-500" />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;