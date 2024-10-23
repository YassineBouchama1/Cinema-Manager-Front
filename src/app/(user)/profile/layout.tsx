import SubscriptionStatusModal from "@/components/commen/SubscriptionStatusModal";



export default async function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (



        <main >
            {children}
            <SubscriptionStatusModal />
        </main>

    );
}


