import { Card, Prisma, PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

export async function updateCard(req: Request, res: Response, userId: number, prisma: PrismaClient){
  console.log(req.body)

  const cardToBeUpdated = await prisma.card.findUnique({
    where: {
      id: req.body.card.id
    }
  })
  if (guardAgainstNotFoundAndNotAuthorized(cardToBeUpdated, userId, res)) { return }

  const card = await dropCardAtNewStageAtTheEnd(req.body.card.stage, req.body.card.id, userId, prisma)
  decreaseOrderFromOriginalStage(cardToBeUpdated!.stage, cardToBeUpdated!.order, userId, prisma)

  res.json({card: card, status: "ok"})
}

function guardAgainstNotFoundAndNotAuthorized(cardToBeUpdated: Card | null, userId: number, res: Response) {
  if (cardToBeUpdated === null) { 
    res.status(404).send({message: "Card not found"})
    return true
  }
  if (cardToBeUpdated.userId !== userId) {
     res.status(401).send({message: "You are unauthorized to update this card"}) 
     return true
  }
  return false
}

async function dropCardAtNewStageAtTheEnd(stage: string, cardId: number, userId: number, prisma: PrismaClient) {
  const cardsAtNewStage = await prisma.card.findMany({
    where: {
      userId,
      stage,
    }
  })
  const card = await prisma.card.update({
    where: {
      userId_id: {
        userId,
        id: cardId
      }
    },
    data: {
      stage: stage,
      order: cardsAtNewStage.length + 1
    }
  })
  return card
}

async function decreaseOrderFromOriginalStage(stage: string, order: number, userId: number, prisma: PrismaClient) {
  const cards = await prisma.card.updateMany({
    where: {
      order: {
        gt: order
      },
      stage
    },
    data: {
      order: {
        decrement: 1
      }
    }
  })
}
