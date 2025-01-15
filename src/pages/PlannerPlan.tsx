import Footer from "@/components/custom/Footer";
import Navbar from "@/components/custom/Navbar";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Minus, Plus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

type Activity =
    | "Night out"
    | "Shopping"
    | "Food"
    | "Festivals"
    | "Beach"
    | "Explore City"
    | "Spa"
    | "Outdoor";
type TravelGroup = "Solo" | "Couple" | "Friends" | "Family";

const PlannerPlan = () => {
    const { toast } = useToast()
    const [formData, setFormData] = React.useState({
        destination: "",
        date: null as Date | null,
        people: 0,
        days: 2,
        travelGroup: "" as TravelGroup | "",
        activities: [] as Activity[],
    });

    const activities: Activity[] = [
        "Night out",
        "Shopping",
        "Food",
        "Festivals",
        "Beach",
        "Explore City",
        "Spa",
        "Outdoor",
    ];

    const travelGroups: TravelGroup[] = ["Solo", "Couple", "Friends", "Family"];

    const handleInputChange = (field: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

    };

    const toggleActivity = (activity: Activity) => {
        setFormData((prev) => ({
            ...prev,
            activities: prev.activities.includes(activity)
                ? prev.activities.filter((a) => a !== activity)
                : [...prev.activities, activity],
        }));
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    

    const checkData = (e: any) => {
        e.preventDefault();

        if (!formData.date || !formData.destination || !formData.people || !formData.activities) {
            toast({
                variant: "destructive",
                title:"Missing fields",
                description: "Please provide required information",
              })
            return;
        }
        const selectedDate = new Date(formData.date);
        const currentDate = new Date();

        if (selectedDate <= currentDate) {
            toast({
                variant: "destructive",
                description: "The selected date must be in the future.",
              })
        } else {
            document.getElementById("navigateLink")?.click();
        }
    };


    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="w-2/3 my-14 mx-auto">
                <Card className="w-full max-w-2xl mx-auto px-6 border-none shadow-none">
                    <CardHeader>
                        <CardTitle className="text-4xl font-bold text-center mb-3">
                            Lets plan your trip!
                        </CardTitle>
                        <p className="text-center text-muted-foreground">
                            Simply share a few details, and our planner will create a personalized
                            itinerary tailored to your preferences.
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="space-y-2">
                            <label className="text-md font-medium">
                                Where is your destination today?
                            </label>
                            <Input
                                type="text"
                                placeholder="Search for your destination"
                                className="w-full"
                                value={formData.destination}
                                onChange={(e) =>
                                    handleInputChange("destination", e.target.value)
                                }
                            />
                        </div>

                        <div className="flex justify-between">
                            <label className="text-md font-medium">
                                What date works best for you?
                            </label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={`w-[240px] justify-start text-left font-normal ${!formData.date && "text-muted-foreground"
                                            }`}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formData.date
                                            ? formData.date.toLocaleDateString()
                                            : "Select Date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={formData.date || new Date()}
                                        onSelect={(date) => handleInputChange("date", date)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="flex justify-between">
                            <label className="text-md font-medium">
                                How many individuals are attending?
                            </label>
                            <Select
                                onValueChange={(value) =>
                                    handleInputChange("people", parseInt(value))
                                }
                            >
                                <SelectTrigger className="w-[240px]">
                                    <SelectValue placeholder="Select People" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <SelectItem key={num} value={num.toString()}>
                                            {num} {num === 1 ? "Person" : "People"}
                                        </SelectItem>
                                    ))}
                                    <SelectItem value="others">More than 5</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex justify-between">
                            <label className="text-md font-medium">
                                How many days are you planning for?
                            </label>
                            <div className="flex items-center px-14 space-x-4">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                        handleInputChange("days", Math.max(1, formData.days - 1))
                                    }
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center">{formData.days}</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                        handleInputChange("days", formData.days + 1)
                                    }
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {
                            formData.people != 1 &&
                            <div className="space-y-3">
                                <label className="text-md font-medium">
                                    Who are you travelling with?
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {travelGroups.map((group) => (
                                        <Button
                                            key={group}
                                            variant={
                                                formData.travelGroup === group ? "default" : "outline"
                                            }
                                            onClick={() => handleInputChange("travelGroup", group)}
                                            className="flex-1 min-w-[100px]"
                                        >
                                            {group}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        }

                        <div className="space-y-4">
                            <label className="text-md font-medium">
                                What are the key activities you're targeting?
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {activities.map((activity) => (
                                    <Button
                                        key={activity}
                                        variant={
                                            formData.activities.includes(activity)
                                                ? "default"
                                                : "outline"
                                        }
                                        onClick={() => toggleActivity(activity)}
                                        className="flex-1 min-w-[120px]"
                                    >
                                        {activity}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="w-full mx-24">
                            <Button
                                className="w-2/3"
                                onClick={(e) => checkData(e)}
                            >
                                Next
                            </Button>
                            <Link
                                id="navigateLink"
                                to="/planner-meal"
                                state={{ formData }}
                                style={{ display: "none" }}
                            ></Link>
                        </div>

                    </CardContent>
                </Card>
            </div>
            <div className="w-full p-2">
                <Footer />
            </div>
        </div>
    );
};

export default PlannerPlan;
