
import { getSession } from '@/lib/sessions';

export default async function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession()


    return (



        <main>
            {children}
        </main>

    );
}


