"use server"

import { prisma } from "@/utils/prisma";
import z from "zod/v4";


export async function createPlayerAbsence(data: unknown){
    const bodySchema = z.object({
        player_name: z.string().nonempty(),
        reason: z.string().optional(),
        date: z.coerce.date(),
    });
    
    const { date, player_name, reason } = bodySchema.parse(data);
    
    await prisma.absence.create({
        data: {
            player_name,
            date,
            reason,
        },
    });

}