import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

export async function saveCategory(req: Request, res: Response, prisma: PrismaClient){
  console.log(req.body)
  const name = req.body.category.name
  const category = await prisma.category.create({
    data: {
      name
    }
  })
  res.json({category, status: "ok"})
}