// import { useState } from 'react'
import Recommendations from '@/components/custom/Recommendations'
import FeaturedPosts from '../components/custom/FeaturedPosts'
import Footer from '../components/custom/Footer'
import GuidInfo from '../components/custom/GuidInfo'
import Herosection from "../components/custom/Herosection"
import HolaTripCards from '../components/custom/HolaTripCards'
import Navbar from '../components/custom/Navbar'
import NewsletterSection from '../components/custom/NewsletterSection'
import PlacesCard from '../components/custom/PlacesCard'
import Testimonials from '../components/custom/Testimonials'
import './style.css'

function App() {

  
  return (
    <div>
      <div className="h-[50rem] md:h-full md:min-h-screen w-full relative overflow-hidden">
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>
        <div className="orb orb4"></div>
        <div className="orb orb5"></div>
        <div className="orb orb6"></div>
        <Navbar />
        <Herosection />
      </div>
      <div className='relative'>
        <div className="hidden lg:flex absolute -top-32 left-[9%] flex-col transform rotate-[-30deg] text-lg font-semibold text-gray-500">
          <span><strong> #1</strong> online best</span>
          <span>AI Travel Planner </span>
        </div>
        <div className='hidden lg:flex absolute -top-14 left-[12%] '>
          <img src="/arrow_line.png" alt="arrowline" />
        </div>
        <div className="-mt-28 w-full flex justify-center">
          <img
            src="/Itinerary_page.png"
            alt="Trip Preview"
            className="w-[90%] md:w-[70%] max-w-5xl rounded-lg"
          />
        </div>
      </div>
      <div className='relative'>
        <section className="flex flex-col items-center text-center p-6 md:p-8">
          <Recommendations />
        </section>
      </div>
      <div className='relative'>
        <GuidInfo />
        <div className="flex absolute -z-10 left-0 top-80">
          <img src="/sideGIF/baloon.png" alt="sideimg" />
        </div>
      </div>
      <div className='flex flex-col mt-28 gap-8 text-center px-8 md:px-32 mb-10'>
        <h1 className='text-3xl font-semibold mb-5 animate-right'>Why should you choose Hola Trip.</h1>
        <HolaTripCards />
      </div>
      <div className='flex flex-col mt-28 gap-8 px-4 md:px-20 lg:px-32 mb-10 relative'>
        <h1 className='text-4xl font-semibold pl-10 md:pl-24'>Unforgettable places in earth</h1>
        <div className="flex absolute -z-10 right-0 -top-16">
          <img src="/sideGIF/ship.png" alt="sideimg" />
        </div>
        <PlacesCard />
      </div>
      <div className='flex flex-col mt-28 gap-8 px-8 md:px-24 mb-10 relative'>
        <div className="flex absolute -z-10 left-0 -top-16">
          <img src="/sideGIF/side3.png" alt="sideimg" />
        </div>
        <Testimonials />
      </div>
      <div className='flex flex-col mt-28 gap-8 px-4 md:px-24 relative'>
        <FeaturedPosts />
        <div className="flex absolute -z-10 right-0 -bottom-32">
          <img src="/sideGIF/side4.png" alt="sideimg" />
        </div>
      </div>
      <div className='mt-28 px-2 md:px-16'>
        <NewsletterSection />
      </div>
      <div className='mt-12 p-2'>
        <Footer />
      </div>
    </div>

  )
}

export default App
