import { useEffect, useState } from 'react';
import { db } from '@/service/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { chatSession } from '@/service/AIModel';
import RecommendationComponent from './RecommendationComponent';

const Recommendations = () => {
    const [userSelection, setUserSelection]: any = useState([]);
    const [recommendations, setRecommendations]: any = useState([]);
    const [loading, setLoading] = useState(false);
    const [userEmail, setUserEmail] = useState({});

    const GenerateTripSuggestions = async () => {
        if (userSelection.length === 0) return;

        setLoading(true);
        try {
            const prompt = `Based on the user's previous trip selections: ${JSON.stringify(userSelection)}, 
            please generate 3 recommended destinations with the following details for each:
            1. Hotel recommendations (name, price range, brief description)
            2. Activity recommendations (name, brief description)
            3. Best time to visit
            4. Approximate budget
            Return the data as an array of objects with these fields: location, imageUrl, hotels (array), activities (array), bestTimeToVisit, budget.`;

            const res = await chatSession.sendMessage(prompt);
            const text = res.response.text();

            try {
                // Try direct JSON parsing
                const jsonData = JSON.parse(text);
                setRecommendations(jsonData);
            } catch (e) {
                // If direct parsing fails, try to extract JSON from the text
                console.log("Direct parsing failed, trying to extract JSON");
                const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\[\s*\{[\s\S]*\}\s*\]/);
                if (jsonMatch) {
                    const extractedJson = jsonMatch[1] || jsonMatch[0];
                    try {
                        const jsonData = JSON.parse(extractedJson);
                        setRecommendations(jsonData);
                        console.log("Recommendations extracted:", jsonData);
                    } catch (e2) {
                        console.error("Failed to parse extracted JSON:", e2);
                    }
                } else {
                    console.error("Failed to extract JSON from response");
                }
            }
        } catch (error) {
            console.error("Error generating recommendations:", error);
        } finally {
            setLoading(false);
        }
    };

    const getTripData = async (userEmail: string) => {
        if (!userEmail) return;

        try {
            const tripsRef = collection(db, 'AITrips');
            const q = query(tripsRef, where('userEmail', '==', userEmail));
            const querySnapshot = await getDocs(q);

            const Trips = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...(doc.data() as any)
            }));

            if (Trips.length > 0) {
                const userSelections = Trips.filter(trip => trip.userSelection).map(trip => trip.userSelection);
                setUserSelection(userSelections.slice(0, 5));
            }
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    };

    useEffect(() => {
        if (userSelection.length > 0) {
            GenerateTripSuggestions();
        }
    }, [userSelection]);

    useEffect(() => {
        const usert = localStorage.getItem('user');
        const user = usert ? JSON.parse(usert) : null;
        setUserEmail(user);

        const email = user?.email;
        if (email) {
            getTripData(email);
        }
    }, []);

    return (
        <>
            <div className='my-16 mx-14 lg:px-16 py-4 max-h-screen'>
                <div className='flex justify-between px-2 items-center align-middle gap-4'>
                    <h1 className='text-4xl pl-4 font-semibold'>Recommended Trips and Hotels</h1>
                    <Link to={'/planner-plan'}>
                        <Button className="bg-black text-md text-white hover:bg-gray-800 px-6 py-6 rounded-lg shadow-lg items-center">
                            Create trip
                        </Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                    <div className="flex flex-col items-center gap-4">
                      <div className="text-5xl animate-spin-slow">⌛</div>
                      <p className="text-gray-600 font-medium">Loading recommendations...</p>
                    </div>
                  </div>                  
                  
                ) : recommendations && recommendations.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-8">
                        {recommendations.map((destination: any, index: number) => (
                            <RecommendationComponent key={index} destination={destination} />
                        ))}
                    </div>
                ) : userEmail ? (
                    <div className="text-center py-12">
                        <p>No recommendations available. Try creating a trip first!</p>
                    </div>
                ) : (
                    <div className="flex justify-between text-center py-12">
                        <p>Please Login to see your Recommendations !</p>
                        <Link to="/login">
                            <Button className="w-full py-2">Log in</Button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default Recommendations; 