import { MapPin, Star, CreditCard } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { useEffect, useState } from 'react';
import { chatSession } from '../../service/AIModel';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import HotelInvoice from './HotelInvoice';
import { getPlaceImage } from '@/service/ImagesAPI';

const HotelOptionsCard = ({ hotel, startDate, days }: any) => {
    // const image = ['/HotelImages/img1.jpeg', '/HotelImages/img2.jpeg', '/HotelImages/img3.jpeg', '/HotelImages/img4.jpeg', '/HotelImages/img5.jpeg', '/HotelImages/img6.jpeg', '/HotelImages/img7.jpeg', '/HotelImages/img8.jpeg', '/HotelImages/img9.jpeg',];
    const [bookingUrl, setBookingUrl] = useState<string>('');
    // const [showInvoice, setShowInvoice] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    // let i = Math.floor(Math.random() * 8);
    const [image, setImage] = useState("");

    const fetchPlaceImage = async (placeName:string) => {
        const imageUrl = await getPlaceImage(placeName);
        if (imageUrl) {
          setImage(imageUrl || "");
        }
        return 'No Wikidata entity found';
    };

    useEffect(()=>{
        fetchPlaceImage(hotel.hotelName);
    },[])

    useEffect(() => {
        async function generateBookingUrl() {
            try {
                const response = await chatSession.sendMessage(
                    `Generate a MakeMyTrip hotel search URL for the hotel "${hotel.hotelName}" with the following parameters:
                    - Start date: ${startDate}
                    - Duration: ${days} days
                    - Use these fixed parameters:
                      - _uCurrency: INR
                      - reference: hotel
                      - rf: directSearch
                      - type: hotel
                    Return the response in this exact JSON format:
                    {
                      "hotelSearchURL": "https://www.makemytrip.com/hotels/hotel-listing/?checkin=MMDDYYYY&checkout=MMDDYYYY&locusId=CTDEL&locusType=city&city=CTDEL&country=IN&searchText=HOTEL_NAME&roomStayQualifier=2e0e&_uCurrency=INR&reference=hotel&rf=directSearch&type=hotel"
                    }`
                );
                const responseText = response.response.text();
                const urlData = JSON.parse(responseText);
                setBookingUrl(urlData.hotelSearchURL);
            } catch (error) {
                console.error('Error generating booking URL:', error);
                // Fallback URL if AI generation fails
                const fallbackUrl = `https://www.makemytrip.com/hotels/hotel-listing/?checkin=${startDate}&checkout=${startDate}&locusId=CTDEL&locusType=city&city=CTDEL&country=IN&searchText=${encodeURIComponent(hotel.hotelName)}&roomStayQualifier=2e0e&_uCurrency=INR&reference=hotel&rf=directSearch&type=hotel`;
                setBookingUrl(fallbackUrl);
            }
        }
        generateBookingUrl();
    }, [hotel.hotelName, startDate, days]);

    const handlePayment = async () => {
        // Initialize Razorpay
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: (hotel.price * days * 100), // amount in paise
            currency: "INR",
            name: "HolaTrip",
            description: `Hotel Booking at ${hotel.hotelName}`,
            image: "https://example.com/your_logo",
            handler: function (response: any) {
                setPaymentSuccess(true);
                console.log(response);
                
                // setShowInvoice(true);
            },
            prefill: {
                name: "User Name",
                email: "user@example.com",
                contact: "9999999999"
            },
            theme: {
                color: "#0EA5E9"
            }
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
    };

    return (
        <Card className="w-full cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
            <CardContent className="p-0">
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <img
                        src={image || '/tokyo.jpg'}
                        alt={hotel.hotelName}
                        className="w-full h-48 object-cover"
                    />
                </a>
                <div className="p-4">
                    <h3 className="font-semibold">{hotel.hotelName.substring(0, 30)}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{hotel.rating}-Star Hotel</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>
                            {hotel.hotelAddress.substring(0, 25)}...
                        </span>
                    </div>
                    <div className="mt-2 font-medium">$ {hotel.price} Per Night</div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className={`w-full my-2 ${paymentSuccess?('bg-green-600'):'bg-black'}`}>
                                {paymentSuccess ? 'View your booking' : 'Book Hotel with us'}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[80%] w-[80%] max-h-[90vh] overflow-y-auto">
                            {!paymentSuccess && (
                                <DialogHeader>
                                    <DialogTitle>Complete Your Hotel Booking</DialogTitle>
                                    <DialogDescription>
                                        Choose your payment method to complete the booking
                                    </DialogDescription>
                                </DialogHeader>
                            )}

                            <div className="grid gap-4 py-4">
                                {!paymentSuccess ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <CreditCard className="w-5 h-5 text-blue-600" />
                                                <div>
                                                    <p className="font-medium">Credit/Debit Card</p>
                                                    <p className="text-sm text-gray-500">Pay securely with Razorpay</p>
                                                </div>
                                            </div>
                                            <Button onClick={handlePayment}>
                                                Pay Now
                                            </Button>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            <p>Total Amount: ₹{hotel.price * days}</p>
                                            <p className="text-xs mt-1">*Including all taxes and fees</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full">
                                        <div className="p-4 bg-green-50 rounded-lg mb-4">
                                            <p className="text-green-600 font-medium">Payment Successful!</p>
                                            <p className="text-sm text-gray-600 mt-1">Your hotel has been booked successfully.</p>
                                        </div>
                                        <div className="w-full flex justify-center">
                                            <HotelInvoice 
                                                hotelDetails={hotel}
                                                startDate={startDate}
                                                days={days}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardContent>
        </Card>
    )
}

export default HotelOptionsCard