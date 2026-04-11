import "dotenv/config";
import { PrismaClient } from "../app/_generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { env } from "./env";

const databaseUrl = env.DATABASE_URL

const adapter = new PrismaPg({ connectionString: databaseUrl })

export const prisma = new PrismaClient({ adapter })