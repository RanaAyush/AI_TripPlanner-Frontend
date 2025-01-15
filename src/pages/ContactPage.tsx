import ContactForm from '@/components/custom/ContactForm'
import Footer from '@/components/custom/Footer'
import Navbar from '@/components/custom/Navbar'

const ContactPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className='mb-28 mt-14'>
                <ContactForm />

            </div>
            <div className="w-full p-2">
                <Footer />
            </div>
        </div>
    )
}

export default ContactPage