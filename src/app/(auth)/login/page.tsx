import LoginForm from "@/components/auth/LoginForm";

import HeaderHome from "@/components/ui/HeaderHome";




export default function Page() {

    return (
        <section className="bg-gray-50 dark:bg-gray-900 h-screen  bg-[url('/bgContent1.png')]  bg-repeat bg-auto md:bg-contain">
            <HeaderHome />

            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    title
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            title_form
                        </h1>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </section>
    );
}