import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

export async function getTasks(req: Request, res: Response, userId: number, prisma: PrismaClient) {
  const tasks = await prisma.task.findMany({
    where: {
      userId
    }
  })
  console.log(tasks)
  res.json({"status": "ok", tasks})
}

export async function getDoneTasks(req: Request, res: Response, userId: number, prisma: PrismaClient) {
  const tasks = await prisma.task.findMany({
    where: {
      userId,
      isDone: true
    },
    orderBy: {
      doneDate: "desc"
    }
  })
  console.log(tasks)
  res.json({"status": "ok", tasks})
}

export async function getTask(req: Request, res: Response, userId: number, prisma: PrismaClient) {
  const task = await prisma.task.findUnique({
    where: {
      id: Number(req.params.taskId)
    }
  })
  if (task && task.userId == userId) {
    res.json({"status": "ok", task})
  } else {
    res.sendStatus(404);
  }
}