import { useEffect, useRef, useState } from "react"
import { Button } from "../ui/button";
import { FaCheckCircle, FaDownload, FaPhoneAlt, FaHotel } from "react-icons/fa";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Card } from "../ui/card";

function HotelInvoice({ hotelDetails, startDate, days }: any) {
    const invoiceRef = useRef(null);
    const [user, setUser]: any = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleDownload = async () => {
        if (invoiceRef.current === null) {
            return;
        }
        try {
            const element = invoiceRef.current;
            const canvas = await html2canvas(element, {
                scale: 2,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('holaTrip-hotel-booking.pdf');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="w-full flex items-center justify-center flex-col gap-5 p-6 md:p-8">
            <div ref={invoiceRef} className="w-[90%] grid grid-cols-5 bg-white rounded-3xl border border-neutral-200 shadow-sm relative">
                <div className="w-full col-span-4 rounded-3xl relative">
                    <div className="w-full flex items-center justify-between bg-primary px-6 py-3 rounded-tl-3xl">
                        <div className="flex items-center gap-x-3 text-white">
                            <FaHotel size={20} />
                            <h1 className="text-xl text-neutral-50 font-bold uppercase tracking-wider pt-1">
                                HolaTrip Hotel Booking
                            </h1>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <p className="text-xl text-neutral-50 font-bold">
                                Booking ID: {Math.random().toString(36).substring(2, 8).toUpperCase()}
                            </p>
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-5 gap-8 items-center px-5 py-7 mb-7">
                        <div className="col-span-4 space-y-3.5">
                            <div className="w-full flex items-center justify-between border-dashed border-b-2 border-neutral-200 pb-3">
                                <p className="text-base text-neutral-500 font-normal">
                                    Check-in: {new Date(startDate).toLocaleDateString()}
                                </p>
                                <p className="text-base text-neutral-500 font-normal">
                                    Duration: {days} days
                                </p>
                                <p className="text-base text-neutral-500 font-normal">
                                    Total Amount: ₹{hotelDetails.price * days}
                                </p>
                            </div>

                            <div className="w-full flex items-center justify-between">
                                <Card className="p-4 mb-4 bg-gray-50">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="text-sm text-gray-500 mb-1">Hotel Details</div>
                                            <div className="font-medium">{hotelDetails.hotelName}</div>
                                            <div className="text-sm text-gray-500 mb-1">{hotelDetails.hotelAddress}</div>
                                            <div className="text-sm text-gray-500 mt-1">
                                                {hotelDetails.rating} Star Hotel
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                <div className="space-y-1.5 pl-2 w-[40%]">
                                    <p className="text-sm text-neutral-600 font-normal">
                                        Guest Name: <span className="font-medium">{user?.given_name} {user?.family_name}</span>
                                    </p>
                                    <p className="text-sm text-neutral-600 font-normal">
                                        Room Type: <span className="font-medium">Deluxe Room</span>
                                    </p>
                                    <p className="text-sm text-neutral-600 font-normal">
                                        Guests: <span className="font-medium">2 Adults</span>
                                    </p>
                                    <p className="text-sm text-neutral-600 font-normal">
                                        Booking Email: <span className="font-medium">{user?.email}</span>
                                    </p>
                                </div>

                                <div className="space-y-4 flex items-center justify-center flex-col">
                                    <div className="space-y-1 text-center">
                                        <p className="text-base text-neutral-600 font-normal">
                                            Total Price
                                        </p>
                                        <h1 className="text-xl text-neutral-600 font-bold">
                                            ₹{hotelDetails.price * days}
                                        </h1>
                                    </div>
                                    <div className="w-fit px-3 py-1 rounded-full bg-green-500/5 border border-green-600 text-green-600 text-sm font-medium flex items-center justify-center gap-2">
                                        <FaCheckCircle size={16} />
                                        <span>Booking Confirmed</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-1 border border-neutral-200 rounded-xl ssm p-1">
                            <img src="/qrcode.jpg" alt="QR code" className="w-full aspect-square object-cover object-center rounded-xl" />
                        </div>
                    </div>

                    <div className="w-full h-6 bg-primary absolute bottom-0 left-0 rounded-b-3xl flex items-center justify-center">
                        <p className="text-xs text-neutral-100 font-light">
                            Note: 40% charge for cancellation within 24 hours of check-in.
                        </p>
                    </div>
                </div>

                <div className="w-full col-span-1 border-dashed border-1 border-neutral-400 relative rounded-br-3xl">
                    <div className="w-full bg-primary px-4 py-[0.89rem] rounded-tr-3xl">
                        <h1 className="text-xl text-neutral-50 font-bold text-center">Hotel Voucher</h1>
                    </div>

                    <div className="w-full px-4 py-7 space-y-1">
                        <p className="text-sm text-neutral-600 font-normal">
                            Hotel: {hotelDetails.hotelName}
                        </p>
                        <p className="text-sm text-neutral-600 font-normal">
                            Check-in: {new Date(startDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-neutral-600 font-normal">
                            Check-out: {new Date(new Date(startDate).setDate(new Date(startDate).getDate() + days)).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-neutral-600 font-normal">
                            Guest: {user?.given_name} {user?.family_name}
                        </p>
                        <p className="text-sm text-neutral-600 font-normal">
                            Room Type: Deluxe
                        </p>
                        <p className="text-sm text-neutral-600 font-normal">
                            Guests: 2 Adults
                        </p>
                        <p className="text-sm text-neutral-600 font-normal">
                            Total: ₹{hotelDetails.price * days}
                        </p>
                    </div>

                    <div className="w-full h-6 bg-primary absolute bottom-0 left-0 rounded-b-3xl flex items-center justify-center">
                        <p className="text-xs flex align-middle gap-1 text-neutral-100 font-light">
                            <FaPhoneAlt /> +91-863046696
                        </p>
                    </div>
                </div>

                <div className="absolute -top-3 right-[18.8%] h-6 w-6 rounded-full bg-neutral-50 border border-neutral-50"></div>
                <div className="absolute -bottom-3 right-[18.8%] h-6 w-6 rounded-full bg-neutral-50 border border-neutral-50"></div>
            </div>

            <div>
                <Button onClick={handleDownload} className="bg-sky-600 font-semibold text-lg rounded-lg">
                    <FaDownload /> Download Voucher
                </Button>
            </div>
        </div>
    )
}

export default HotelInvoice 