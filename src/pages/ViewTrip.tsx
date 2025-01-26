import { useEffect, useState } from 'react'
import Footer from '@/components/custom/Footer'
import Navbar from '@/components/custom/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/service/firebase'
import { ChevronLeft } from 'lucide-react';
import { TiUserAdd } from "react-icons/ti";
import { IoMdHeart } from "react-icons/io";
import { HiOutlineDownload } from "react-icons/hi";
import { RiShareFill } from "react-icons/ri";
import { Card } from '@/components/ui/card';
import SegmentedMenu from '@/components/custom/SegmentMenu'
import TripDetails from '@/components/custom/TripDetails'
import CityInfoSection from '@/components/custom/CityInfoSection'
import TopSights from '@/components/custom/TopSights'
import InviteDialog from '@/components/custom/InviteDialog'

// interface TripData {
//     id: string;
//     userEmail: string;
//     userSelection: [],
//     tripData:[]
// }

// interface TravelCardProps {
//     destination: string;
//     startDate: string;
//     endDate: string;
//     persons: number;
//     imageUrl?: string;
// }


const ViewTrip = () => {

    const { id } = useParams();
    const [tripData, setTripData]:any = useState({})
    const [activeTab, setActiveTab] = useState("Itinerary");
    const [openInvite, setOpenInvite] = useState(false);
    const [isTripLiked, setTripLiked] = useState(false);

    const navigate = useNavigate();

    const toggleLike = () => {
        setTripLiked(!isTripLiked);
    }

    useEffect(() => {
        if (id) {
            getTripData(id);
        }
    }, [id]);

    const getTripData = async (id: string) => {
        try {
            const docRef = doc(db, 'AITrips', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log(docSnap.data());
                setTripData(docSnap.data());
            } else {
                console.log('Document does not exist');
                navigate('/not-found')
            }
        } catch (error) {
            console.error('Error fetching trip data:', error);
        }
    };
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className='mb-8 mt-14 mx-8'>
                <Card className="w-full overflow-hidden bg-gray-100 rounded-xl">
                    <div className="relative h-64 md:h-[35rem]">
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(/TripView.png)`,
                                backgroundPosition: 'center 70%'
                            }}
                        />

                        {/* Overlay for text contrast */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />

                        {/* Top Navigation Bar */}
                        <div className="relative flex justify-between items-center p-4 text-white">
                            <button className="p-2 hover:bg-black/20 rounded-full transition" onClick={() => { navigate('/') }}>
                                <ChevronLeft size={24} />
                            </button>
                            <InviteDialog
                                open={openInvite}
                                onOpenChange={setOpenInvite}
                            />
                            <div className="flex items-center gap-5">
                                <TiUserAdd className='text-xl w-10 h-10 bg-white/20 backdrop-blur-sm text-white/90 rounded-full p-2 hover:bg-white/30 transition-all cursor-pointer' onClick={() => setOpenInvite(true)} />
                                <IoMdHeart className={`text-xl w-10 h-10 bg-white/20 backdrop-blur-sm ${isTripLiked ? 'text-red-500' : 'text-white/90'} rounded-full p-2 hover:bg-white/30 transition-all cursor-pointer`} onClick={() => { toggleLike() }} />
                                <HiOutlineDownload className='text-xl w-10 h-10 bg-white/20 backdrop-blur-sm text-white/90 rounded-full p-2 hover:bg-white/30 transition-all cursor-pointer' />
                                <div className=' flex gap-2 text-xl bg-white/20 backdrop-blur-sm text-white/90 rounded-full p-3 hover:bg-white/30 transition-all cursor-pointer ' onClick={() => setOpenInvite(true)}>
                                    <RiShareFill />
                                    <span className='text-sm font-semibold'> Share</span>
                                </div>
                            </div>
                        </div>

                        {/* Destination Title and Trip Details */}
                        <div className="absolute bottom-10 left-10 text-white">
                            <h1 className="text-4xl md:text-8xl font-semibold font-serif mb-4">{tripData?.tripData?.location}</h1>
                            <div className="flex items-center gap-2 text-xs md:text-md">
                                <div className='bg-white/15 backdrop-blur-lg py-1 text-white/90 rounded-full px-2'>
                                    <span>{new Date(tripData?.tripData?.startDate).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })}</span>
                                    <span className="mx-2">→</span>
                                    <span>{new Date(new Date(tripData?.tripData?.startDate).getTime() + (tripData.userSelection?.days || 2 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })}</span>
                                </div>
                                <div className='bg-white/15 backdrop-blur-lg py-1 text-white/90 rounded-full px-2'>
                                    <span>{tripData.userSelection?.people} Person</span>

                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            <div className='px-8 mb-4'>
                <SegmentedMenu
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />
            </div>
            {activeTab === 'Itinerary' && tripData && Object.keys(tripData).length > 0 &&
                <>
                    <div className='px-12 mb-4 mt-4 flex flex-col gap-4'>
                        <h2 className='text-3xl font-semibold'>Your trip to {tripData?.tripData?.location} for {tripData?.tripData?.duration}.</h2>

                    </div>
                    <div className='my-4'>
                        <TripDetails tripData={tripData} />
                    </div>
                </>
            }

            {activeTab === 'About' &&
                <>
                    <div className='px-12 mb-4 mt-4 flex flex-col gap-4'>
                        <h2 className='text-3xl font-semibold'>About {tripData?.tripData?.location}.</h2>
                        <p className='text-lg text-justify'>{tripData?.tripData?.locationInfo?.description}</p>
                    </div>
                    <div className='my-4 w-full grid sm:grid-cols-1 md:grid-cols-2'>
                        <div>
                            <CityInfoSection locationInfo={tripData?.tripData?.locationInfo} activitiesToEnjoy={tripData?.tripData?.activitiesToEnjoy} />
                        </div>
                        <div className='lg:max-w-2xl md:max-w-2xl max-w-[25rem] flex  items-start mt-6 mx-2 md:mx-auto'>
                            <img src="/paris.png" alt="paris" />
                        </div>
                    </div>
                </>
            }

            {activeTab === 'Explore' &&
                <>
                    <div className='px-12 mb-4 mt-4 ml-16'>
                        <h2 className='text-3xl font-semibold'>Explore Top Sights in {tripData?.tripData?.tripDetails?.location}.</h2>
                    </div>
                    <TopSights />
                </>
            }

            <div className="w-full p-2">
                <Footer />
            </div>
        </div>
    )
}

export default ViewTrip;