import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

export async function getCategories(req: Request, res: Response, prisma: PrismaClient) {
  const categories = await prisma.category.findMany({})
  console.log(categories)
  res.json({"status": "ok", categories})
}