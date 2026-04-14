"use server"

import { prisma } from "@/utils/prisma";

export async function getUserNames(){
    const names = await prisma.absence.findMany({
        select: {
            player_name: true,
        },
        distinct: ["player_name"],
    });
    
    return names
}