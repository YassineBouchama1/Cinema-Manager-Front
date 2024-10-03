// "use client";
// import { login } from "@/actions/auth/login";
// import { SubmitButton } from "@/components/commen/SubmitButton";
// import { redirect } from "next/navigation";
// import Link from "next/link";
// import toast from "react-hot-toast";
// import { FormField } from "../commen/FormField";



// export default function LoginForm() {

//     //send request to api useing server action
//     async function onLogin(formData: FormData) {
//         const { errorZod, error, success } = await login(formData);

//         if (success) {
//             console.log(success);
//             // if email need verification  send user to request-email-verification
//             if (success === "email") {
//                 console.log("need verefection");
//                 redirect("/request-email-verification");

//             } else {
//                 //if not send them to dashboard
//                 toast.success("Logined Successfully ");
//                 redirect("/dashboard");
//             }
//         }

//         // handle erros from api
//         if (error) {
//             toast.error(error);
//             return;

//         }

//         //handle zod errors
//         else if (errorZod) {
//             Object.keys(errorZod).forEach((key: string) => {
//                 toast.error(`${key} ${errorZod[key]}`);
//                 return;

//             });
//         } else {
//             toast.success("there is a problem try again");
//             return;

//         }
//     }


//     return (
//         <form action={onLogin} className="space-y-4 md:space-y-6">

//             <FormField id="email" name="email" type="email" title={"email"} />

//             <FormField
//                 id="password"
//                 name="password"
//                 type="password"
//                 placeholder={"*******"}
//                 title={"password"}
//             />

//             <div className="flex items-center justify-between">
//                 <Link
//                     href="/forgot-password"
//                     className="text-sm font-medium text-green-500 hover:underline dark:text-primary-500"
//                 >
//                     {"forgetPassword"}
//                 </Link>
//             </div>
//             <SubmitButton
//                 title={"SignIn"}
//                 style=" w-full text-white bg-theme-color hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//             />
//         </form>
//     );
// }