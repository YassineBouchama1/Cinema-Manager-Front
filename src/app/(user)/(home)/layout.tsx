import AuthWapper from '@/features/auth/components/AuthWapper';
import TopNavbar from '@/components/layouts/TopNavbar';
import MarginWidthWrapper from '@/components/Wrappers/MarginWidthWrapper';
import { getSession } from '@/lib/sessions';

export default async function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession()


    return (


        <div >


            {children}



        </div >
    );
}


