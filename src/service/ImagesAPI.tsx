export const getPlaceImage = async (placeName: string) => {
    try {
        const response = await fetch(`http://35.154.208.120:8000/api/place-image/?place=${encodeURIComponent(placeName)}`);
        const data = await response.json();
        
        if (!data.imageUrl) {
            return null;
        }
        
        return data.imageUrl;
    } catch (error) {
        console.error('Error fetching place image:', error);
        return null;
    }
};