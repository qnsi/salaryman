import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

export async function saveTask(req: Request, res: Response, prisma: PrismaClient){
  console.log(req.body)
  const parentId = getParentIdFromBody(req)
  const task = await prisma.task.create({
    data: {
      text: req.body.task.text,
      order: req.body.task.order,
      parentId
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