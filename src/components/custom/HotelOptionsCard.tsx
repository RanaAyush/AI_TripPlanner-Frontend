import { MapPin, Star } from 'lucide-react'
import { Card, CardContent } from '../ui/card'

const HotelOptionsCard = ({hotel, index}:any) => {
    const image = ['/HotelImages/img1.jpeg','/HotelImages/img2.jpeg','/HotelImages/img3.jpeg','/HotelImages/img4.jpeg','/HotelImages/img5.jpeg','/HotelImages/img6.jpeg','/HotelImages/img7.jpeg','/HotelImages/img8.jpeg','/HotelImages/img9.jpeg',];

    let i = Math.floor(Math.random() * 8);
    
    // Generate booking URL using the hotel name
    // Use a more specific query format to target the exact hotel
    const bookingUrl = `https://www.makemytrip.com/hotels/hotel-listing/?checkin=04062025&checkout=04072025&locusId=CTDEL&locusType=city&city=CTDEL&country=IN&searchText=${encodeURIComponent(hotel.hotelName)}&roomStayQualifier=2e0e&sort=relevance`;
    
    return (
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="block">
            <Card className="w-full cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
                <CardContent className="p-0">
                    <img
                        src={image[(index*i+index)%8] || '/tokyo.jpg'}
                        alt={hotel.hotelName}
                        className="w-full h-48 object-cover"
                    />
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
                    </div>
                </CardContent>
            </Card>
        </a>
    )
}

export default HotelOptionsCard