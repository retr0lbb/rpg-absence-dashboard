"use server"
import { prisma } from "@/utils/prisma";
import {unstable_cache} from "next/cache"


export async function getPlayerAbsence(player: string){
    return unstable_cache(
        async() => {
            const absences = await prisma.absence.findMany({
                where: {
                    player_name: player,
                },
                orderBy: {
                    date: "asc",
                },
            });

            return absences
        },
        ["absence", player],
        {
            revalidate: 60 * 60 * 2,
            tags: [`player-absence-${player}`]
        }
    )()
}