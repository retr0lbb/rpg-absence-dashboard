"use server"

import { prisma } from "@/utils/prisma";

export async function getPlayerAbsence(player: string){
    const absences = await prisma.absence.findMany({
        where: {
            player_name: player,
        },
        orderBy: {
            date: "asc",
        },
    });

    return absences
}