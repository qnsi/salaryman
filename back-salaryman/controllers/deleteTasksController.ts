import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export default async function deleteTask(req: Request, res: Response, prisma: PrismaClient) {
  const id = req.body.task.id
  await prisma.task.delete({
    where: {
      id
    }
  })
  res.json({status: "ok"})
}