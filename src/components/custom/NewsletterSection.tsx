import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const NewsletterSection = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 flex flex-col gap-24">
      {/* Trip Ready Section */}
      <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto ">
        {/* Left Card */}
        <div className="">
          <img
            src="/FeaturedImage/frame1.png"
            alt="Spain Sagrada Familia"
            className="w-full max-h-[40rem] rounded-md"
          />
        </div>

        {/* Right Card */}
        <div className="rounded-3xl bg-[#e2f9f8] h-[40rem] border-[#d1eae9] border-2">
          <div className="mx-auto">
            <img
              src="/FeaturedImage/frame2.png"
              alt="Spain View"
              className="w-full md:w-[50rem] h-[30rem] object-contain " 
            />

            <div className="mt-10 flex justify-center">
            <Link to={'/planner-plan'}>
              <Button className="mt-6 bg-black text-sm text-white hover:bg-gray-800 px-6 py-5 rounded-xl flex items-center gap-2"> {/* Added flex and gap-2 for button icon spacing */}
                Create trip
                <img src="/magicpen.png" alt="magicpen" className="w-4 h-4" />
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-white rounded-2xl shadow-sm border max-w-7xl px-3 text-justify md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className=" col-span-2 my-auto p-4">
            <img
              src="/FeaturedImage/frame3.png"
              alt="Travel adventure"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="col-span-3 p-8 pl-0 flex flex-col justify-center">
            <h2 className="text-4xl font-semibold mb-2">Get special offers, and more <br /> about travel!</h2>
            <p className="text-gray-500 mb-6">
              Subscribe to see secrete deals price drops the moment you sign up.
            </p>
            <div className="flex gap-4">
              <Input
                type="email"
                placeholder="Type your email address"
                className="flex-1 rounded-full h-12"
              />
              <Button className="bg-black text-white px-6 rounded-full h-12">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;