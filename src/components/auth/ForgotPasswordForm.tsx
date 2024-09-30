"use client";

import { SubmitButton } from "@/components/commen/SubmitButton";

import Link from "next/link";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { FormField } from "../commen/FormField";
import { forgotPassword } from "@/actions/auth/forgotPassword";


export default function ForgotPasswordForm() {



    //send request to api useing server action
    async function onResetPassword(formData: FormData) {


        const { errorZod, error, success }: any = await forgotPassword(formData);

        // handle erros from api
        if (error) {
            toast.error(error);
        }

        //handle zod errors
        else if (errorZod) {
            Object.keys(errorZod).forEach((key: string) => {
                toast.error(`${key} ${errorZod[key]}`);
            });
        } else {
            console.log(success)
            toast.success("We Sent You Email");
        }


    }




    return (
        <form action={onResetPassword} className="space-y-4 md:space-y-6">
            <FormField id="email" name="email" type="email" title={'email'} />

            <SubmitButton
                title={"send"}
                loadingForm={"sending..."}
                style=" w-full text-white bg-theme-color hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            />

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                remamberedPassword
                <Link
                    href="/login"
                    className="font-medium text-green-500 hover:underline dark:text-primary-500"
                >
                    SignIn
                </Link>
            </p>
        </form>
    );
}