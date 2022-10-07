import { Card, PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

export async function updateCard(req: Request, res: Response, userId: number, prisma: PrismaClient){
  console.log(req.body)

  const cardToBeUpdated = await prisma.card.findUnique({
    where: {
      id: req.body.card.id
    }
  })
  if (guardAgainstNotFoundAndNotAuthorized(cardToBeUpdated, userId, res)) { return }

  var card
  if (cardToBeUpdated!.text !== req.body.card.text) {
    card = updateText(req.body.card.text, cardToBeUpdated!, userId, prisma)
  } else if (cardToBeUpdated!.stage === req.body.card.stage) {
    card = updateOrder(req.body.card.order, cardToBeUpdated!, userId, prisma)
  } else {
    card = updateStage(req.body.card.stage, cardToBeUpdated!, userId, prisma)
  }

  res.json({card: card, status: "ok"})
}

async function updateText(newText: string, cardToBeUpdated: Card, userId: number, prisma: PrismaClient) {
  await prisma.card.update({
    where: {
      id: cardToBeUpdated.id
    }, 
    data: {
      text: newText
    }
  })
}

async function updateOrder(newOrder: number, cardToBeUpdated: Card, userId: number, prisma: PrismaClient) {
  if (newOrder > cardToBeUpdated.order) {
    // for every card gt cardToBeUpdated.order ltequal newOrder
    // order decrement
    const cards = await prisma.card.updateMany({
      where: {
        order: {
          gt: cardToBeUpdated.order,
          lte: newOrder,
        },
        stage: cardToBeUpdated.stage
      },
      data: {
        order: {
          decrement: 1
        }
      }
    })
  } else {
    // for every card gtequal newOrder lt cardToBeUpdated.order
    // order increment
    const cards = await prisma.card.updateMany({
      where: {
        order: {
          gte: newOrder, // 1
          lt: cardToBeUpdated.order // 4
        },
        stage: cardToBeUpdated.stage
      },
      data: {
        order: {
          increment: 1
        }
      }
    })
  }
  // set cardToBeUpdated order to newOrder
  await prisma.card.update({
    where: {
      id: cardToBeUpdated.id
    }, 
    data: {
      order: newOrder
    }
  })
}

async function updateStage(stage: string, cardToBeUpdated: Card, userId: number, prisma: PrismaClient) {
  const card = await dropCardAtNewStageAtTheEnd(stage, cardToBeUpdated.id, userId, prisma)
  decreaseOrderFromOriginalStage(cardToBeUpdated!.stage, cardToBeUpdated!.order, userId, prisma)
  return card
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
