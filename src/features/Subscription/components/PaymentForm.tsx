import React, { useState } from 'react';
import { usePayment } from '../hooks/usePayment';


const subscriptionPlans = [
    {
        id: 'basic',
        name: '1 Month',
        price: 2999,
        durationInDays: 30
    },
    {
        id: 'premium',
        name: '6 Months',
        price: 6000,
        durationInDays: 180
    },
    {
        id: 'deluxe',
        name: '1 Year',
        price: 9900,
        durationInDays: 365
    },
];

export default function PaymentForm() {
    const { handlePay, loadingPayment, errorPayment } = usePayment();
    const [selectedPlan, setSelectedPlan] = useState<string>('');

    const handlePlanChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPlan(event.target.value);
    };

    const selectedPlanDetails = subscriptionPlans.find(plan => plan.id === selectedPlan);

    return (
        <section className="px-6 py-8 antialiased bg-gray-900 md:py-16 w-full">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mx-auto max-w-5xl">
                    <h2 className="text-xl font-semibold text-white sm:text-2xl">Subscribe</h2>
                    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handlePay(selectedPlan);
                            }}
                            className="w-full rounded-lg border p-4 shadow-sm border-gray-700 bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8"
                        >
                            <div className="mb-6">
                                <label
                                    htmlFor="plan-select"
                                    className="mb-2 block text-sm font-medium text-white"
                                >
                                    Select Plan*
                                </label>
                                <select
                                    id="plan-select"
                                    className="block w-full rounded-lg border p-2.5 text-sm focus:border-primary-500 focus:ring-primary-500 border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                                    required
                                    value={selectedPlan}
                                    onChange={handlePlanChange}
                                >
                                    <option value="" disabled>
                                        Choose a plan
                                    </option>
                                    {subscriptionPlans.map(plan => (
                                        <option key={plan.id} value={plan.id}>
                                            {plan.name} - ${(plan.price / 100).toFixed(2)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedPlanDetails && (
                                <div className="mb-6 p-4 rounded-lg bg-gray-700">
                                    <h3 className="text-lg font-semibold text-white">
                                        Selected Plan Details
                                    </h3>
                                    <div className="mt-2 space-y-2">
                                        <p className="text-sm text-gray-300">
                                            Duration: {selectedPlanDetails.name}
                                        </p>
                                        <p className="text-lg font-bold text-white">
                                            Price: ${(selectedPlanDetails.price / 100).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loadingPayment || !selectedPlan}
                                className="flex w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-medium text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                {loadingPayment ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    'Proceed to Payment'
                                )}
                            </button>

                            {errorPayment && (
                                <div className="mt-4 p-3 rounded-lg bg-red-100 border border-red-400 text-red-700">
                                    {errorPayment.message}
                                </div>
                            )}
                        </form>

                        <div className="mt-6 grow sm:mt-8 lg:mt-0">
                            <div className="space-y-4 rounded-lg border p-6 border-gray-700 bg-gray-800">
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-400">
                                            Total amount
                                        </dt>
                                        <dd className="text-lg font-medium text-white">
                                            ${selectedPlanDetails ? (selectedPlanDetails.price / 100).toFixed(2) : '0.00'}
                                        </dd>
                                    </dl>
                                    <div className="text-sm text-gray-400 mt-4">
                                        * Secure payment processed by Stripe
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}