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