import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

export async function saveCrushEditor(req: Request, res: Response, userId: number, prisma: PrismaClient){
  var editorState = await getOldEditorState(userId, req.body.crushEditor.day, prisma)

  if (editorState != null) {
    editorState = await updateEditorState(editorState.id, req.body.crushEditor.value, prisma)
  } else {
    editorState = await createNewEditorState(userId, req.body.crushEditor.day, req.body.crushEditor.value, prisma)
  }

  res.json({crushEditor: editorState, status: "ok"})
}
  
async function getOldEditorState(userId: number, day: string, prisma: PrismaClient) {
  return await prisma.crushEditorState.findFirst({
    where: {
      userId,
      day,
    }
  })
}

async function updateEditorState(id: number, value: string, prisma: PrismaClient) {
  return await prisma.crushEditorState.update({
    where: {
      id,
    },
    data: {
      value
    }
  })
}

async function createNewEditorState(userId: number, day: string, value: string, prisma: PrismaClient) {
  return await prisma.crushEditorState.create({
    data: {
      value,
      day,
      userId,
    }
  })
}