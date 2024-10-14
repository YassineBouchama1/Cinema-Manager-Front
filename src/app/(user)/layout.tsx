import TopNavbar from '@/components/layouts/TopNavbar';
import MarginWidthWrapper from '@/components/Wrappers/MarginWidthWrapper';
import { getSession } from '@/lib/sessions';
import SubscriptionWapper from '@/components/Wrappers/SubscriptionWapper';
import AuthFormWapper from '@/components/Wrappers/AuthFormWapper';

export default async function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession()


    return (


        <div className="flex  flex-col bg-gray-900 text-white   no-scrollbar ">

            <TopNavbar isAuth={session.isLoggedIn} />
            <MarginWidthWrapper>

                {children}
                <AuthFormWapper />
                <SubscriptionWapper />
            </MarginWidthWrapper>


        </div >
    );
}


