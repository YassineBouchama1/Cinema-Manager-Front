'use client'
import React from 'react';
import Image from 'next/image';
import { usePayment } from '../hooks/usePayment';

export default function PaymentForm() {
    const { handlePay, loadingPayment, errorPayment } = usePayment();

    return (
        <section className="px-6 py-8 antialiased bg-gray-900 md:py-16 w-full">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mx-auto max-w-5xl">
                    <h2 className="text-xl font-semibold text-white sm:text-2xl">
                        Payment
                    </h2>
                    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
                        <form
                            action="#"
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
                                >
                                    <option value="" disabled selected>
                                        Choose a plan
                                    </option>
                                    <option value="basic">Basic Plan - \$6,000.00</option>
                                    <option value="premium">Premium Plan - \$6,592.00</option>
                                    <option value="deluxe">Deluxe Plan - \$7,191.00</option>
                                </select>
                            </div>
                            <div className="mb-6 grid grid-cols-2 gap-4">
                                <div className="col-span-2 sm:col-span-1">
                                    <label
                                        htmlFor="full_name"
                                        className="mb-2 block text-sm font-medium text-white"
                                    >
                                        Full name (as displayed on card)*
                                    </label>
                                    <input
                                        type="text"
                                        id="full_name"
                                        className="block w-full rounded-lg border p-2.5 text-sm focus:border-primary-500 focus:ring-primary-500 border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                                        placeholder="Bonnie Green"
                                        required
                                    />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label
                                        htmlFor="card-number-input"
                                        className="mb-2 block text-sm font-medium text-white"
                                    >
                                        Card number*
                                    </label>
                                    <input
                                        type="text"
                                        id="card-number-input"
                                        className="block w-full rounded-lg border p-2.5 text-sm focus:border-primary-500 focus:ring-primary-500 border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                                        placeholder="xxxx-xxxx-xxxx-xxxx"
                                        pattern="^4[0-9]{12}(?:[0-9]{3})?$"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="card-expiration-input"
                                        className="mb-2 block text-sm font-medium text-white"
                                    >
                                        Card expiration*
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                                            <svg
                                                className="h-4 w-4 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                           
                                            datepicker-format="mm/yy"
                                            id="card-expiration-input"
                                            type="text"
                                            className="block w-full rounded-lg border p-2.5 ps-9 text-sm focus:border-red-500 focus:ring-red-500 border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                                            placeholder="12/24"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="cvv-input"
                                        className="mb-2 flex items-center gap-1 text-sm font-medium text-white"
                                    >
                                        CVV*
                                        <button
                                            data-tooltip-target="cvv-desc"
                                            data-tooltip-trigger="hover"
                                            className="text-gray-400 hover:text-gray-500 dark:hover:text-white"
                                        >
                                            <svg
                                                className="h-4 w-4"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                        <div
                                            id="cvv-desc"
                                            role="tooltip"
                                            className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                                        >
                                            The last 3 digits on back of card
                                            <div className="tooltip-arrow" data-popper-arrow="" />
                                        </div>
                                    </label>
                                    <input
                                        type="number"
                                        id="cvv-input"
                                        aria-describedby="helper-text-explanation"
                                        className="block w-full rounded-lg border p-2.5 text-sm focus:border-primary-500 focus:ring-primary-500 border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                                        placeholder="•••"
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handlePay}
                                disabled={loadingPayment}
                                className="flex w-full items-center bg-red-500 hover:bg-red-600 duration-300 justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                            >
                                {loadingPayment ? 'Processing...' : 'Pay now'}
                            </button>
                        </form>
                        <div className="mt-6 grow sm:mt-8 lg:mt-0">
                            <div className="space-y-4 rounded-lg border p-6 border-gray-700 bg-gray-800">
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                            Original price
                                        </dt>
                                        <dd className="text-base font-medium text-white">
                                            \$6,592.00
                                        </dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                            Savings
                                        </dt>
                                        <dd className="text-base font-medium text-green-500">
                                            -\$299.00
                                        </dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                            Store Pickup
                                        </dt>
                                        <dd className="text-base font-medium text-white">
                                            \$99
                                        </dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                            Tax
                                        </dt>
                                        <dd className="text-base font-medium text-white">
                                            \$799
                                        </dd>
                                    </dl>
                                </div>
                                <dl className="flex items-center justify-between gap-4 border-t pt-2 border-gray-700">
                                    <dt className="text-base font-bold text-white">
                                        Total
                                    </dt>
                                    <dd className="text-base font-bold text-white">
                                        \$7,191.00
                                    </dd>
                                </dl>
                            </div>
                            <div className="mt-6 flex items-center justify-center gap-8">
                                <Image
                                    className="h-8 w-auto dark:hidden"
                                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
                                    alt="PayPal"
                                    width={32}
                                    height={32}
                                />
                                <Image
                                    className="hidden h-8 w-auto dark:flex"
                                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg"
                                    alt="PayPal Dark"
                                    width={32}
                                    height={32}
                                />
                                <Image
                                    className="h-8 w-auto dark:hidden"
                                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                                    alt="Visa"
                                    width={32}
                                    height={32}
                                />
                                <Image
                                    className="hidden h-8 w-auto dark:flex"
                                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
                                    alt="Visa Dark"
                                    width={32}
                                    height={32}
                                />
                                <Image
                                    className="h-8 w-auto dark:hidden"
                                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
                                    alt="MasterCard"
                                    width={32}
                                    height={32}
                                />
                                <Image
                                    className="hidden h-8 w-auto dark:flex"
                                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
                                    alt="MasterCard Dark"
                                    width={32}
                                    height={32}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {errorPayment && <p className="text-red-500">{errorPayment.message}</p>}
        </section>
    );
}