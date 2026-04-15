"use server"
import { prisma } from "@/utils/prisma";
import { revalidateTag } from "next/cache";


export async function savePlayerAbsence(data: FormData){
    let date = data.get("date") as string
    
    if(!date){
        date = new Date().toString()
    }

    const playerName = data.get("playerName") as string
    const reason = data.get("reason") as string

    try {
        await prisma.absence.create({
            data: {
                date: new Date(date),
                player_name: playerName,
                reason: reason
            }
        })

        revalidateTag("absences", "default")
        revalidateTag(`player-absence-${playerName}`, "default")
    } catch (error) {
        console.log(error)
        throw new Error("couldn't save player properly")
    }
}