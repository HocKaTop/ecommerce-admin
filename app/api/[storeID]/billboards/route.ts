import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
    {params}: {params:{storeID:string}}
){
    try{
        const {userId} = await auth();
        const body = await req.json();
        const {label, imageUrl} = body;
        if (!userId){
            return new NextResponse("Unaunthenticated", {status:401})
        }
        if (!label){
            return new NextResponse("Label is required", {status:400})
        }
        if (!imageUrl){
            return new NextResponse("ImageURL is required", {status:400})
        }

        if (!params.storeID){
            return new NextResponse("StoreID is required", {status:400})
        }
        const StoreByUserID= await prismadb.store.findFirst({
            where:{
                id:params.storeID,
                userID:userId
            }
        });

        if (!StoreByUserID){
            return new NextResponse("Unauthorized", {status:403})
        }

        const billboard = await prismadb.billboard.create({
            data: {
                label,
                imageUrl,
                storeID: params.storeID
            }
        });
        return NextResponse.json(billboard);
    } catch(error){
        console.log('[BILLBOARD_POST]', error);
        console.error('Full error details:', error);
        return new NextResponse(`Internal error: ${error instanceof Error ? error.message : 'Unknown error'}`, {status:500});
    }
}

export async function GET(
    req: Request,
    {params}: {params:{storeID:string}}
){
    try{

        if (!params.storeID){
            return new NextResponse("StoreID is required", {status:400})
        }

        const billboards = await prismadb.billboard.findMany({
            where: {
                storeID: params.storeID
            }
        });
        return NextResponse.json(billboards);
    } catch(error){
        console.log('[BILLBOARD_GET]', error);
        console.error('Full error details:', error);
        return new NextResponse(`Internal error: ${error instanceof Error ? error.message : 'Unknown error'}`, {status:500});
    }
}