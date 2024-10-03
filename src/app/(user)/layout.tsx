import AuthWapper from '@/components/auth/AuthWapper';
import TopNavbar from '@/components/layouts/TopNavbar';
import MarginWidthWrapper from '@/components/Wrappers/MarginWidthWrapper';

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (


        <div className="flex flex-1  flex-col bg-gray-900 text-white   no-scrollbar ">

            <TopNavbar />
            <MarginWidthWrapper>

                {children}
                <AuthWapper />
            </MarginWidthWrapper>


        </div >
    );
}


