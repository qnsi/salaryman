import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

export async function saveTask(req: Request, res: Response, userId: number, prisma: PrismaClient){
  console.log(req.body)
  const parentId = getParentIdFromBody(req)
  const siblingsCount = await getSiblingsCount(parentId, prisma)
  const task = await prisma.task.create({
    data: {
      text: req.body.task.text,
      order: siblingsCount+1,
      parentId,
      userId
    }
  })
  res.json({task: task, status: "ok"})
}

function getParentIdFromBody(req: Request) {
  var parentId = req.body.task.parentId
  if (parentId === 0) {
    parentId = undefined
  }
  return parentId
}

async function getSiblingsCount(parentId: number, prisma: PrismaClient) {
  const siblings = await prisma.task.findMany({
    where: {
      parentId
    }
  })
  return siblings.length
}