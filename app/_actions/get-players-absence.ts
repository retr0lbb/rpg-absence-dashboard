"use server"

import { prisma } from "@/utils/prisma";

export async function getPlayersAbsenceData(){
    const separatedAbsences = await prisma.absence.groupBy({
        by: ["player_name"],
        _count: {
            player_name: true,
        },
    });

    return separatedAbsences
}