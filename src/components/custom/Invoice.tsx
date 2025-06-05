import { useEffect, useRef, useState } from "react"
import { Button } from "../ui/button";
import { FaCheckCircle, FaDownload, FaPhoneAlt, FaPlane } from "react-icons/fa";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Card } from "../ui/card";
import { ArrowRight } from "lucide-react";

function Invoice({ TicketDetails, iataCodes }: any) {
    const invoiceRef = useRef(null);
    const [user, setUser]: any = useState(null);
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    if (user) {
        console.log(user);

    }


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
            pdf.save('holaTrip-travel-ticket.pdf');
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
                            <FaPlane size={20} />
                            <h1 className="text-xl text-neutral-50 font-bold uppercase tracking-wider pt-1">
                                HolaTrip premium
                            </h1>
                        </div>

                        <div className="flex items-center gap-x-2">
                            <p className="text-xl text-neutral-50 font-bold">
                                <span className="text-lg">(Flight No.)</span> AU. 3E 9704
                            </p>
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-5 gap-8 items-center px-5 py-7 mb-7">

                        {/* Billno, per seat and date */}
                        <div className="col-span-4 space-y-3.5">
                            <div className="w-full flex items-center justify-between border-dashed border-b-2 border-neutral-200 pb-3">
                                <p className="text-base text-neutral-500 font-normal">
                                    Bill No. : 0104E
                                </p>
                                <p className="text-base text-neutral-500 font-normal">
                                    NPR 6400 <span className="text-xs">/seat</span>
                                </p>
                                <p className="text-base text-neutral-500 font-normal">
                                    Date: {TicketDetails.tripData.startDate}
                                </p>
                            </div>

                            {/* Passenger detail */}
                            <div className="w-full flex items-center justify-between">


                                <Card className="p-4 mb-4 bg-gray-50">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="text-sm text-gray-500 mb-1">From</div>
                                            <div className="font-medium">{`(${iataCodes.source})`}</div>
                                            <div className="text-sm text-gray-500 mb-1">{TicketDetails.userSelection.source}</div>
                                            <div className="text-sm text-gray-500 mt-1">
                                                {new Date(TicketDetails.tripData.startDate).toLocaleDateString('en-US', {
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
                                            <div className="font-medium">{`(${iataCodes.destination})`}</div>
                                            <div className="text-sm text-gray-500 mb-1">{TicketDetails.userSelection.destination}</div>
                                            <div className="text-sm text-gray-500 mt-1">
                                                {new Date(TicketDetails.tripData.startDate).toLocaleDateString('en-US', {
                                                    weekday: 'short',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-3">
                                        <div>{TicketDetails.userSelection.people} Adult</div>
                                        <div>{TicketDetails.userSelection.budget}</div>
                                        <div>Round Trip</div>
                                    </div>
                                </Card>

                                <div className="space-y-1.5 pl-2 w-[40%]">
                                    <p className="text-sm text-neutral-600 font-normal">
                                        Passenger Name: <span className="font-medium">{user?.given_name} {user?.family_name}</span>
                                    </p>
                                    <p className="text-sm text-neutral-600 font-normal">
                                        Total Seat No.: <span className="font-medium">
                                            EE2, EE3
                                        </span>
                                    </p>
                                    <p className="text-sm text-neutral-600 font-normal">
                                        Total no of passengers.: <span className="font-medium">
                                            0{TicketDetails.userSelection.people}
                                        </span>
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
                                            NPR 6400
                                        </h1>
                                    </div>
                                    <div className="w-fit px-3 py-1 rounded-full bg-green-500/5 border border-green-600 text-green-600 text-sm font-medium flex items-center justify-center gap-2">
                                        <FaCheckCircle size={16} />
                                        <span>Bill Paid</span>
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
                            Note: 40% charge for cancellation price 24 hours of programme.
                        </p>
                    </div>
                </div>

                <div className="w-full col-span-1 border-dashed border-1 border-neutral-400 relative rounded-br-3xl">
                    <div className="w-full bg-primary px-4 py-3 rounded-tr-3xl">
                        <h1 className="text-2xl text-neutral-50 font-bold text-center">Flight Ticket</h1>
                    </div>

                    <div className="w-full px-4 py-7 space-y-1">
                        <p className="text-sm text-neutral-600 font-normal">
                            Bill no: 0104E
                        </p>
                        <p className="text-sm text-neutral-600 font-normal">
                            Date: {TicketDetails.tripData.startDate}
                        </p>
                        <p className="text-sm text-neutral-600 font-normal">
                            name: {user?.given_name} {user?.family_name}
                        </p>
                        <p className="text-sm text-neutral-600 font-normal">
                            arival: {TicketDetails.userSelection.destination}
                        </p>
                        <p className="text-sm text-neutral-600 font-normal">
                            departure: "Delhi"
                        </p>
                        <p className="text-sm text-neutral-600 font-normal">
                            dept time: 10:45 PM
                        </p>
                        <p className="text-sm text-neutral-600 font-normal">
                            total passengers: 0{TicketDetails.userSelection.people}
                        </p>
                        <p className="text-sm text-neutral-600 font-normal">
                            seates: EE2, EE3
                        </p>
                        <p className="text-sm text-neutral-600 font-normal">
                            total amt: NPR 6400
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
                    <FaDownload /> Download Ticket
                </Button>
            </div>
        </div>
    )
}

export default Invoice