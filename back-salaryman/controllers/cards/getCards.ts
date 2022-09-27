import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

export async function getCards(req: Request, res: Response, userId: number, prisma: PrismaClient) {
  const cards = await prisma.card.findMany({
    where: {
      userId
    }
  })
  res.json({"status": "ok", cards})
}