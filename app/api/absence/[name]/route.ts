import { prisma } from "@/utils/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(_req: NextRequest, {params}: {params: Promise<{name: string}>}){
    const { name } = await params

    const absences = await prisma.absence.findMany({
        where: {
            player_name: name
        },
        orderBy: {
            date: "asc"
        }
    })

    return NextResponse.json({absences})
}