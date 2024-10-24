"use client";

import { loadStripe } from "@stripe/stripe-js";
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCallback, useState } from "react";

export default function PaymentBtn() {
    const [isOpen, setIsOpen] = useState(false);
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

    const fetchClientSecret = useCallback(async () => {
        return fetch("/api/payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => data.client_secret);
    }, []);

    const options = { fetchClientSecret };

    return (
        <div>
            {/* Payment Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                type="submit"
            >
                Make Payment
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    {/* Modal Content */}
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-screen-xl mx-4 relative">
                        {/* Modal Header */}
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-semibold">Pro Membership</h2>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                                <EmbeddedCheckout className="max-h-[80dvh]" />
                            </EmbeddedCheckoutProvider>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t flex justify-end">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                                type="button"
                            >
                                Cancel Payment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}