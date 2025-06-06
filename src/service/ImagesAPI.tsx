export const getPlaceImage = async (placeName: string) => {
    try {
        const response = await fetch(`https://13.232.2.55/api/place-image/?place=${encodeURIComponent(placeName)}`);
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