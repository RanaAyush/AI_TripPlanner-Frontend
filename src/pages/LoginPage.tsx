import Footer from '@/components/custom/Footer'
import Navbar from '@/components/custom/Navbar'
import { Button } from '@/components/ui/button';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast"


const LoginPage = () => {
    const { toast } = useToast()

    const navigate = useNavigate();
    // const [user, setUser] = useState(null);
    const LoginHandle = useGoogleLogin({
        onSuccess: (res) => setUserInfo(res),
        onError: (err) => {
            console.log(err);
        }
    });
    const setUserInfo = (tokenInfo: any) => {
        try {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`, {
                headers: {
                    Authorization: `Bearer ${tokenInfo?.access_token}`,
                    Accept: 'Application/json'
                }
            }).then((res) => {
                localStorage.setItem('user', JSON.stringify(res.data));
                toast({
                    title:"Success",
                    description: "Yay! You have Logined Successfully 😄",
                  })
                navigate('/');
            })
        } catch (error) {
            console.log(error);

        }
    }
    const handleGoogleSignIn = () => {
        try {
            const user = localStorage.getItem('user');
            if (user) {
                return;
            }
            LoginHandle();
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className='flex-1 flex items-center justify-center my-44'>
                <div className="max-w-md w-full px-6">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                        <p className="text-gray-600">Sign in to continue your journey</p>
                    </div>

                    <div className="space-y-4">
                        <Button
                            onClick={handleGoogleSignIn}
                            className="w-full flex items-center justify-center gap-3 py-6"
                        >
                            <FcGoogle />

                            Continue with Google
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full p-2">
                <Footer />
            </div>
        </div>
    )
}

export default LoginPage