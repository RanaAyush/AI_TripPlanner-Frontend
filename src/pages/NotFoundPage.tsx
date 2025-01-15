import Footer from '@/components/custom/Footer'
import Navbar from '@/components/custom/Navbar'
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className='my-40'>
                <div className="flex items-center justify-center bg-white p-4">
                    <div className="text-center space-y-8 flex justify-between">
                        {/* Desert illustration with 404 */}
                        <div className="relative w-96 h-64 mx-auto ">
                            <img src="/NotFoundImg.png" alt="" />
                        </div>

                        {/* Error message */}
                        <div className="space-y-4 mt-10">
                            <h1 className="text-5xl font-bold text-gray-900">Oops!</h1>
                            <p className="text-gray-600">We could not find the page you were looking for</p>
                        {/* Go home button */}
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Go home
                        </Link>
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

export default NotFoundPage