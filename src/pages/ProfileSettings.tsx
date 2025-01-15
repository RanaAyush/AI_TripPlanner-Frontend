import Footer from '@/components/custom/Footer'
import Navbar from '@/components/custom/Navbar'
import { Button } from '@/components/ui/button';
import userImage from '../assets/user.png'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSettings = () => {
    const [user, setUser]:any = useState(null);
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }, []);
      const navigate = useNavigate(); 
      const handleLogout = (): void => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className='mt-16 mb-10 mx-14 lg:px-16 py-4 min-h-screen'>
                <div className='px-2 items-center align-middle'>
                    <h1 className='text-3xl pl-4 font-semibold'>Profile Settings</h1>
                    <h3 className='pl-4 mt-2 text-lg text-gray-500'>Edit your Travel Profile.</h3>
                </div>
                <div className=' flex justify-between items-center align-middle my-10'>
                    <div className='flex gap-4'>
                        <img src={user?.picture || userImage} alt="Userimage" className='w-16 h-16 rounded-full object-contain p-2' />
                        <div>
                            <h3 className='text-lg font-semibold'>{user?.name}</h3>
                            <p className='text-sm text-gray-400'>{user?.email}</p>
                        </div>
                    </div>
                    <Button onClick={handleLogout} className=" bg-black text-md text-white hover:bg-gray-800 px-6 py-6 rounded-lg shadow-lg items-center">
                        Delete Account
                    </Button>

                </div>
            </div>
            <div className="w-full p-2">
                <Footer />
            </div>
        </div>
    )
}

export default ProfileSettings