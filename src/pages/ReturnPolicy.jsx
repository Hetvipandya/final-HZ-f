
// export default function ReturnPolicy() {
//     return (<>
//         <main className="bg-white"  data-aos="fade-up">
//             <section className="py-10 bg-gray-50">
//                 <div className="max-w-4xl mx-auto px-6">
//                     <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary">
//                         Return & Refund Policy
//                     </h1>
//                 </div>
//             </section>

//             <section className="py-10">
//                 <div className="max-w-4xl mx-auto px-6 prose prose-gray ">
//                     <p>
//                         At HARVON, customer satisfaction is our priority. We offer a
//                         simple and transparent return and refund policy.
//                     </p>

//                     <h3>Return Eligibility</h3>
//                     <ul>
//                         <li>Returns accepted within 15 days of delivery</li>
//                         <li>Product must be unused, unwashed, and in original packaging</li>
//                         <li>Tags and labels must be intact</li>
//                     </ul>

//                     <h3>Non-Returnable Items</h3>
//                     <p>
//                         Items such as innerwear, accessories, or products marked as
//                         non-returnable are not eligible for return.
//                     </p>

//                     <h3>Return Process</h3>
//                     <p>
//                         To initiate a return, contact our support team with your order ID
//                         and reason for return. Our team will guide you through the process.
//                     </p>

//                     <h3>Refunds</h3>
//                     <p>
//                         Once the returned item passes inspection, the refund will be
//                         processed within 5–7 business days to the original payment method.
//                     </p>

//                     <h3>Contact Support</h3>
//                     <p>
//                         For return or refund queries, email us at
//                         <strong> support@harvon.com</strong>.
//                     </p>
//                 </div>
//             </section>
//         </main >

//     </>
//     );
// }

export default function ReturnPolicy() {
    return (
        <main className="bg-[#f8f5f0]" data-aos="fade-up">

            {/* HEADER */}
            <section className="py-10 bg-[#f1ece3]">
                <div className="max-w-4xl mx-auto px-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#1e293b] font-serif">
                        Cancellation & Refund Policy
                    </h1>
                </div>
            </section>

            {/* CONTENT */}
            <section className="py-10">
                <div className="max-w-4xl mx-auto px-6 space-y-6 text-gray-700 leading-relaxed">

                    <p>
                        At <strong>HOLLY ZOLLY</strong>, we are committed to providing
                        authentic and personalized Vastu consultation services.
                        Due to the nature of our services, our cancellation and refund
                        policy is designed to be fair and transparent for both clients
                        and consultants.
                    </p>

                    <h3 className="text-xl font-semibold text-[#1e293b]">
                        Service Eligibility
                    </h3>
                    <ul className="list-disc pl-5">
                        <li>All services are consultation-based (online or offline)</li>
                        <li>Once a consultation or report is delivered, it is considered fulfilled</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[#1e293b]">
                        Cancellation Policy
                    </h3>
                    <ul className="list-disc pl-5">
                        <li>
                            Appointments can be cancelled or rescheduled at least 24 hours prior to the scheduled time
                        </li>
                        <li>
                            Cancellations made within 24 hours may not be eligible for a refund
                        </li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[#1e293b]">
                        Refund Policy
                    </h3>
                    <ul className="list-disc pl-5">
                        <li>
                            Refunds are applicable only if the service has not been initiated
                        </li>
                        <li>
                            Once consultation or report preparation has started, refunds will not be provided
                        </li>
                        <li>
                            Approved refunds will be processed within 5–7 business days
                        </li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[#1e293b]">
                        Non-Refundable Services
                    </h3>
                    <p>
                        Personalized Vastu reports, site visits, and customized recommendations
                        are non-refundable once delivered, as they are tailored specifically
                        for each client.
                    </p>

                    <h3 className="text-xl font-semibold text-[#1e293b]">
                        Contact Us
                    </h3>
                    <p>
                        For any queries regarding cancellations or refunds, please contact us at
                        <strong> vastukkalp2007gmail.com</strong>.
                    </p>

                </div>
            </section>

        </main>
    );
}