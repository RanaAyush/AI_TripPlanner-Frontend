import AboutUsSection from '@/components/custom/AbuotUsSection'
import Footer from '@/components/custom/Footer'
import Navbar from '@/components/custom/Navbar'

const AboutPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className='mb-28 mt-28'>
                <AboutUsSection/>
            </div>
            <div className="w-full p-2">
                <Footer />
            </div>
        </div>
    )
}

export default AboutPage