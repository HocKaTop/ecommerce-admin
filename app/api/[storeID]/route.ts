import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ storeID: string }> }
) {
  try {
    const { userId } = await auth();
    const resolvedParams = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!resolvedParams.storeID) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const store = await prismadb.store.findUnique({
      where: {
        id: resolvedParams.storeID,
        userID: userId,
      },
    });

    if (!store) {
      return new NextResponse("Store not found", { status: 404 });
    }

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_GET]", error);
    return new NextResponse("Internal ERROR", { status: 500 });
  }
}
