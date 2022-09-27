import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

export async function saveCard(req: Request, res: Response, userId: number, prisma: PrismaClient){
  console.log(req.body)

  const cards = await prisma.card.findMany({
    where: {
      stage: "options",
      userId
    }
  })

  const card = await prisma.card.create({
    data: {
      text: req.body.card.text,
      stage: "options",
      userId,
      order: cards.length + 1
    }
  })

  res.json({card: card, status: "ok"})
}