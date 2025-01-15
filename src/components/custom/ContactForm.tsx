import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom";


const ContactForm = () => {
  const { toast } = useToast()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneCode: "IN +91",
    phoneNumber: "",
    message: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const user = localStorage.getItem('user');
    if (!user) {
      toast({
        variant: "destructive",
        description: "Please Login to continue.",
      })
      navigate('/login');
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:1337/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            firstname: formData.firstName,
            lastname: formData.lastName,
            email: formData.email,
            phonenumber: formData.phoneNumber,
            message: formData.message,
          },
        }),
      });

      if (response.ok) {
        setSubmissionStatus("Form submitted successfully! 😸");
        toast({
          description: "Thanks for your feedback. 🤗",
        })
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneCode: "IN +91",
          phoneNumber: "",
          message: "",
        });
      } else {
        setSubmissionStatus("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 flex flex-col lg:flex-row gap-8">
      {/* Left side - Image and contact info */}
      <div className="lg:w-1/2 space-y-6">
        <div className="relative h-64 lg:h-96 overflow-hidden rounded-lg">
          <img
            src="/contactImg.png"
            alt="City view"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-gray-500" />
            <span className="text-gray-600">contact@company.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-gray-500" />
            <span className="text-gray-600">(+91) 8630469916</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-gray-500" />
            <span className="text-gray-600">
              Clock Tower B-21
              <br />
              Dehradun, 249204
            </span>
          </div>
        </div>
      </div>

      {/* Right side - Contact form */}
      <Card className="lg:w-1/2 shadow-none border-none">
        <CardHeader className="pt-0">
          <CardTitle className="text-4xl font-bold mb-3">How can we help?</CardTitle>
          <p className="text-gray-500 text-md mt-2">
            Are you a traveller in need of help? Have a question about your review? Problems
            booking your hotel, flight or attractions/activity? Trouble with a restaurant
            reservation?
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <Input
                name="firstName"
                type="text"
                placeholder="First Name*"
                required
                className="h-12 border-2"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <Input
                name="lastName"
                type="text"
                placeholder="Last Name*"
                required
                className="h-12 border-2"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>

            <Input
              name="email"
              type="email"
              placeholder="Email*"
              required
              className="h-12 border-2"
              value={formData.email}
              onChange={handleInputChange}
            />

            <div className="flex gap-4">
              <select
                name="phoneCode"
                className="w-24 rounded-md border-gray-200 px-3 py-2 border-2"
                value={formData.phoneCode}
                onChange={handleInputChange}
              >
                <option>IN +91</option>
              </select>
              <Input
                name="phoneNumber"
                type="tel"
                placeholder="Phone Number*"
                className="flex-1 h-12 border-2"
                required
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>

            <Textarea
              name="message"
              placeholder="Leave us a message*"
              className="min-h-[120px] border-2"
              required
              value={formData.message}
              onChange={handleInputChange}
            />

            <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
          {submissionStatus && <p className="text-center mt-4">{submissionStatus}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;
