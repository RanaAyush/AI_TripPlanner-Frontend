import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, MessageSquare } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import Loader from "..//loader/Loader"
import { useNavigate } from 'react-router-dom';
import { chatSession } from '@/service/AIModel';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebase';

interface Message {
  text: string;
  isUser: boolean;
}
interface Entities {
  source:string;
  destination:string;
  days:number;
  people:number;
  budget:string;
  date?:Date
}

const ChatBot = () => {
  const [entities, setEntities] = useState<Entities>({
    'source': '',
    'destination': '',
    'days': 0,
    'people': 0,
    'date': undefined,
    'budget': ''
  })
  const navigate = useNavigate();
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = React.useState(false);
  const [isTripInfo, setIsTripInfo] = useState(false);
  const [context,setContext] = useState('')

  const checkEntities = async() => {
    if (entities.source === '') {
      return { 'status': false, 'message': 'Please provide your starting location.' }
    } else if (entities.destination === '') {
      return { 'status': false, 'message': 'Great, Can you share your destination.' }
    } else if (entities.days <=0) {
      return { 'status': false, 'message': 'How many days are you travelling for?' }
    } else if (entities.people == 0) {
      return { 'status': false, 'message': 'Please share the number of people in the journey' }
    } else if (entities.date === null) {
      return { 'status': false, 'message': 'when do you want to start the journey?, provide Start Date' }
    } else if (entities.budget === '') {
      return { 'status': false, 'message': 'Can you specify the budget for better experience : Economy | Standard | Premium' }
    }
    return { 'status': true, 'message': 'All Entities Filled' }
  }

  const fillEntities = async(entitiy: Partial<Entities>) => {
    const updatedEntities = {
      source: entities.source || entitiy.source || '',
      destination: entities.destination || entitiy.destination || '',
      days: entities.days || entitiy.days || 0,
      people: entities.people || entitiy.people || 0,
      budget: entities.budget || entitiy.budget || '',
      date: entities.date || entitiy.date
    };
    
    setEntities(updatedEntities);
    console.log("update entities :", updatedEntities);
  }

  useEffect(() => {
    const checkEntitiesAfterUpdate = async () => {
      const res = await checkEntities();
      console.log("res message : ", res);
      
      if (res.status) {
        handleGenerateTrip(entities);
      } else {
        const botMessage: Message = {
          text: res.message,
          isUser: false,
        };
        setContext(res.message);
        setMessages((prev) => [...prev, botMessage]);
      }
    };

    if (entities.source || entities.destination || entities.days || entities.people || entities.date || entities.budget) {
      checkEntitiesAfterUpdate();
    }
  }, [entities]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleGenerateTrip = async (combinedData: any) => {
    setLoading(true);
    if (!localStorage.getItem('user')) {
      toast({
        variant: "destructive",
        description: "Please Login to continue.",
      })
      navigate('/login');
      return;
    }
    const prompt = `Generate Travel Plan for Location: ${combinedData?.destination || "India"}, for ${combinedData?.days ?? 2} Days for ${combinedData?.people || "2"} people with a ${combinedData.budget || 'Standard'} budget, start date is ${combinedData.date || '10 June 2025'}. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions, and suggest itinerary with placeName, travelling timestamps, dates , Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit, also give some information about ${combinedData?.destination || "India"} including it's image url, description, emergency numbers, life quality indices in numbers like -\n Quality of life index\n124.33\nSafety index\n53.31\nTraffic commute time index\n48.14\nPollution index\n48.54\nPurchasing power index\n43.82\nProperty price to income ratio\n10.4\nCost of living index\n22.05\nHealth care index\n63.38\nClimate index\n68.49\nalso suggest some activities to enjoy there including their name, description, ratings image url, booking url.\n all in JSON format.`;

    const res = await chatSession.sendMessage(prompt);
    console.log(res?.response?.text());
    
    setLoading(false);
    toast({
      description: "Hurray, your trip generated successfully!🎊",
    })
    setIsTripInfo(false);
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
    navigate('/view-trip/' + docId);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: inputMessage,
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');

    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch('http://35.154.208.120:8000/api/extract/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: inputMessage , flag : isTripInfo , context:context}),
      });

      const data = await response.json();
      console.log("Received entities:", data.entities);
      
      if (data.intent == "trip_info") {
        setIsTripInfo(true);
        const botMessage: Message = {
          text: "Great!",
          isUser: false,
        };
        setMessages((prev) => [...prev, botMessage]);
        
        // Ensure we're working with a proper object
        const entitiesData = typeof data.entities === 'string' 
          ? JSON.parse(data.entities.replace('```json', '').replace('```', '').trim())
          : data.entities;
          
        fillEntities(entitiesData);
        return;
      }

      // Add bot response
      const botMessage: Message = {
        text: data.response,
        isUser: false,
      };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      const errorMessage: Message = {
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {loading &&
        <Loader />
      }
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-xl w-96 h-[500px] flex flex-col"
            ref={chatBoxRef}
          >
            {/* Chat Header */}
            <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-semibold">AI Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${message.isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                      }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            <motion.div
              initial={false}
              animate={{
                rotate: isHovered ? 360 : 0,
                scale: isHovered ? 1.2 : 1,
                padding: isHovered ? 3 : 0
              }}
              transition={{ duration: 0.4 }}
            >
              {isHovered ? <MessageSquare size={40} /> : <Bot size={40} />}
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot; 