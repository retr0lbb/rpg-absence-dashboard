"use server"
import {unstable_cache} from "next/cache"
import { prisma } from "@/utils/prisma";

export async function getPlayersAbsenceData(){
    return unstable_cache(
        async() => {
            const separatedAbsences = await prisma.absence.groupBy({
                by: ["player_name"],
                _count: {
                    player_name: true,
                },
            });
            return separatedAbsences
        },
        [`absences`],
        {
            revalidate: 60 * 60 * 2, // two hour cache,
            tags: [`absences`]
        }
    )()
}

