import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

export async function updateTask(req: Request, res: Response, prisma: PrismaClient){
  console.log(req.body)
  const isDone = req.body.task.isDone
  var doneDate = undefined
  if (isDone) {
    doneDate = new Date()
  }
  const task = await prisma.task.update({
    where: {
      id: req.body.task.id
    },
    data: {
      collapsed: req.body.task.collapsed,
      isDone,
      doneDate
    }
  })
  console.log(task)
  res.json({task: task, status: "ok"})
}