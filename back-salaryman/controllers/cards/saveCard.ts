import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

export async function saveCard(req: Request, res: Response, userId: number, prisma: PrismaClient){
  console.log(req.body)
  const card = await prisma.card.create({
    data: {
      text: req.body.card.text,
      stage: "options",
      userId
    }
  })
  res.json({card: card, status: "ok"})
}