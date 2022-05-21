import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

export async function saveTask(req: Request, res: Response, prisma: PrismaClient){
  console.log(req.body)
  const task = await prisma.task.create({
    data: {
      text: req.body.task.text,
      order: req.body.task.order,
    }
  })
  res.json({task: task, status: "ok"})
}