import { prisma } from "@/utils/prisma"

export async function GET(_req: Request){
    const separatedAbsences = await prisma.absence.groupBy({
        by: ['player_name'],
        _count: {
            player_name: true,
        },
    });

    return new Response(JSON.stringify(separatedAbsences), {
        status: 200,
        headers: {"Content-Type": "application/json "}
    })
}