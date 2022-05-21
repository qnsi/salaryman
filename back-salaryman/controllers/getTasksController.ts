import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

export async function getTasks(req: Request, res: Response, prisma: PrismaClient) {
  const tasks = await prisma.task.findMany({})
  console.log(tasks)
  res.json({"status": "ok", tasks})
}