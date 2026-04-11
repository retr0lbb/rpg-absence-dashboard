import { prisma } from "@/utils/prisma"
import z from "zod/v4"

export async function POST(req: Request){
    const bodySchema = z.object({
        player_name: z.string().nonempty(),
        reason: z.string().optional(),
        date: z.coerce.date()
    }) 

    const body = await req.json()

    const {date, player_name, reason} = bodySchema.parse(body)

    await prisma.absence.create({
        data: {
            player_name,
            date,
            reason
        }
    })

    return new Response(JSON.stringify({message: "Ramelacao inserida no banco de dados"}), {
        status: 201,
        headers: {"Content-Type": "application/json"}
    })
}