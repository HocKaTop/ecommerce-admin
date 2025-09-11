import prismadb from "@/lib/prismadb"

export default async function DashboardPage({
    params,
}: {
    params: { storeID: string }
}) {
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeID,
        },
    });

    return (
        <div>
           Active store : {store?.name}
        </div>
    );
}