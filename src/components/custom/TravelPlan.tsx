import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Train, Car, MapPin, Clock, Calendar, ArrowRight, Search, Loader2, CreditCard } from "lucide-react";
import { chatSession } from "@/service/AIModel";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Invoice from "./Invoice";

const TravelPlan = ({ tripData }: any) => {
  const { tripData: data } = tripData || {};
  const { location, startDate, itinerary } = data || {};
  const source = tripData.userSelection.source || "Delhi";
  const [iataCodes, setIataCodes] = useState<{ source: string, destination: string } | null>(null);
  const [isLoadingIATA, setIsLoadingIATA] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  

  useEffect(() => {
    const getIATACodes = async () => {
      if (!source || !location) return;

      setIsLoadingIATA(true);
      try {
        const prompt = `Get IATA airport codes for these cities. Return only JSON format with source and destination codes:
        Source: ${source}
        Destination: ${location}
        Example response format: {"source": "DEL", "destination": "BOM"}`;

        const response = await chatSession.sendMessage(prompt);
        const codes = JSON.parse(response.response.text());
        setIataCodes(codes);
      } catch (error) {
        console.error("Error fetching IATA codes:", error);
      } finally {
        setIsLoadingIATA(false);
      }
    };

    getIATACodes();
  }, [source, location]);

  const generateFlightSearchUrl = () => {
    return `https://www.google.com/travel/flights/search?q=flights%20to%20${location}&date=${startDate}`;
  };

  const generateTrainSearchUrl = () => {
    return `https://www.google.com/search?q=train+tickets+to+${location}`;
  };

  const generateUberUrl = (destination: string) => {
    return `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(destination)}`;
  };

  const formatDateForURL = (date: string) => {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  };

  const handleMakeMyTripClick = () => {
    if (!iataCodes?.source || !iataCodes?.destination) {
      console.error("IATA codes not available");
      return;
    }
    const formattedDate = formatDateForURL(startDate);
    const url = `https://www.makemytrip.com/flight/search?itinerary=${iataCodes.source}-${iataCodes.destination}-${formattedDate}&tripType=O&paxType=A-1_C-0_I-0&intl=false&cabinClass=E&lang=eng`;
    console.log("Opening URL:", url);
    window.open(url, '_blank');
  };

  const handlePayment = async () => {
    // Initialize Razorpay
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: 6400 * 100, // amount in paise
      currency: "INR",
      name: "HolaTrip",
      description: `Flight from ${source} to ${location}`,
      image: "https://example.com/your_logo",
      handler: function (response: any) {
        // console.log(response);
        setPaymentSuccess(true);
        setShowInvoice(true);
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
    <div className="max-w-7xl mx-auto p-6 my-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transportation Booking Section */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Book Your Transportation</h2>

          {/* Flight Booking */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Plane className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-medium">Flights to {location}</h3>
            </div>

            <Card className="p-4 mb-4 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-1">From</div>
                  <div className="font-medium">{source || "Your Location"}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {new Date(startDate).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>

                <div className="flex flex-col items-center px-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Direct</div>
                </div>

                <div className="flex-1 text-right">
                  <div className="text-sm text-gray-500 mb-1">To</div>
                  <div className="font-medium">{location}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {new Date(startDate).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-3">
                <div>1 Adult</div>
                <div>Economy</div>
                <div>Round Trip</div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button
                className="flex-1"
                onClick={() => window.open(generateFlightSearchUrl(), '_blank')}
              >
                <Search className="w-4 h-4 mr-2" />
                Search Flights
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleMakeMyTripClick}
                disabled={isLoadingIATA || !iataCodes}
              >
                {isLoadingIATA ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Book on MakeMyTrip'
                )}
              </Button>
            </div>
            <div className="flex gap-3 w-full mt-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="secondary"
                    className="flex-1 bg-lime-400 hover:bg-lime-500"
                  >
                    {paymentSuccess ? (<>View your ticket</>) : (<>Book Flight with us</>)}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[80%] w-[80%] max-h-[90vh] overflow-y-auto">
                  {!paymentSuccess && (
                    <DialogHeader>
                      <DialogTitle>Complete Your Booking</DialogTitle>
                      <DialogDescription>
                        Choose your payment method to complete the booking
                      </DialogDescription>
                    </DialogHeader>)}

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
                          <p>Total Amount: ₹6,400</p>
                          <p className="text-xs mt-1">*Including all taxes and fees</p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full">
                        <div className="p-4 bg-green-50 rounded-lg mb-4">
                          <p className="text-green-600 font-medium">Payment Successful!</p>
                          <p className="text-sm text-gray-600 mt-1">Your flight has been booked successfully.</p>
                        </div>
                        <div className="w-full flex justify-center">
                          <Invoice TicketDetails={tripData} iataCodes={iataCodes}/>
                        </div>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Train Booking */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Train className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-medium">Train Tickets</h3>
            </div>
            <p className="text-gray-600 mb-3">Find train routes to {location}</p>
            <Button
              className="w-full"
              onClick={() => window.open(generateTrainSearchUrl(), '_blank')}
            >
              <Search className="w-4 h-4 mr-2" />
              Search Trains
            </Button>
          </div>
        </Card>

        {/* Local Transportation Section */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Local Transportation</h2>
          <div className="flex items-center gap-2 mb-4">
            <Car className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-medium">Uber Rides</h3>
          </div>
          <p className="text-gray-600 mb-4">Book rides to your destinations in {location}</p>

          <div className="space-y-4">
            {itinerary && Object.entries(itinerary).map(([day, dayData]: [string, any]) => (
              <div key={day} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{dayData.date}</span>
                </div>
                <div className="space-y-2">
                  {dayData.activities.map((activity: any, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-gray-500 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{activity.placeName}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(generateUberUrl(activity.placeName), '_blank')}
                          >
                            Book Ride
                          </Button>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPin className="w-3 h-3" />
                          <span>{activity.timeToTravel}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TravelPlan;