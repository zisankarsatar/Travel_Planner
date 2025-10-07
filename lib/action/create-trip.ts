"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";

export async function createTrip(formData:FormData) {
    const session = await auth();
    if (!session || !session.user?.id){
        throw new Error("Not authenticated.");
    }

    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const startDateStr = formData.get("startDate")?.toString();
    const endDateStr = formData.get("endDate")?.toString();

    if(!title || !description || !startDateStr || !endDateStr){
        throw new Error("All filed are required!");
    }

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    await prisma.trip.create({
        data: {
            title,
            description,
            startDate,
            endDate,
            userId: session.user.id
        },
    })

    redirect("/trips")
}