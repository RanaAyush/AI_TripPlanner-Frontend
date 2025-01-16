import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from '@/components/custom/Navbar';
import Footer from '@/components/custom/Footer';
import { chatSession } from '@/service/AIModel';
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebase';
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useToast } from "@/hooks/use-toast"
import Loader from "../components/loader/Loader"

type Budget = 'Economy' | 'Standard' | 'Premium';
type FoodType = 'Veg' | 'Non-Veg' | 'Both';
type FoodPreference = 'Organic' | 'Dietary' | 'Authentic' | 'Vegan';

const PlannerMeal = () => {
    const { toast } = useToast()
    const navigate = useNavigate();
    const location = useLocation();
    const previousData = location.state?.formData || {}; // Get data from the previous page

    const [budget, setBudget] = React.useState<Budget>();
    const [foodType, setFoodType] = React.useState<FoodType>();
    const [preferences, setPreferences] = React.useState<FoodPreference[]>([]);
    const [loading, setLoading] = React.useState(false);

    const budgetOptions: Budget[] = ['Economy', 'Standard', 'Premium'];
    const foodTypes: FoodType[] = ['Veg', 'Non-Veg', 'Both'];
    const foodPreferences: FoodPreference[] = ['Organic', 'Dietary', 'Authentic', 'Vegan'];

    const togglePreference = (pref: FoodPreference) => {
        setPreferences(prev =>
            prev.includes(pref)
                ? prev.filter(p => p !== pref)
                : [...prev, pref]
        );
    };

    const checkData = (e: any) => {
        e.preventDefault();

        if (!budget || !foodType || !preferences) {
            toast({
                variant: "destructive",
                title:"Missing fields",
                description: "Please provide your preferences",
              })
              return false;
        }
        else return true;
    };

    const handleGenerateTrip = async () => {
        setLoading(true);
        if (!localStorage.getItem('user')) {
            toast({
                variant: "destructive",
                description: "Please Login to continue.",
              })
            navigate('/login');
            return;
        }

        const combinedData = {
            ...previousData,
            mealPreferences: {
                budget,
                foodType,
                preferences,
            },
        };

        // console.log("Combined Data: ", combinedData);

        const prompt = `Generate Travel Plan for Location: ${combinedData?.destination || "India"}, for ${combinedData.days} Days for ${combinedData?.people || "2"} people with a ${combinedData.mealPreferences.budget} budget, start date is ${combinedData.date}. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions, and suggest itinerary with placeName, travelling timestamps, dates , Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit, also give some information about ${combinedData?.destination || "India"} including it's image url, description, emergency numbers, life quality indices in numbers like -\n Quality of life index\n124.33\nSafety index\n53.31\nTraffic commute time index\n48.14\nPollution index\n48.54\nPurchasing power index\n43.82\nProperty price to income ratio\n10.4\nCost of living index\n22.05\nHealth care index\n63.38\nClimate index\n68.49\nalso suggest some activities to enjoy there including their name, description, ratings image url, booking url.\n all in JSON format.`;

        const res = await chatSession.sendMessage(prompt);
        setLoading(false);
        toast({
            description: "Hurray, your trip generated successfully!🎊",
          })
        saveAITrip(res?.response?.text(), combinedData);
    };

    const saveAITrip = async (tripData: string, combinedData: any) => {
        const docId = Date.now().toString();
        const user = JSON.parse(localStorage.getItem('user') || "");
        await setDoc(doc(db, "AITrips", docId), {
            userSelection: combinedData,
            tripData: JSON.parse(tripData),
            id: docId,
            userEmail: user?.email,
        });
        navigate('/view-trip/'+ docId);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {loading && 
                <Loader/>
            }
            <Navbar />
            <div className="w-full md:w-2/3 my-14 mx-0 md:mx-auto">
                <Card className="w-full max-w-xl mx-2 md:mx-auto p-2 md:p-6 border-none shadow-none">
                    <CardHeader>
                        <CardTitle className="text-4xl text-center font-bold mb-3">Meal Preferences</CardTitle>
                        <p className="text-center text-muted-foreground">
                            Pick the dishes you feel like having on your journey, let us know your
                            budget, and tell us what type of cuisine you prefer.
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-10">
                        <div className="space-y-4">
                            <label className="text-md font-medium">What is your Budget?</label>
                            <div className="flex flex-wrap gap-2">
                                {budgetOptions.map((option) => (
                                    <Button
                                        key={option}
                                        variant={budget === option ? "default" : "outline"}
                                        onClick={() => setBudget(option)}
                                        className="flex-1"
                                    >
                                        {option}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-md font-medium">What kind of food do you like the best?</label>
                            <div className="flex flex-wrap gap-2">
                                {foodTypes.map((type) => (
                                    <Button
                                        key={type}
                                        variant={foodType === type ? "default" : "outline"}
                                        onClick={() => setFoodType(type)}
                                        className="flex-1"
                                    >
                                        {type}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-md font-medium">What kind of food do you usually go for?</label>
                            <div className="flex flex-wrap gap-2">
                                {foodPreferences.map((pref) => (
                                    <Button
                                        key={pref}
                                        variant={preferences.includes(pref) ? "default" : "outline"}
                                        onClick={() => togglePreference(pref)}
                                        className="flex-1"
                                    >
                                        {pref}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <Button className="w-full bg-black text-white hover:bg-gray-800" onClick={(e)=>{
                            if(checkData(e)){
                                handleGenerateTrip();
                            }
                        }} disabled={loading}>
                            Generate Itinerary
                        </Button>
                    </CardContent>
                </Card>
            </div>
            <div className="w-full p-2">
                <Footer />
            </div>
        </div>
    );
};

export default PlannerMeal;
