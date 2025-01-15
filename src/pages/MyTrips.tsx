import Footer from '@/components/custom/Footer'
import Navbar from '@/components/custom/Navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { db } from '@/service/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const MyTrips = () => {
    const navigate = useNavigate();

    const [myTrips,setMyTrips]=useState([])

    const getTripData = async (userEmail: string) => {
        try {
            const tripsRef = collection(db, 'AITrips');
            const q = query(tripsRef, where('userEmail', '==', userEmail));
            const querySnapshot = await getDocs(q);
            
            const trips = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            setMyTrips(trips);
            
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    };
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        const email = user?.email;
        getTripData(email);
    },[])
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className='my-16 mx-14 lg:px-16 py-4 min-h-screen'>
                <div className='flex justify-between px-2 items-center align-middle'>
                    <h1 className='text-3xl pl-4 font-semibold'>Your Trips</h1>
                    <Link to={'/planner-plan'}>
                        <Button className=" bg-black text-md text-white hover:bg-gray-800 px-6 py-6 rounded-lg shadow-lg items-center">
                            Create trip
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-8">
                    {myTrips.map((trip, index) => (
                        <Card key={index} className="overflow-hidden shadow-none cursor-pointer hover:scale-105 hover:shadow-md transition-all" onClick={()=>{navigate(`/view-trip/${trip.id}`)}}>
                            <CardContent className="p-0">
                                <div className="relative">
                                    <img
                                        // src={trip.tripData.locationInfo.imageUrl || '/paris.png'}
                                        src={'/paris.png'}
                                        alt={trip.tripData.location}
                                        className="w-full h-44 object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-medium mb-2">{trip.tripData.location}</h3>
                                    <div className='flex gap-6'>

                                        <p>🗓️ {trip.tripData.startDate}</p>
                                        <p>⌛ {trip.tripData.duration}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            <div className="w-full p-2">
                <Footer />
            </div>
        </div>
    )
}

export default MyTrips