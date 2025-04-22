import { getPlaceImage, getWikipediaTitle } from '@/service/ImagesAPI';
import { Card, CardContent } from '../ui/card'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MyTripsTripCard = ({trip}:any) => {
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState('');

    const fetchImageUrl = async () => {
        setImageUrl('');
        const wikiTitle = await getWikipediaTitle(trip?.tripData?.location);
        if (wikiTitle) {
          const image = await getPlaceImage(wikiTitle);
          setImageUrl(image || '');
        } else {
          setImageUrl('');
        }
    };

    useEffect(()=>{
        trip&&fetchImageUrl();
    },[])
    return (
        <Card className="overflow-hidden shadow-none cursor-pointer hover:scale-105 hover:shadow-md transition-all" onClick={() => { navigate(`/view-trip/${trip.id}`) }}>
            <CardContent className="p-0">
                <div className="relative">
                    <img
                        // src={trip.tripData.locationInfo.imageUrl || '/paris.png'}
                        src={imageUrl || '/contactImg.png'}
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
    )
}

export default MyTripsTripCard