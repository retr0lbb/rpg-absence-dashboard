import { prisma } from "@/utils/prisma"

export async function GET(_req: Request){
    const names = await prisma.absence.findMany({
        select: {
            player_name: true
        },
        distinct: ["player_name"]
    })

    return new Response(JSON.stringify(names), {
        status: 200,
        headers: {"Content-Type": "application/json "}
    })
}