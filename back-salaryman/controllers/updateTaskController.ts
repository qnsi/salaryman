import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

export async function updateTask(req: Request, res: Response, prisma: PrismaClient){
  console.log(req.body)
  const task = await prisma.task.update({
    where: {
      id: req.body.task.id
    },
    data: {
      collapsed: req.body.task.collapsed,
      isDone: req.body.task.isDone,
    }
  })
  console.log(task)
  res.json({task: task, status: "ok"})
}