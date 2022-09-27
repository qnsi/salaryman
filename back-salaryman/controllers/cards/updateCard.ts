import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

export async function updateCard(req: Request, res: Response, userId: number, prisma: PrismaClient){
  console.log(req.body)
  const card = await prisma.card.update({
    where: {
      userId_id: {
        userId,
        id: req.body.card.id
      }
    },
    data: {
      stage: req.body.card.stage
    }
  })
  res.json({card: card, status: "ok"})
}