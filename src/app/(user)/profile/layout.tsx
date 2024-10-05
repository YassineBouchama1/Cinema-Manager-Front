
import { getSession } from '@/lib/sessions';
import { delay } from '@/utils/delay';

export default async function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (



        <main>
            {children}
        </main>

    );
}


