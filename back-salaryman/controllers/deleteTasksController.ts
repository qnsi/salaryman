import { prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export default async function deleteTask(req: Request, res: Response, prisma: PrismaClient) {
  const id = req.body.task.id
  const task = await findTask(id, prisma)
  if (task) {
    await fixOrderAfterDeletion(task.parentId, task.order, prisma)
    await deleteTaskFromDB(id, prisma)
    res.json({status: "ok"})
  } else {
    res.json({status: "error"})
  }
}

async function findTask(id: number, prisma: PrismaClient) {
  return await prisma.task.findUnique({
    where: {
      id
    }
  })
}

async function deleteTaskFromDB(id: number, prisma: PrismaClient) {
  await prisma.task.delete({
    where: {
      id
    }
  })
}

async function fixOrderAfterDeletion(parentId: number | null, deletedTaskOrder: number, prisma: PrismaClient) {
  const siblings = await findTasksWithParentId(parentId, prisma)
  for (const sibling of siblings) {
    if (sibling.order > deletedTaskOrder) {
      await updateOrder(sibling.id, sibling.order, prisma)
    }
  }
}

async function findTasksWithParentId(parentId: number | null, prisma: PrismaClient) {
  return await prisma.task.findMany({
    where: {
      parentId
    }
  })
}

async function updateOrder(id: number, order: number, prisma: PrismaClient) {
  order = order - 1
  await prisma.task.update({
    where: {
      id
    },
    data: {
      order
    }
  })
}